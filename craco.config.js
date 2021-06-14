const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#1DA57A' ,
                '@layout-header-height': 'auto',
                '@layout-header-padding': '0',
                '@layout-header-background': '#253237',
                '@layout-footer-padding': '0',
                '@layout-footer-background': '#253237',
                '@carousel-dot-height': '16px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};