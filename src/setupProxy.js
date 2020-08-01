import proxy from 'http-proxy-middleware';

module.exports = app => {
  app.use(
    proxy('', {
      target: '',
      changeOrigin: true,
    }),
  );
};
