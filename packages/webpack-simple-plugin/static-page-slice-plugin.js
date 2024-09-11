const mockInjector = {
  header: "<div>This is inject header</div>",
  footer: "<div>This is inject footer</div>"
}

class StaticPageSlicePlugin {
  constructor(options) {
    this.options = options
  }

  getSimulateRemoteData(key) {
    console.log('fetch url to get remote inject data from:', `${this.options.injectorUrl}/${key}`)
    const data = mockInjector
    return Promise.resolve(data?.[key] || '')
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('StaticPageSlice', compilation => {
      // use Compilation.hooks.processAssets
      compilation.hooks.processAssets.tapPromise(
        {
            name: "StaticPageSlice",
            stage: compilation.constructor.PROCESS_ASSETS_STAGE_ADDITIONS,
            additionalAssets: true,
        },
        assets => this.replaceHtmlAsserts(assets, compilation)
    );
    })
  }

  replaceHtmlAsserts(assets, compilation) {
    return new Promise(resolve => {
      const cache = {}

      const assetKeys = Object.keys(assets)

      for (const key of assetKeys) {
        const isLast = key === assetKeys[assetKeys.length - 1]
        // if not html file
        if (!/.*\.html$/.test(key)) {
          if (isLast) resolve()
          continue
        }

        let targetSource = compilation.assets[key].source()

        const matchedArray = Array.from(targetSource.matchAll(/<!-- inject:name="(\S*?)" -->/g))

        const matchedInjectTags = matchedArray.map(([tag, name]) => ({
          tag,
          name,
          data: cache[name] || this.getSimulateRemoteData(name)
        }))

        Promise.all(matchedInjectTags.map(i => i.data))
          .then(injectDataArray => {
            for(let i = 0, len = injectDataArray.length; i < len; i++) {
              const { tag, name } = matchedInjectTags[i]
              const replaceData = injectDataArray[i]
              cache[name] = cache[name] || replaceData
              targetSource = targetSource.replace(tag, replaceData)
            }

            // update assets source
            compilation.assets[key] = {
              source() {
                  return targetSource;
              },
              size() {
                  return this.source().length;
              },
          };
          })
          .then(() => {
            isLast && resolve()
          })
      }
    })
  }
}

module.exports = StaticPageSlicePlugin;