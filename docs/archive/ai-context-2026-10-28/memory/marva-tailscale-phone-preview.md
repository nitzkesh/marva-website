---
name: marva-tailscale-phone-preview
description: "How to put the Marva dev server on Nitzan's phone over Tailscale — the two things that block it (Astro binds IPv6 loopback only; Vite refuses unknown Host headers) and the exact working commands."
metadata: 
  node_type: memory
  type: project
  originSessionId: 55284554-a1b8-4873-85f3-5ac283a21e58
  modified: 2026-09-08T02:16:09.653Z
---

Nitzan reviews the site on his phone via Tailscale. Machine is
`nitzke-laptop` / `100.87.146.69`, tailnet `tail45875c.ts.net`. His
`iphone-14-pro` is often **offline in the tailnet** - if the link does not
resolve, that is usually the cause, not the tunnel.

**Working setup**, with the dev server already up. **Do not assume the port is
4321** — Astro 7 daemonizes, so the running server may be on any port and the
harness's own bookkeeping goes stale. Read the real one first, from
`website/app`: `node node_modules/astro/bin/astro.mjs dev status`. Then (2026-09-09,
a worktree server that had bound 4326):

```
"/c/Program Files/Tailscale/tailscale.exe" serve --bg --https=8444 http://localhost:<that port>
```
-> `https://nitzke-laptop.tail45875c.ts.net:8444/`. Turn it off with
`tailscale serve --https=8444 off`.

**Use 8444, not 8443.** Port 8443 already proxies another project on
127.0.0.1:8100 - leave it alone.

**`serve`, never `funnel`.** serve is tailnet-only (his own devices); funnel
publishes to the open internet. He asked to "open the tailscale server", which
means serve.

**Two non-obvious blockers, both hit in order:**
1. **502 - Astro binds IPv6 loopback ONLY.** `netstat` shows `[::1]:4321`
   listening and nothing on `127.0.0.1`, so a proxy target of
   `http://127.0.0.1:4321` cannot connect. Use `http://localhost:4321` and let
   Tailscale resolve it. Do NOT try `http://[::1]:4321` - Tailscale mangles the
   brackets to `http://::1:4321` and reports "unknown proxy destination".
2. **403 "Blocked request. This host is not allowed."** Vite's DNS-rebinding
   guard rejects the proxied `<host>.<tailnet>.ts.net` Host header. Fixed by
   `vite.server.allowedHosts: ['.ts.net']` in `astro.config.mjs` - a leading dot
   matches the domain and its subdomains, so it permits Tailscale hostnames and
   nothing else. Preferred over `true` (disables the guard for every host) and
   over hardcoding the machine name. Dev only; `astro build` never reads
   `server.*`. Nitzan confirmed on 2026-09-08 that this line
   **stays in the repo** - phone preview is a recurring need, not one-off
   scaffolding, so do not strip it "to clean up" before a PR.
   Note it is NOT on every branch: a worktree branched before the line landed
   will not have it (hit and re-added on 2026-09-09), so check `astro.config.mjs`
   in the worktree you are actually serving before blaming the tunnel for a 403.

**Why:** binding `--host` (0.0.0.0) instead would also expose the dev server to
the whole local Wi-Fi; the serve+allowedHosts route keeps it on the tailnet.

**How to apply:** a config change needs a dev-server restart before the tunnel
will work - `preview_stop` then `preview_start`, not just a reload. Verify end
to end with `curl` against the ts.net URL (check for `blocked request` in the
body, not just the status code) before telling him it is ready. See
[[marva-website-edits-4-in-progress]] for the separate "astro dev starts but
never binds" failure, which is a different problem with a different fix.
