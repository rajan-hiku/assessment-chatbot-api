import resolve from "@rollup/plugin-commonjs";

export default {
  input: "nearestCenter.js",
  output: {
    file: "functions/nearestCenter.js",
    format: "cjs"
  },
  plugins: [resolve()]
};
