'use strict';

module.exports = function() {};

/**
 * Returns the option name to JSCS.
 * @return {string} the option name.
 */
module.exports.prototype.getOptionName = function() {
  return 'closureCamelCase';
};

/**
 * Configure the rule parameters.
 * @param  {!boolean} value the value for this rule.
 */
module.exports.prototype.configure = function(value) {
  // rule preparation and configuration
  this._options = value;
};

/**
 * Checks whether or not the rule is being broken.
 * @param  {Object} file   the file being checked
 * @param  {Object} errors the current list of errors on the file
 */
module.exports.prototype.check = function(file, errors) {
  if (!this._options) {
    return;
  }
  file.iterateTokensByType('Identifier', function(token) {
    var name = token.value;
    if (name.replace(/^_+/g, '')
            .replace(/^opt_+/g, '')
            .replace(/_+$/g, '')
            .indexOf('_') === -1 ||
        name.toUpperCase() === name) {
      return;
    }
    errors.add(
      'All identifiers must be camelCase or UPPER_CASE',
      token.loc.start.line,
      token.loc.start.column
    );
  });
};
