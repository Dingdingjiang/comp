const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'ele.common.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compileOptions: {
                        preserveWhitespace: false
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}