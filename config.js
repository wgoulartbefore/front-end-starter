const base = {
  src: './src',
  dist: './dist',
};

module.exports = {
  js: {
    src: base.src + '/**/*.js',
    dist: base.dist + '/',
    del: [base.dist + '/**/*.js'],
  },
  server: {
    src: base.dist,
  },
  html: {
    src: base.src + '/**/*.html',
    dist: base.dist,
    del: [base.dist + '/**/*.html'],
  },
  sass: {
    src: base.src + '/**/*.scss',
    dist: base.dist,
    del: [base.dist + '/**/*.css'],
  },
  images: {
    src: base.src + '/images/**/*.*',
    dist: base.dist + '/',
    del: [base.dist + '/images/**/*.*'],
  },
  vendors: {
    src: base.src + '/**/*.*',
    dist: base.dist + '/',
    del: [base.dist + '/**/*.*'],
  },
  browsersync: {
    options: {
      server: {
        baseDir: base.dist,
      },
      notify: false,
    },
  },
};
