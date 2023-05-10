const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, './build'),
		filename: 'main.js',
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './public/index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
			  		loader: "babel-loader",
					  options: { 
						presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"]
					  }
				},
			},
			{
				test: /\.s(a|c)ss?$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|svg)$/,
				use: [
					{
					    loader: 'file-loader',
					    options: {
							name: '[name].[ext]',
							outputPath: 'audio/'
						}
					}
				]
			}
		],
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@styles': path.resolve(__dirname, 'src/styles')
		},
	},
}
