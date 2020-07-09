// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = (req, res, next) => {
  console.log(req.user);
  console.log(req.user.adminStatus);
  if ((req.user) && (req.user.adminStatus === true)) {
    return next();
  }
  // If the user isn't logged in, redirect them to the login page
  req.flash('error', 'Please log in to view that resource');
  return res.redirect('/admin/login');
};
