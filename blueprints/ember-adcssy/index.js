/* global module */

module.exports = {
  afterInstall() {
    this.addAddonToProject('ember-cli-postcss')
    this.addPackagesToProject([
      { name: 'postcss-import' },
      { name: 'postcss-cssnext' },
      { name: 'postcss-responsive-type' }
    ])
  }
}
