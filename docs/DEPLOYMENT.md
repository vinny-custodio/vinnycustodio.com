# Deployment and recovery

Repository: https://github.com/vinny-custodio/vinnycustodio.com
Host: Cloudflare Pages, project `vinnycustodio-com`.
Existing production URL: https://vinnycustodio-com.pages.dev/

Settings: Git integration, branch `main`, framework None, build command empty, output `dist`, root repository root. A new host only needs the contents of `dist/`; directory routes must serve their index.html. No runtime secrets are required.

## Domain migration status (last checked November 4, 2026)

Registrar: GoDaddy. DNS moving to Cloudflare Free. User approved the change and completed GoDaddy identity verification. GoDaddy displayed custom nameservers `harlan.ns.cloudflare.com` and `mary.ns.cloudflare.com`. Cloudflare was still waiting for propagation. This status is historical, not a live check.

`www.vinnycustodio.com` was associated with Pages via CNAME setup. Cloudflare's www CNAME was changed from `sites.framer.app` to `vinnycustodio-com.pages.dev`; verification was requested. Root-domain association was blocked until Cloudflare recognizes the DNS zone as active. At that check, the root still had old Framer A records `31.43.161.6` and `31.43.160.6`.

Remaining migration work: check zone activation, add root `vinnycustodio.com` in Pages Custom domains, follow Pages' DNS replacement flow for the root, verify both HTTPS hostnames and actual portfolio rendering. Do not claim the custom domain is ready based only on this file.

## Email must be preserved

The user uses Microsoft 365 and Outlook for hello@vinnycustodio.com. Do not change the mailbox/provider or replace these mail records:

- MX @, priority0: `vinnycustodio-com.mail.protection.outlook.com`
- TXT @: `v=spf1 include:secureserver.net -all`
- TXT @: `NETORGFT18171547.onmicrosoft.com`
- CNAME autodiscover: `autodiscover.outlook.com`
- CNAME email: `email.secureserver.net`
- CNAME lyncdiscover: `webdir.online.lync.com`
- CNAME msoid: `clientconfig.microsoftonline-p.net`
- CNAME sip: `sipdir.online.lync.com`
- SRV _sip._tls: priority100, weight1, port443, `sipdir.online.lync.com`
- SRV _sipfederationtls._tcp: priority100, weight1, port5061, `sipfed.online.lync.com`

Mail CNAMEs were set to DNS-only in Cloudflare. DNSSEC was already off at GoDaddy. Do not change account-security or mail settings as part of normal content updates.

## Restore or move hosts

Clone the repository or extract a verified backup, preview, then deploy `dist/` to a static host. Connect custom hostnames through the new host's supported flow. Keep email DNS intact. Keep the existing host running until the replacement is verified. Reconnecting GitHub/hosting in a new Codex account requires normal account authentication; access is not stored in the code.

## Recovery limits

The project preserves website code and exports, not live Figma edit history, third-party account ownership, passwords, DNS propagation state, or this chat history. GitHub retains commit history; the recovery ZIP is an independent current-version snapshot. Keep a second ZIP copy in your own cloud drive or external storage.
