/* global module, require */

const Funnel = require('broccoli-funnel')
const Merge = require('broccoli-merge-trees')

const fs = require('fs')
const path = require('path')

const faPath = path.dirname(require.resolve('font-awesome/package.json'))
const adcssyPath = path.dirname(require.resolve('adcssy/package.json'))

const DEFAULT_POSTCSS_OPTIONS = {
  filter: { enable: false },
  compile: {
    enable: true,
    plugins: [
      { module: require('postcss-import') },
      { module: require('postcss-preset-env') },
      { module: require('postcss-responsive-type') }
    ]
  }
}

module.exports = {
  name: 'ember-adcssy',

  /**
   * Set the default options for ember-cli-postcss if none are given by the
   * application.
   */
  included(app) {
    this._super.included.apply(this, arguments)

    app.options.postcssOptions = Object.assign(
      DEFAULT_POSTCSS_OPTIONS,
      app.options.postcssOptions
    )
  },

  /**
   * Load the assets of font-awesome and adcssy into the default asset folder.
   * We explicitly don't call the super function here so that the assets are
   * not namespaced.
   */
  treeForPublic(tree) {
    let adcssyAssets = new Funnel(`${adcssyPath}/assets`, {
      destDir: '/'
    })

    let faFonts = new Funnel(`${faPath}/fonts`, {
      destDir: '/fonts'
    })

    return new Merge([adcssyAssets, faFonts, tree].filter(Boolean))
  },

  /**
   * Load the styles of font-awesome and adcssy
   */
  treeForStyles(tree) {
    let adcssyStyles = new Funnel(`${adcssyPath}/css`)

    let faStyles = new Funnel(`${faPath}/css`)

    let trees = new Merge([adcssyStyles, faStyles, tree].filter(Boolean))

    return this._super.treeForStyles.call(this, trees)
  }
}
