/* global module, require, __dirname */

var funnel     = require('broccoli-funnel')
var mergeTrees = require('broccoli-merge-trees')

module.exports = {
  name: 'ember-adcssy',
  included: function(app, parentAddon) {
    this._super.included(app)
    this.app = app

    app.import('vendor/ember-adcssy/register-version.js')
    app.import(app.bowerDirectory + '/adcssy/build/css/adcssy.css')
  },

  treeForPublic: function(inputTree) {
    var trees = []

    var adcssyAssets = funnel(this.app.bowerDirectory + '/adcssy/assets', {
      srcDir: '/',
      include: [ 'fonts/*', 'pictures/**/*' ],
      destDir: '/'
    })

    var fontAwesome = funnel('node_modules/font-awesome/fonts', {
      destDir: '/fonts'
    })

    var adcssySourcemap = funnel(this.app.bowerDirectory + '/adcssy/build/css', {
      destDir: '/assets',
      include: [ 'adcssy.css.map' ]
    })

    if (inputTree) {
      trees.push(inputTree)
    }

    trees.push(adcssyAssets)
    trees.push(fontAwesome)
    trees.push(adcssySourcemap)

    return mergeTrees(trees)
  }
}
