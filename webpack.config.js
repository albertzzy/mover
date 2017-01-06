const { resolve } = require('path')

module.exports = {
  // 配置页面入口js文件
  entry: './app.js',

  // 配置打包输出相关
  output: {
    // 打包输出目录
    path: resolve(__dirname, 'dist'),

    // 入口js的打包输出文件名
    filename: 'index.js'
  },

  module: {

    rules: [
      {
  
        test: /\.js$/,

        exclude: /node_modules/,
        
        use: ['babel-loader', 'eslint-loader']
      },
      
    ]
  },
  
}