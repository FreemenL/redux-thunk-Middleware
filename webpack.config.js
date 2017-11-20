const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.resolve(__dirname,'./src');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const config = {
    entry:{
        app:path.resolve(__dirname,'./src/app.js')
    },
    output:{
      filename:'[name].bundle.js',
      path:path.resolve(__dirname,'dist')
    },
    devtool: 'inline-source-map',
    module:{
      rules:[{
        test:/\.bundle\.js$/,
        use:'bundle-loader'
      },{
        test:/\.(js|jsx)$/,
        use:'babel-loader'
      },{
       test: /\.css$/,
       use: [
         'style-loader',
         'css-loader'
       ]
     },{
      test:/\.(png|svg|jpg|gif)/,
      use:[
        'file-loader?name=images/[hash:8].[name].[ext]',{
          loader:'image-webpack-loader',
          options:{
            bypassOnDebug:true,
          }
        }
      ]
     },{
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       use: [
         'file-loader'
       ]
     }]
    },
    devServer: {
      proxy: {
        '/data_api/*': {
          target: 'http://localhost:9000',
          secure: false,
          pathRewrite: {'^/data_api' : ''}
        }
      }
    },
    plugins:[
      new CommonsChunkPlugin({
        name:"init",
        filename:"init.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
      }),
      new HtmlWebpackPlugin({
        title:'learn redux',
        template:'./template/index.html'
      }),//自动生成html
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{
    extensions: [".js", ".json",".jsx"],
    alias:{//配置路径常量
      components:`${srcPath}/components`,
      actions:`${srcPath}/actions`,
      constants:`${srcPath}/constants`
    }
  }
}


module.exports = config;