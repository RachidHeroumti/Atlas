import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin  from 'terser-webpack-plugin';
import purgeCss  from '@fullhuman/postcss-purgecss';
import cssNano  from 'cssnano';
export default {
  head: {
    title: 'customize-theme',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' }
      ],

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: []
  },
  target: 'server',
  css: [
    '~/assets/css/icons.css',
    '~/assets/css/main.css',
    '~/assets/css/fontCss.css'
  ],
  plugins: [
    '~/plugins/tools.js',
    '~/plugins/http.js',
    '~/plugins/storeino.js',
    '~/plugins/init.js',
    '~/plugins/events.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
    '@nuxtjs/pwa'
  ],
  googleFonts: {
    display: 'swap',
    prefetch: true,
    preconnect: true,
    useStylesheet: true,
    families: {
      Almarai: [300, 400, 500],
      Tajawal: [400],
      'Playfair+Display': [400],
      Sora: [400],
      Poppins: [400],
      Amiri: [400],
      Cairo: [400],
      'Readex+Pro': [400],
      Oswald: [400]
    }
  },
  purgeCSS: {
    enabled: true,
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'server/**/*.js',
      'store/**/*.js'
    ],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'staleWhileRevalidate'
      }
    ]
  },
  pwa: {
    icon: false,
    manifest: {
      lang: 'en'
    }
  },
  modules: [
    '@nuxtjs/sentry',
    '@nuxt/image',
    '@nuxtjs/axios',
    'nuxt-compress',
    'nuxt-ssr-cache'
  ],
  sentry: {
    dsn: "https://eeadd4a49212a8a9366043f9ed580788@logs.storeino.com/37",
    config: {
      debug: true
    },
    clientConfig: {
      dsn: "https://eeadd4a49212a8a9366043f9ed580788@logs.storeino.com/37"
      }
  },
  axios: {},
  'nuxt-compress': {
    gzip: {
      threshold: 8192
    },
    brotli: {
      threshold: 8192
    }
  },
  cache: {
    useHostPrefix: true,
    pages: [
      '/'
    ],
    store: {
      type: 'memory',
      max: 100,
      ttl: 60
    }
  },
  serverMiddleware: ['~/server/index'],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    terser: true,
    optimizeCSS: true,
    treeShaking: true,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    postcss: {
      postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          cssNano({
            preset: 'default'
          }),
          purgeCss({
            enabled: true,
            content: [
              './components/**/*.vue',
              './layouts/**/*.vue',
              './pages/**/*.vue',
              './plugins/**/*.js',
              './server/**/*.js',
              './store/**/*.js',
            ],
            safelist: ['html', 'body'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ]
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
          tailwindConfig: {
            test: /tailwind\.config/,
            chunks: 'all',
            priority: 10,
            name: true
          }
        }
      },
      minimizer: [
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          },
        }),
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            },
          },
        })
      ]
    }
  }
}
