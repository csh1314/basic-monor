class StaticPageSlicePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise("StaticPageSlice", compilation => {
      return new Promise(resolve => {
          console.log("StaticPageSlice is being called")
          console.log(compilation)
          resolve();
      })
  });
  }
}

module.exports = StaticPageSlicePlugin;