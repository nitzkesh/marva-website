// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://marva-water.com',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Vite refuses requests whose Host header it does not recognise - a
      // DNS-rebinding guard. That makes the dev server unreachable through any
      // reverse proxy, including `tailscale serve`, which forwards with the
      // machine's <host>.<tailnet>.ts.net name and gets a 403.
      //
      // A leading dot matches a domain and its subdomains, so this permits
      // Tailscale hostnames and nothing else - far narrower than `true`, which
      // would switch the guard off for every host. Dev only: `astro build`
      // never reads server.*, so it cannot reach the deployed site.
      allowedHosts: ['.ts.net']
    }
  }
});