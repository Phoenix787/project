const path = require('path');

module.exports = {
	entry: './src/main.js',
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		watchContentBase: true,
		port: 9000
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};