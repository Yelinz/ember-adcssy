/* global module, require, __dirname */

const Funnel = require('broccoli-funnel')
const Merge = require('broccoli-merge-trees')

const fs = require('fs')
const path = require('path')

const adcssyPath = path.dirname(require.resolve('adcssy/package.json'))

module.exports = {
  name: 'ember-adcssy',

  treeForPublic(inputTree) {
    let trees = []

    let adcssyAssets = new Funnel(`${adcssyPath}/assets`, {
      destDir: '/'
    })

    trees.push(adcssyAssets)

    return new Merge(trees)
  },

  treeForAddon(inputTree) {
    return new Funnel(`${adcssyPath}/css`)
  }
}
