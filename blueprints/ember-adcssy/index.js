/* global module */

module.exports = {
  normalizeEntityName: function() { },

  afterInstall: function() {
    return this.addBowerPackageToProject('adcssy', 'adfinis-sygroup/adcssy#master')
  }
}
