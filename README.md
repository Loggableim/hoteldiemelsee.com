# Hotel Diemelsee Website

Statischer Export der finalen Website fuer `Hotel Diemelsee`.

## Inhalt

- finale HTML-Seiten im Repo-Root
- `assets/` fuer Bilder und sonstige statische Assets
- `docs/` fuer die projektspezifischen PDF-Unterlagen
- `_headers` fuer Cloudflare Pages Header-Regeln
- `_redirects` fuer Cloudflare Pages Redirect-Regeln

## GitHub

Empfohlener Repository-Name:

- `hotel-diemelsee-website`

Wenn du das Remote-Repository auf GitHub erstellt hast, kannst du dieses lokale Repo damit verbinden:

```powershell
git remote add origin https://github.com/<dein-github-name>/hotel-diemelsee-website.git
git push -u origin main
```

## Cloudflare Pages

Empfohlene Einstellungen fuer dieses Repo:

- Production branch: `main`
- Build command: `exit 0`
- Build output directory: Repo-Root mit `index.html`

Dieses Repo ist als reines statisches Site-Repository ohne Build-Schritt vorbereitet.
