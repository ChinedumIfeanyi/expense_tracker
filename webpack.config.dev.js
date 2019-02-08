'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	name: "browser",
	mode: "development",
	entry: "./client/App.js",
	output: {
		path: path.resolve(__dirname, "client", "public"),
		filename: '[name].bundle.js',
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: "vue-loader"
			},
			{
				test: /\.js$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}
		]
	},
	devServer:{
		hot: true,
		historyApiFallback: true,
		inline: true,
		contentBase: path.resolve(__dirname, "client", "public")
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin()
		// new HtmlWebpackPlugin({
		// 	filename: 'index.html',
		// 	template: './client/index.html',
		// 	inject: true
		// })
	]
}