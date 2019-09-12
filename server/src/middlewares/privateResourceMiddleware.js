// redirect to login page when not authenticated
const privateResourceMiddleawre = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    next();
  } else {
    ctx.redirect('/login');
  }
};

module.exports = privateResourceMiddleawre;
