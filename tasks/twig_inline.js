/*
 * grunt-twig-inline
 * https://github.com/mentatxx/grunt-twig-inline
 *
 * Copyright (c) 2015 Alexey Petushkov
 * Licensed under the MIT license.
 */

'use strict';

var jsEsc = require('jsesc');

module.exports = function (grunt) {

    function filterIdentifier(ident) {
        return /^[a-zA-Z0-9_-]+$/.test(ident);
    }

    function notEmpty(ident) {
        return !!ident;
    }

    grunt.registerMultiTask('twig_inline', 'Include a pack of .twig templates as inline JS script', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            variablePrefix: '',
            pathPrefixLength: 0
        });
        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Generate variable name
                var variableName = filepath.split(/[\/\\]/).slice(options.pathPrefixLength).filter(filterIdentifier).join('__');
                if (!variableName) {
                    return '';
                }
                var escapedContent = jsEsc(grunt.file.read(filepath));
                // Read file source.
                return 'var '+options.variablePrefix+variableName+' = \''+escapedContent+'\';\n';
            }).filter(notEmpty).join('');

            // Handle options.
            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
