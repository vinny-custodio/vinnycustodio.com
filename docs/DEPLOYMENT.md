# Deployment and recovery

Repository: https://github.com/vinny-custodio/vinnycustodio.com
Host: Cloudflare Pages, project `vinnycustodio-com`.
Existing production URL: https://vinnycustodio-com.pages.dev/

Settings: Git integration, branch `main`, framework None, build command empty, output `dist`, root repository root. A new host only needs the contents of `dist/`; directory routes must serve their index.html. No runtime secrets are required.

## Domain connection (last checked November 4, 2026)

Registrar remains GoDaddy; Cloudflare Free now manages DNS. GoDaddy uses `harlan.ns.cloudflare.com` and `mary.ns.cloudflare.com`; Cloudflare confirmed the zone is active.

Both root `vinnycustodio.com` and `www.vinnycustodio.com` are associated with Pages and have proxied CNAMEs targeting `vinnycustodio-com.pages.dev`. The two old root Framer A records were replaced through Pages' activation flow. The last dashboard check showed www Active with SSL enabled and root Initializing. These are historical observations; check current Pages status and actual HTTPS rendering before reporting readiness. Some networks may retain old Framer DNS until caches expire.

No further DNS replacement is pending. Remaining verification is root certificate/hostname activation and actual rendering through both public hostnames. Do not alter email DNS while testing website propagation.

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
