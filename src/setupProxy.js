const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/", {
      target: "https://polar-spire-27738.herokuapp.com",
      secure: false,
      changeOrigin: true
    })
  );
};
