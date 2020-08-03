import * as webpack from "webpack";
import path = require("path");

const r = (file: string) => path.resolve(__dirname, file);

module.exports = {
	entry: [r("src/index.tsx")],
	output: {
		path: r("build"),
		filename: "index.js",
		libraryTarget: "commonjs",
	},
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
			{
				test: /\.(jpe?g|png|gif|eot|ttf|svg|woff|woff2|md)$/i,
				loader: "file-loader",
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
		],
	},
} as webpack.Configuration;
