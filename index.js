/* global module, require, __dirname */

const postcss = require('broccoli-postcss-single')
const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')

const fs = require('fs')
const path = require('path')

const adcssyPath = path.dirname(require.resolve('adcssy/package.json'))
const faPath = path.dirname(require.resolve('font-awesome/package.json'))

module.exports = {
  name: 'ember-adcssy',

  treeForPublic() {
    let trees = []

    let adcssyAssets = new Funnel(`${adcssyPath}/assets/pictures`, {
      destDir: '/'
    })

    let adcssyFonts = new Funnel(`${adcssyPath}/assets/fonts`, {
      destDir: '/fonts'
    })

    let faFonts = new Funnel(`${faPath}/fonts`, { destDir: '/fonts' })

    trees.push(adcssyAssets)
    trees.push(adcssyFonts)
    trees.push(faFonts)

    return mergeTrees(trees, { overwrite: true })
  },

  treeForAddon() {
    return postcss([`${adcssyPath}/css`], 'adcssy.css', 'adcssy.css', {
      plugins: [
        { module: require('postcss-import') },
        {
          module: require('postcss-cssnext'),
          options: {
            browsers: '> 2%, last 2 versions, Firefox ESR',
            features: { rem: false }
          }
        },
        { module: require('postcss-responsive-type') }
      ],
      map: { inline: true }
    })
  }
}
