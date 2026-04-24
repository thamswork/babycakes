/**
 * Cloudflare Worker — GitHub OAuth proxy for Decap CMS
 * Replaces Netlify Identity for Cloudflare Pages sites
 *
 * SETUP (one-time, takes 5 minutes):
 * 1. npm install -g wrangler
 * 2. wrangler login
 * 3. Create GitHub OAuth App at github.com/settings/developers
 *    - Homepage URL: https://babycakes.pages.dev
 *    - Callback URL: https://babycakes-cms-oauth.thamswork.workers.dev/api/callback
 * 4. cd cloudflare-oauth-worker
 * 5. wrangler secret put GITHUB_CLIENT_ID    → paste your Client ID
 * 6. wrangler secret put GITHUB_CLIENT_SECRET → paste your Client Secret
 * 7. wrangler deploy
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://babycakes.pages.dev",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Step 1 — redirect to GitHub OAuth
    if (url.pathname === "/api/auth") {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: "repo,user",
        state: crypto.randomUUID(),
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // Step 2 — GitHub redirects back here with code
    if (url.pathname === "/api/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing code", { status: 400 });
      }

      // Exchange code for token
      const tokenRes = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        }
      );

      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        return new Response(`OAuth error: ${tokenData.error_description}`, {
          status: 400,
        });
      }

      // Post token back to the CMS window (postMessage)
      const token = tokenData.access_token;
      const html = `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage", e);
      // Send token back to CMS
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    // Initiate handshake
    window.opener.postMessage("authorizing:github", "*");
  })()
</script>
<p>Authenticating, please wait...</p>
</body>
</html>`.replace(
        '${JSON.stringify({ token, provider: "github" })}',
        JSON.stringify({ token, provider: "github" })
      );

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
