const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "./[name][ext]",
        },
      },
    ],
  },
};
