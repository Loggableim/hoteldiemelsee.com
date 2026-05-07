const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
};

function cacheControlFor(pathname) {
  const lower = pathname.toLowerCase();

  if (
    lower.endsWith('.css') ||
    lower.endsWith('.js') ||
    lower.endsWith('.svg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.avif')
  ) {
    return 'public, max-age=31536000, immutable';
  }

  if (lower.endsWith('.pdf')) {
    return 'public, max-age=86400';
  }

  return 'public, max-age=0, must-revalidate';
}

function buildHeaders(pathname, baseHeaders = new Headers()) {
  const headers = new Headers(baseHeaders);

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    headers.set(key, value);
  });

  if (pathname === '/404.html') {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  headers.set('Cache-Control', cacheControlFor(pathname));
  return headers;
}

function withHeaders(response, pathname, status = response.status) {
  return new Response(response.body, {
    status,
    statusText: response.statusText,
    headers: buildHeaders(pathname, response.headers),
  });
}

async function fetchAsset(request, env, pathname) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  assetUrl.search = '';
  return env.ASSETS.fetch(new Request(assetUrl.toString(), { method: 'GET' }));
}

async function serveAsset(request, env, pathname) {
  const response = await fetchAsset(request, env, pathname);
  if (response.status !== 404) {
    return withHeaders(response, pathname);
  }

  return null;
}

async function servePath(request, env, pathname) {
  const candidates = [];

  if (pathname === '/') {
    candidates.push('/index.html');
  } else if (pathname.endsWith('/')) {
    candidates.push(`${pathname}index.html`);
  } else if (!pathname.includes('.')) {
    candidates.push(`${pathname}.html`);
    candidates.push(`${pathname}/index.html`);
  }

  candidates.push(pathname);

  for (const candidate of candidates) {
    const response = await serveAsset(request, env, candidate);
    if (response) {
      return response;
    }
  }

  const notFound = await fetchAsset(request, env, '/404.html');
  return new Response(notFound.body, {
    status: 404,
    headers: buildHeaders('/404.html', notFound.headers),
  });
}

function redirectToRoot(request) {
  const url = new URL(request.url);
  url.pathname = '/';
  return Response.redirect(url.toString(), 301);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (/^\/website-variant-a(?:\/|$)/.test(url.pathname)) {
      return redirectToRoot(request);
    }

    if (/^\/website-variant-b(?:\/|$)/.test(url.pathname)) {
      return redirectToRoot(request);
    }

    return servePath(request, env, url.pathname);
  },
};
