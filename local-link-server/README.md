# Local Link Server

Simple local link (redirect) server.

Install and run:

```bash
cd local-link-server
npm install
npm start
```

API:

- GET /ping — responds "pong"
- GET /links — list all links (JSON)
- POST /links — add/update link, JSON body `{ "key": "short", "url": "https://example.com" }`
- DELETE /links/:key — remove link
- GET /:key — redirect to stored URL

Example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"key":"gh","url":"https://github.com"}' http://localhost:3001/links
curl -i http://localhost:3001/gh
```
