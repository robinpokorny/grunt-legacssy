# grunt-legacssy [![Dependency Status](https://gemnasium.com/robinpokorny/grunt-legacssy.png)](https://gemnasium.com/robinpokorny/grunt-legacssy)

> Fix your CSS for legacy browsers

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-legacssy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-legacssy');
```

## The "legacssy" task

### Overview
_Run this task with the `grunt legacssy` command._

The task concats provided styles and when it finds unsupported (i.e. CSS3) @media query it tests the min-width and max-width and if it matches the rules inside the @media are included in the resulting style.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### legacyWidth
type: `Number`
Default: 1024

#### matchingOnly
Type: `Boolean`
Default: True

Unsupported media queries are flattened only if their min-width and max-width match with *legacyWidth*. Comparision is number only, that means it is compatible with both px's and em's as long as there is only one of them used.

#### overridesOnly
Type: `Boolean`
Default: False

Please note this might change the desired outcome, see the corresponding [issue comment](https://github.com/robinpokorny/grunt-legacssy/issues/4#issuecomment-31345973).

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  legacssy: {
    dist {
      files: {
        'css/style-legacy.css': 'css/style.css',
      },
    },
  },
})
```

#### Default Options

```js
grunt.initConfig({
  legacssy: {
    dist {
      options: {
        // Include only styles for a screen 800px wide
        legacyWidth: 800
      },
      files: {
        'css/style-legacy.css': 'css/style.css',
      },
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* v0.4.0   Add colours and report to the output
* v0.3.0   Output only overrides
* v0.2.0   Media matching added
* v0.1.0   Initial task with basic functionality.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/robinpokorny/grunt-legacssy/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
