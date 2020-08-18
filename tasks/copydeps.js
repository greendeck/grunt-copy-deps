/*
 * grunt-copy-dependencies
 * https://github.com/laurenhamel/grunt-copy-dependencies
 *
 * Copyright (c) 2018 Lauren Hamel
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  grunt.registerMultiTask('copydeps', 'Copy `package.json` dependencies from `node_modules` to a destination of your choosing', function () {

    // Get options.
    var options = this.options({

    });

    // Read package data.
    var pkg = grunt.file.readJSON(path.resolve(this.data.pkg));

    // Get the target destination.
    var dest = this.data.dest;

    // Get dependencies.
    var dependencies = Object.keys(pkg.dependencies);

    // Create globs of the dependencies.
    var files = [];
    dependencies.forEach(function(dependency){

      // Start a glob path.
      var glob = 'node_modules/' + dependency + '/**/' + '*.*';
      files.push(glob)

    });


    // Resolve globs.
    files = grunt.file.expand(files);

    // Fetch and copy dependencies.
    files.forEach(function(file){

      grunt.file.copy(file, path.resolve(dest, file.replace('node_modules/','')));

    });




  });

};
