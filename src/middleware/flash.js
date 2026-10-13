// Minimal flash-message helper backed by the session, so views can show a
// one-time success/error message after a redirect without an extra dependency.
module.exports = function flash(req, res, next) {
  const messages = req.session.flash || {};
  req.session.flash = {};
  res.locals.flash = messages;
  res.locals.currentUser = req.session.user || null;
  next();
};

function setFlash(req, type, message) {
  req.session.flash = req.session.flash || {};
  req.session.flash[type] = message;
}

module.exports.setFlash = setFlash;
