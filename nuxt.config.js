
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  /*配置跨域代理*/
  // axios: {
  //   //baseURL:"api.dangyunlong.com", //设置统一的基础url，线上环境关闭代理时使用它。
  //   proxy: true, // 表示开启代理
  //   prefix: '/api', // 表示给请求url加个前缀 /api
  //   credentials: true // 表示跨域请求时是否需要使用凭证
  // },
  // proxy: {
  //     '/api': {
  //       target: 'http://localhost:3002/', // 目标接口域名
  //       pathRewrite: {
  //         '^/api': '/', // 把 /api 替换成 /
  //         changeOrigin: true // 表示是否跨域
  //       },
  //     }
  // },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    /*加上axios，防止二次打包*/
    vendor: ['element-ui','axios'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
}
