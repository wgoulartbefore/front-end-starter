const base = {
  src: './src',
  dist: './dist',
};

module.exports = {
  js: {
    src: base.src + '/**/*.js',
    dist: base.dist + '/',
    del: [base.dist + '/**/*.js']
  },
  server: {
    src: base.dist,
  },
  html: {
    src: base.src + '/**/*.html',
    dist: base.dist,
    del: [base.dist + '/**/*.html']
  },
  sass: {
    src: base.src + '/**/*.scss',
    dist: base.dist,
    del: [base.dist + '/**/*.css']
  },
  images: {
    src: base.src + '/images/**/*.*',
    dist: base.dist + '/images',
    del: [base.dist + '/images/**/*.*']
  },
  vendors: {
    src: base.src + '/vendors/**/*.*',
    dist: base.dist + '/vendors',
    del: [base.dist + '/vendors/**/*.*']
  },
  browsersync: {
    options: {
      server: {
        baseDir: base.dist,
        directory: true
      },
      notify: false,
    },
  },
};
