// Vercel serverless entry point: wraps the Express app so every request
// (except static files already served from /public) is handled here.
module.exports = require('../src/app');
