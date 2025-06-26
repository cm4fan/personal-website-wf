export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only handle HTML files or root
    if (!url.pathname.endsWith('.html') && url.pathname !== '/') {
      return fetch(request);
    }

    // Proxy to your Cloudflare Pages site
    const origin = "https://express-server.thecowgoesshazoo.workers.dev"; // <-- replace with your actual Pages URL
    const proxiedUrl = origin + (url.pathname === '/' ? '/index.html' : url.pathname);

    // Get the theme from cookies
    const cookie = request.headers.get('Cookie') || '';
    const match = cookie.match(/color-scheme=(dark|light)/);
    const theme = match ? match[1] : null;

    // Fetch the original HTML
    const resp = await fetch(proxiedUrl);
    let html = await resp.text();

    // Inject data-theme if needed
    if (theme) {
      html = html.replace('<html', `<html data-theme="${theme}"`);
    }

    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    });
  }
}