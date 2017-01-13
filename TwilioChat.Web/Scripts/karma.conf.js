// Karma configuration
// Generated on Tue Dec 13 2016 16:39:58 GMT-0300 (ART)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha', 'sinon'],


    preprocessors: {'**/*.html': ['html2js']},


    // list of files / patterns to load in the browser
    files: [
       'node_modules/babel-polyfill/dist/polyfill.js',
       'node_modules/jquery/dist/jquery.js',
       'node_modules/moment/moment.js',
       'node_modules/mocha/dist/mocha.js',
       'node_modules/chai/dist/chai.js',
       'node_modules/sinon/dist/sinon.js',
       'lib/dateformatter.js',
       'lib/jquery-throttle.min.js',
       'lib/jquery.loadTemplate-1.4.4.min.js',
       'lib/twiliochat.js',
       'tests/tests.html',
       'tests/tests.js',
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable/disable watching file and executing tests whenever any file change
    autoWatch: false,


    // start these browsers
    // available browser launchers: npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
