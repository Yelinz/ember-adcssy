/* global module, require, __dirname */

var funnel     = require('broccoli-funnel')
var mergeTrees = require('broccoli-merge-trees')

module.exports = {
  name: 'ember-adcssy',
  included: function(app, parentAddon) {
    this._super.included(app)
    this.app = app

    app.import(app.bowerDirectory + '/adcssy/build/css/adcssy.css')
  },

  treeForPublic: function(inputTree) {
    var trees = []

    var adcssyAssets = funnel(this.app.bowerDirectory + '/adcssy/assets', {
      srcDir: '/',
      include: [ 'fonts/*', 'pictures/**/*' ],
      destDir: '/'
    })

    var fontAwesome = funnel(__dirname + '/node_modules/font-awesome/fonts', {
      destDir: '/fonts'
    })

    if (inputTree) {
      trees.push(inputTree)
    }

    trees.push(adcssyAssets)
    trees.push(fontAwesome)

    return mergeTrees(trees)
  }
}
