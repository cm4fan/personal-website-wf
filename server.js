const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Set cache duration (1 year)
const oneYear = 1000 * 60 * 60 * 24 * 365;

// Serve static assets with cache headers
app.use('/css', express.static('css', { maxAge: oneYear }));
app.use('/js', express.static('js', { maxAge: oneYear }));
app.use('/images', express.static('images', { maxAge: oneYear }));
app.use('/fonts', express.static('fonts', { maxAge: oneYear }));
app.use('/videos', express.static('videos', { maxAge: oneYear }));

// Helper to inject data-theme into <html>
function injectTheme(html, theme) {
  if (theme === 'dark' || theme === 'light') {
    return html.replace('<html', `<html data-theme="${theme}"`);
  }
  return html;
}

// List your HTML files here (add more if needed)
const htmlFiles = [
  '/',
  '/index.html',
  '/apps.html',
  '/fixathon.html',
  '/koobiq.html',
  '/ptai.html'
];

app.get(htmlFiles, (req, res) => {
  const file = path.join(__dirname, req.path === '/' ? 'index.html' : req.path);
  fs.readFile(file, 'utf8', (err, html) => {
    if (err) return res.status(404).send('Not found');
    const theme = req.cookies['color-scheme'];
    res.send(injectTheme(html, theme));
  });
});

// Fallback for other static files
app.use(express.static('.'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});