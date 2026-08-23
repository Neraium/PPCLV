# Research: Zoho Mail API delivery from Cloudflare Workers Free

> Question: Can the existing Cloudflare Worker deliver PPC contact requests through a supported Zoho HTTP API without Workers Paid or raw SMTP?
> Date: 2026-08-17
> Confidence: high

## Findings

### 1. Zoho supports sending mail through an HTTPS REST endpoint

**What:** Zoho Mail documents `POST /api/accounts/{accountId}/messages` with a JSON body containing an authenticated account From address, recipient, subject, content, and `mailFormat`.
**Source:** https://www.zoho.com/mail/help/api/post-send-an-email.html
**Confidence:** high; official endpoint documentation.
**Action:** Replace the Cloudflare `send_email` binding with outbound `fetch()` calls to this endpoint. Keep From and To fixed in Worker source.

### 2. The least-privilege production scope is create-only message access

**What:** Zoho permits `ZohoMail.messages.CREATE` for the send endpoint, rather than the broader `ZohoMail.messages.ALL` scope.
**Source:** https://www.zoho.com/mail/help/api/post-send-an-email.html
**Confidence:** high; official scope documentation.
**Action:** Generate the production refresh token with only `ZohoMail.messages.CREATE`. Obtain the account ID separately during setup rather than granting the deployed Worker account-read access.

### 3. OAuth refresh is required and supported for unattended backends

**What:** A Zoho Self Client is intended for app-to-app access to the owner's own account. Its authorization-code flow returns a non-expiring refresh token; refreshed access tokens last one hour.
**Source:** https://www.zoho.com/developer/oauth/self-client/overview.html and https://www.zoho.com/developer/oauth/self-client/authorization-code-flow.html
**Confidence:** high; official OAuth documentation.
**Action:** Store client ID, client secret, refresh token, and mail account ID only as Worker secrets. Refresh access tokens server-side and never use the mailbox password.

### 4. Cloudflare Workers Free supports the required HTTP calls

**What:** Workers provide outbound `fetch()`. The Free plan allows 50 external subrequests per invocation, 100,000 requests per day, and does not count network wait time as CPU time. This design needs two external subrequests on a cold token path and one while a token is cached.
**Source:** https://developers.cloudflare.com/workers/runtime-apis/fetch/ and https://developers.cloudflare.com/workers/platform/limits/
**Confidence:** high; official Cloudflare runtime and plan documentation.
**Action:** Use native `fetch()` with no paid-only bindings, packages, sockets, KV, or Durable Objects.

### 5. Regional endpoints and provider rate limits must be respected

**What:** Zoho Mail and OAuth endpoints vary by the mailbox data center. Zoho documents a 30-request-per-minute API limit and recommends backoff/caching.
**Source:** https://www.zoho.com/mail/help/api/getting-started-with-api.html, https://www.zoho.com/developer/oauth/multi-dc-support.html, and https://www.zoho.com/mail/help/adminconsole/rates-and-limits.html
**Confidence:** high; official Zoho documentation.
**Action:** Validate a small data-center allowlist and cache one-hour access tokens in the Worker isolate with an expiry margin. Do not retry message sends, which could duplicate inquiries.

### 6. Per-message Reply-To and multipart alternatives are not documented

**What:** The send API documents From, To, Cc, Bcc, subject, content, and either `html` or `plaintext` format, but no per-message Reply-To field or multipart text/HTML payload.
**Source:** https://www.zoho.com/mail/help/api/post-send-an-email.html
**Confidence:** high for the documented API contract; unsupported fields may exist but are not safe to depend on.
**Action:** Do not send an undocumented Reply-To parameter or modify the mailbox-wide Reply-To setting. Include the validated visitor email prominently and as a safe `mailto:` link in escaped HTML.

**Verification boundary:** Automated tests can verify validation, HTML escaping, the fixed sender/recipient, the bounded regional API URL, and the absence of an undocumented Reply-To field. Actual provider delivery must be checked after the four Worker secrets are configured by submitting one real request and confirming receipt in the Zoho mailbox and its existing Gmail forwarding destination.

## Summary

The supported Zoho Mail REST send endpoint is a practical fit for the existing Worker and Cloudflare Free limits. Use a Self Client refresh token scoped only to `ZohoMail.messages.CREATE`, refresh access tokens server-side, and send escaped HTML to the fixed PPC mailbox through regional Zoho HTTPS endpoints. No Cloudflare Email Sending binding, raw SMTP, or paid Worker feature is needed.

The deployed Worker requires exactly four secrets: `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, and `ZOHO_ACCOUNT_ID`. `ZOHO_DATA_CENTER` is a bounded, non-secret Worker variable and defaults to `us`.

## Open Questions

- The mailbox's Zoho data center must be confirmed during one-time setup from its Zoho Mail login URL.
- A live provider call cannot be completed until the owner supplies the four Worker secrets; automated tests should mock both Zoho HTTPS calls.
