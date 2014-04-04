/*
 * grunt-legacssy
 * https://github.com/pokornyr/legacssy
 *
 * Copyright (c) 2013 Robin Pokorný
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var css = require('css'),
      chalk = require('chalk'),
      maxmin = require('maxmin'),
      options;

  grunt.registerMultiTask('legacssy', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    options = this.options({
      legacyWidth: 1024,
      matchingOnly: true,
      overridesOnly: false
    });

    if (this.files.length < 1) {
      grunt.verbose.warn('Destination not written because no source files were provided.');
    }

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));

      // Parse the style
      var style = css.parse(src);

      // Do the magic!
      style.stylesheet.rules = stripMediaQueries(style.stylesheet.rules, options.overridesOnly);

      var output = css.stringify(style);
      // Write the destination file.
      grunt.file.write(f.dest, output);

      // Print a success message.
      grunt.log.writeln('File "' + chalk.cyan(f.dest) + '" created: ' +
                        maxmin(src, output, false));
    });
  });

  var isUnsupported = function (media) {
    // Tokens `only` and `not` are new in CSS3
    // Every expression has to start with `(`
    var re = /(only)|(not)|(\()/;
    if (media.match(re)) {
      return true;
    } else {
      return false;
    }
  };

  var isMatching = function (media) {
    var queries = media.split(/\s*,\s*/);

    for (var i = 0; i < queries.length; i++) {
      // RegExps are based on ones from scottjehl/Respond
      var minw = queries[i].match( /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)[^\d\)]*\s*\)/ ) && parseFloat( RegExp.$1 ), 
          maxw = queries[i].match( /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)[^\d\)]*\s*\)/ ) && parseFloat( RegExp.$1 );

      // If this does not match, move to the next
      if ((minw && minw > options.legacyWidth) ||
          (maxw && maxw < options.legacyWidth)) {
        continue;
      }

      // Match found
      return true;
    }
 
    return false;
  };

  var stripMediaQueries = function (rules, innerOnly) {
    var tmp = [];
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].type === "media" && isUnsupported(rules[i].media)) {
        if (!options.matchingOnly || isMatching(rules[i].media)) {
          tmp = tmp.concat(stripMediaQueries(rules[i].rules, false));
        }
      } else {
          if (!innerOnly) {
              tmp.push(rules[i]);
          }
      }
    }
    return tmp;
  };

};
