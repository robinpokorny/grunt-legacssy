/*
 * grunt-test2
 * https://github.com/pokornyr/test2
 *
 * Copyright (c) 2013 pokornyr
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var css = require('css');

  grunt.registerMultiTask('legacssy', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      stripMediaQueries: true
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

      if (options.stripMediaQueries) {
        style.stylesheet.rules = stripMediaQueries(style.stylesheet.rules);
      }

      // Write the destination file.
      grunt.file.write(f.dest, css.stringify(style));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

  var stripMediaQueries = function (rules) {
      var tmp = [];
      for (var i = 0; i < rules.length; i++) {
            if (rules[i].type === "media") {
                tmp = tmp.concat(stripMediaQueries(rules[i].rules));
            } else {
                tmp.push(rules[i]);
            }
        }
        return tmp;
  };

};
