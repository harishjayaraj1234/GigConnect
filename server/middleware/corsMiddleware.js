// corsMiddleware.js
// Simple, configurable CORS middleware for Express

function createCorsMiddleware(options = {}) {
  const {
   
    allowedOrigins = '*',
    allowedMethods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders = null, 
    exposedHeaders = null, 
    credentials = false,
    maxAge = 0, 
  } = options;

  function isOriginAllowed(origin) {
    if (!origin) return false;
    if (allowedOrigins === '*') return true;
    if (typeof allowedOrigins === 'function') return !!allowedOrigins(origin);
    if (Array.isArray(allowedOrigins)) return allowedOrigins.includes(origin);
    return origin === allowedOrigins;
  }

  const methodsHeader = Array.isArray(allowedMethods) ? allowedMethods.join(',') : allowedMethods;

  return function corsMiddleware(req, res, next) {
    const origin = req.headers.origin;

    
    if (!origin) return next();

    const allowed = isOriginAllowed(origin);

    if (!allowed) {
      return next();
    }

    if (credentials) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', appendVary(res.getHeader('Vary'), 'Origin'));
    } else {
      if (allowedOrigins === '*') {
        res.setHeader('Access-Control-Allow-Origin', '*');
      } else {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', appendVary(res.getHeader('Vary'), 'Origin'));
      }
    }

    res.setHeader('Access-Control-Allow-Methods', methodsHeader);

    let allowHeadersValue = allowedHeaders;
    if (!allowHeadersValue) {
      const reqHeaders = req.headers['access-control-request-headers'];
      allowHeadersValue = reqHeaders ? reqHeaders : 'Content-Type, Authorization';
    }
    if (Array.isArray(allowHeadersValue)) allowHeadersValue = allowHeadersValue.join(',');
    res.setHeader('Access-Control-Allow-Headers', allowHeadersValue);

    if (exposedHeaders) {
      const exp = Array.isArray(exposedHeaders) ? exposedHeaders.join(',') : exposedHeaders;
      res.setHeader('Access-Control-Expose-Headers', exp);
    }

    if (credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    if (maxAge && Number(maxAge) > 0) {
      res.setHeader('Access-Control-Max-Age', String(Number(maxAge)));
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }

    return next();
  };
}

function appendVary(current, value) {
  if (!current) return value;
  const parts = String(current).split(',').map(p => p.trim());
  if (!parts.includes(value)) parts.push(value);
  return parts.join(', ');
}

export default createCorsMiddleware;
