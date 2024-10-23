import merge from '~lodash.mergewith'
import { init } from '~@sentry/vue'
import * as CoreSdk from '~@sentry/core'
import * as BrowserSdk from '~@sentry/browser-sdk'
import { ExtraErrorData, ReportingObserver, RewriteFrames } from '~@sentry/integrations'

export { init }
export const SentrySdk = { ...CoreSdk, ...BrowserSdk }

export function getConfig (ctx) {
  /* eslint-disable object-curly-spacing, quote-props, quotes, key-spacing, comma-spacing */
  const config = {
    dsn:"https:\u002F\u002F1401e2d8ce03e4c240d1d1b972bed270@logs.storeino.com\u002F6",
    environment:"development",
    debug:true,
  }

  config.integrations = [
    new ExtraErrorData(),
    new ReportingObserver({ types:["crash"] }),
    new RewriteFrames(),
  ]

  const runtimeConfigKey = "sentry"
  if (ctx.$config && runtimeConfigKey && ctx.$config[runtimeConfigKey]) {
    merge(config, ctx.$config[runtimeConfigKey].config, ctx.$config[runtimeConfigKey].clientConfig)
  }

  return config
}
