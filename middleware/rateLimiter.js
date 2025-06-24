/**
 * Simple in-memory rate limiter middleware.
 * Limits each IP to maxRequests per windowMs milliseconds.
 */
function createRateLimiter({ windowMs = 60000, maxRequests = 100 } = {}) {
  const requests = new Map();

  return function rateLimiter(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    // Remove timestamps outside the window
    const timestamps = requests.get(ip).filter(t => now - t < windowMs);
    timestamps.push(now);
    requests.set(ip, timestamps);

    if (timestamps.length > maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    next();
  };
}

module.exports = createRateLimiter;
