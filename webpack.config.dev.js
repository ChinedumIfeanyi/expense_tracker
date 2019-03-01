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
		path: path.resolve(__dirname, "server", "dist"),
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
		"proxy": {
		  "**": "http://[::1]:8000"
		},
		stats: {
			modules:false,
			colors: true,
			chunks: false
		},
		hot: true,
		noInfo: true,
		historyApiFallback: true,
		inline: true,
		contentBase: path.resolve(__dirname, "./server/dist"),
		watchOptions: {
			ignored: /node_modules/,
			poll: true
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './client/index.html',
			inject: true
		})
	]
}