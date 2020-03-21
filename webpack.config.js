module.exports = {
  mode: "development",
  entry: {
    nearestCenter: "./functions/nearestCenter.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  }
};
