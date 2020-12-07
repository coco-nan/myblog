const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    outputDir: 'dist',
    configureWebpack: {
        // plugins: [new WebpackBundleAnalyzerPlugin()]
    },

    productionSourceMap: false,
}