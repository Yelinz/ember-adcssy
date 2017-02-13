/* global module */

module.exports = {
  normalizeEntityName: function() { },

  afterInstall: function() {
    this.addBowerPackageToProject('adcssy', 'adfinis-sygroup/adcssy#master')
    this.addBowerPackageToProject('font-awesome', '^4.7.0')
  }
}
