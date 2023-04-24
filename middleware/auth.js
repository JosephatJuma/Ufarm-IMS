function requireAuth(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    //console.log(req.session.user.role);
    next();
  }
}

module.exports = requireAuth;
