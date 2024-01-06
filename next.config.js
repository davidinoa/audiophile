/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  /**
   * @typedef {import('webpack').Configuration} WebpackConfig
   * @type { (config: WebpackConfig) => WebpackConfig }
   **/
  webpack(config) {
    if (!config.module) {
      throw new Error('webpack config has no module property')
    }

    config.module.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default config
