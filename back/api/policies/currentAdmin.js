module.exports = function(req, res, next) {
  // User is all owed, proceed to the next policy, 
  // or if this is the last policy, the controller
  console.log(req.session.authenticate_admin);
  if (req.session.authenticate_admin === true) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};