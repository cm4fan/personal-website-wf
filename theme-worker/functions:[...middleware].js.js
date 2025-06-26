export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);

  // Only process HTML requests
  if (
    request.headers.get("accept")?.includes("text/html")
  ) {
    // Get the theme from cookies
    const cookie = request.headers.get("cookie") || "";
    const match = cookie.match(/color-scheme=(dark|light)/);
    const theme = match ? match[1] : null;

    // Get the original response
    let response = await next();
    let html = await response.text();

    // Inject data-theme if needed
    if (theme) {
      html = html.replace('<html', `<html data-theme="${theme}"`);
    }

    return new Response(html, {
      status: response.status,
      headers: response.headers,
    });
  }

  // For non-HTML, just continue
  return next();
};