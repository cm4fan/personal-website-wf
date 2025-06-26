const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Serve static assets (CSS, JS, images, fonts, videos)
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.use('/fonts', express.static('fonts'));
app.use('/videos', express.static('videos'));

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