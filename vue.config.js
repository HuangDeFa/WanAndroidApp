const path = require('path')

module.exports={
    css:{
        loaderOptions:{
          less: {},
          stylus: {
            'resolve url': true,
            'import': []
          }
        }
    },

    chainWebpack:config=>{
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        config.plugin('html')
        .tap(args=>{
          args[0].title="玩安卓App";
          args[0].favicon = "src/assets/favicon.ico";
          args[0].meta = {
            author:"前端小白"
          };
          return args;
        })    
    },

    devServer:{
        port:9797,
        https:false,
        proxy:{
            'api/':{
              //要访问的跨域的域名   
             target:'https://www.wanandroid.com',  
             ws: true,
             secure:true, // 使用的是http协议则设置为false，https协议则设置为true
             changOrigin: true,
             pathRewrite: {
                 '^/api': ''
             }
            },
            'api2/':{
                target:'https://www.example.com',
                ws: true,
                secure:true, // 使用的是http协议则设置为false，https协议则设置为true
                changOrigin: true,
                pathRewrite: {
                    '^/api2/': ''
                },
                router:function(req){
                    console.log(req);
                    const originalTarget =  `https://${req.query['original-host']}`;
                    return originalTarget;
                }
            }
        }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: false
      }
    }
}

function addStyleResource (rule) {
    rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/app.less'),
        ],
      })
  }
