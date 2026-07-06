function publicMessage(err) {
  if (process.env.NODE_ENV === 'development') {
    return err.message || 'Internal server error';
  }

  const msg = err.message || '';
  if (
    err.code === 'ECONNREFUSED' ||
    err.code === 'ENOTFOUND' ||
    err.code === 'ER_ACCESS_DENIED_ERROR' ||
    err.code === 'ER_BAD_DB_ERROR' ||
    /getaddrinfo|Access denied|ECONNREFUSED|database/i.test(msg)
  ) {
    return 'Database connection failed. Check server database environment variables.';
  }

  return err.message || 'Internal server error';
}

export function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: publicMessage(err),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found' });
}

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
