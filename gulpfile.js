const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  rename: {
    'gulp-merge-media-queries': 'mmq',
  },
});
// AVAILABLE GULP PLUGINS
//
// - babel
// - cleanCss
// - concat
// - if
// - mmq (merge media queries)
// - pixrem
// - postcss
// - rename
// - sass
// - souremaps
// - uglify
const del = require('del');
const yargs = require('yargs');

const PRODUCTION = Boolean(yargs.argv.production);

const PATHS = {
  public: {
    assetInjections: {
      // Scripts, styles, and images should go here
      assets: 'public/asset-injections/assets',
      // Any liquid includes should go here
      snippets: 'public/asset-injections/snippets',
    },
  },
  foundation: {
    scss: [
      'node_modules/foundation-sites/scss',
      'node_modules/motion-ui/src',
    ],
    js: [
      // Foundation Core
      'node_modules/foundation-sites/js/foundation.core.js',
      'node_modules/foundation-sites/js/foundation.util.keyboard.js',
      'node_modules/foundation-sites/js/foundation.util.triggers.js',
      'node_modules/foundation-sites/js/foundation.util.mediaQuery.js',
      'node_modules/foundation-sites/js/foundation.util.motion.js',
      // Foundation UI Modules
      'node_modules/foundation-sites/js/foundation.reveal.js',
      // File with init call
      'src/js/foundation.js',
    ],
  },
  // TODO Add proper paths once crop shop is published to npm
  cropshop: {
    scss: [],
    js: [],
  },
};

const COMPATABILITY = [
  'last 2 versions',
  'ie >= 9',
  'ios >= 7',
];

function clean(done) {
  del('public/asset-injections/assets');
  done();
}

// Styles
function styles() {
  return gulp.src('src/scss/cropshop.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.foundation.scss,
    }))
    .pipe($.autoprefixer({
      browsers: COMPATABILITY,
    }))
    .pipe($.mmq({
      log: true,
    }))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write('./')))
    .pipe($.if(PRODUCTION, $.cleanCss({
      // Level of optimization [0, 1, 2]
      // 0 - None
      //
      // 1 - operate on single properties only, e.g. can remove units when not required,
      //     turn rgb colors to a shorter hex representation, remove comments, etc.
      //
      // 2 - operate at rules or multiple properties level, e.g. can remove duplicate
      //     rules, remove properties redefined further down a stylesheet, or restructure
      //     rules by moving them around.
      level: 2,
    })))
    .pipe($.if(PRODUCTION, $.rename((path) => {
      path.basename = `${path.basename}.min`;
    })))
    .pipe(gulp.dest(PATHS.public.assetInjections.assets));
}

// Scripts
function foundationScripts() {
  return gulp.src(PATHS.foundation.js)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .on('error', (error) => {
      console.error('\x1b[31m%s\x1b[0m', error.message);
      console.log(error.codeFrame);
      this.emit('end'); // eslint-disable-line babel/no-invalid-this
    })
    .pipe($.if(PRODUCTION, $.concat('app.min.js'), $.concat('app.js')))
    .pipe($.if(PRODUCTION, $.uglify()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write('./')))
    .pipe(gulp.dest(PATHS.public.assetInjections.assets));
}

// CropShop scripts
// TODO add proper paths once CropShop is published to npm and imported into this app
// function cropshopScripts() {
//   return gulp.src('')
//     .pipe(gulp.dest(PATHS.public.assetInjections.assets));
// }

// Build series
gulp.task('build',
  gulp.series(clean, gulp.parallel(styles, foundationScripts)));
