const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
	entry: [
		'react-hot-loader/patch',
		'babel-polyfill',
		'webpack/hot/only-dev-server',
		'webpack-dev-server/client?http://localhost:8888',
		'./src/index'
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[hash].js'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,

				use: {
					loader: 'babel-loader',
					query: {
						presets: [ 'env', 'react', 'stage-2' ]
					}
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'})
	],

	resolve: {
		extensions: ['.js', '.jsx']
	},
};

module.exports = config;
