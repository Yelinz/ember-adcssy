/* global module */

module.exports = {
  normalizeEntityName: function() { },

  afterInstall: function() {
    return this.addBowerPackagesToProject([
        { name: 'adcssy', target: 'adfinis-sygroup/adcssy#master' },
        { name: 'font-awesome', target: '^4.7.0' }
    ])
  }
}
