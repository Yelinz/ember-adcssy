/* global module */

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addAddonToProject('ember-cli-postcss').then(() => {
      return this.addPackagesToProject([
        { name: 'postcss-import' },
        { name: 'postcss-cssnext' },
        { name: 'postcss-responsive-type' }
      ])
    })
  }
}
