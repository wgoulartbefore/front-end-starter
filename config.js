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
  browsersync: {
    options: {
      server: {
        baseDir: base.dist,
      },
      notify: false,
    },
  },
};
