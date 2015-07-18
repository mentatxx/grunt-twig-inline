# grunt-twig-inline

> Include a pack of .twig templates as inline JS script

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-twig-inline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-twig-inline');
```

## The "twig_inline" task

### Overview
In your project's Gruntfile, add a section named `twig_inline` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  twig_inline: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.variablePrefix
Type: `String`
Default value: `',  '`

Prefix string value that will be inserted before a variable name

#### options.pathPrefixLength
Type: `Integer`
Default value: `0`

How many path levels to cut

#### options.twigTemplate
Type: `Boolean`
Default value: `false`

Wrap imported content with twig render wrapper

### Usage Examples

#### Default Options
In this example, `dest/imported.js` is created. Two variables are declared with content of files `templates/first.twig` and `templates/second.twig`

```js
grunt.initConfig({
  twig_inline: {
    options: {},
    files: {
      'dest/imported.js': ['templates/first.twig', 'templates/second.twig'],
    },
  },
});
```

#### Custom Options
In this example, `dest/imported.js` is created. Two variables are declared with prefix `twig`, cuted `templates` folder name, and content of files `templates/first.twig` and `templates/second.twig` wrapped in a lazy loader of twig render.

```js
grunt.initConfig({
  twig_inline: {
    options: {
      variablePrefix: 'twig',
      pathPrefixLength: 1,
      twigTemplate: true
    },
    files: {
      'dest/imported.js': ['templates/first.twig', 'templates/second.twig'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - initial version: import files in .js variables, make lazy twig render wrapper
