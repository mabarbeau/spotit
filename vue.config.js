const fs = require('fs')

module.exports = {
  devServer: {
    host: process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : 'localhost',
    https: process.env.VUE_APP_CERT
      ? {
          key: fs.readFileSync(`./cert/${process.env.VUE_APP_CERT}-key.pem`),
          cert: fs.readFileSync(`./cert/${process.env.VUE_APP_CERT}.pem`),
        }
      : false,
    public: `${
      process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : 'localhost'
    }:8080/`,
  },
  css: {
    sourceMap: true,
  },
  transpileDependencies: ['vuetify'],
}
