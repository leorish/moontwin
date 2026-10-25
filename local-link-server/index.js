const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'links.json');

function readLinks() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || {};
  } catch (e) {
    return {};
  }
}

function writeLinks(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(bodyParser.json());

app.get('/ping', (req, res) => res.send('pong'));

app.get('/links', (req, res) => {
  res.json(readLinks());
});

app.post('/links', (req, res) => {
  const { key, url } = req.body;
  if (!key || !url) return res.status(400).json({ error: 'key and url required' });
  const links = readLinks();
  links[key] = url;
  writeLinks(links);
  res.json({ ok: true, key, url });
});

app.delete('/links/:key', (req, res) => {
  const k = req.params.key;
  const links = readLinks();
  if (!(k in links)) return res.status(404).json({ error: 'not found' });
  delete links[k];
  writeLinks(links);
  res.json({ ok: true });
});

app.get('/:key', (req, res) => {
  const k = req.params.key;
  const links = readLinks();
  const url = links[k];
  if (!url) return res.status(404).send('Not found');
  res.redirect(url);
});

app.listen(PORT, () => console.log(`Local link server running on http://localhost:${PORT}`));
