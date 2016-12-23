module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/js/',
		filename: 'app.js'
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			test: /\.css$/,
			loader: "style!css"
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			loaders: ['style', 'css', 'sass']
		}
		]
	}
}