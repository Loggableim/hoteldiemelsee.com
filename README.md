# Hotel Diemelsee Website

Statischer Export der finalen Website fuer `Hotel Diemelsee`.

## Inhalt

- `public/` als Asset-Verzeichnis fuer den Cloudflare Worker
- finale HTML-Seiten, Bilder und PDF-Unterlagen innerhalb von `public/`
- `worker.js` als Cloudflare-Worker-Einstiegspunkt
- `wrangler.toml` fuer Worker- und Asset-Konfiguration
- `404.html` fuer die eigene Fehlerseite
- `robots.txt` und `sitemap.xml` fuer Crawl-Hinweise
- `_headers` fuer Cloudflare Pages Header-Regeln (Pages-only)
- `_redirects` fuer Cloudflare Pages Redirect-Regeln (Pages-only)

## GitHub

Empfohlener Repository-Name:

- `hotel-diemelsee-website`

Wenn du das Remote-Repository auf GitHub erstellt hast, kannst du dieses lokale Repo damit verbinden:

```powershell
git remote add origin https://github.com/<dein-github-name>/hotel-diemelsee-website.git
git push -u origin main
```

## Cloudflare Workers

Empfohlene Einstellungen fuer den Worker-Import:

- Main entry: `worker.js`
- Assets directory: `public`
- No build step required
- Custom domains sind in `wrangler.toml` hinterlegt:
- `hoteldiemelsee.com`
- `www.hoteldiemelsee.com`

Der Worker uebernimmt statische Dateien, Redirects und Sicherheitsheader direkt.

## Cloudflare Pages

Falls du stattdessen Pages nutzt:

- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `public`

Dieses Repo ist als reines statisches Site-Repository ohne Build-Schritt vorbereitet.
