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
        return /^[a-zA-Z0-9_.-]+$/.test(ident);
    }

    function notEmpty(ident) {
        return !!ident;
    }

    function removeDots(ident) {
        return ident.replace('.', '_');
    }

    var twigLazyTemplate = "function __twigLazyTemplate(id, template) {var __instance;return function(context, params) {if (!__instance) {var tpl = twig({id: id, data: template});__instance = tpl.render.bind(tpl);}return __instance(context, params);};}\n";

    grunt.registerMultiTask('twig_inline', 'Include a pack of .twig templates as inline JS script', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            variablePrefix: '',
            pathPrefixLength: 0,
            twigTemplate: false
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
                var variableName = filepath.split(/[\/\\]/).slice(options.pathPrefixLength).filter(filterIdentifier).map(removeDots).join('__');
                if (!variableName) {
                    return '';
                }
                var escapedContent = jsEsc(grunt.file.read(filepath));
                // Read file source
                if (options.twigTemplate) {
                    return 'var '+options.variablePrefix+variableName+' = __twigLazyTemplate(\''+variableName+'\', \''+escapedContent+'\');\n';
                } else {
                    return 'var '+options.variablePrefix+variableName+' = \''+escapedContent+'\';\n';
                }
            }).filter(notEmpty).join('');

            // Write the destination file.
            if (options.twigTemplate) {
                grunt.file.write(f.dest, twigLazyTemplate+src);
            } else {
                grunt.file.write(f.dest, src);
            }

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
