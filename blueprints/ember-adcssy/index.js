/* global module */

module.exports = {
  afterInstall: function() {
    return this.addBowerPackageToProject('adcssy', 'adfinis-sygroup/adcssy#master')
  }
}
