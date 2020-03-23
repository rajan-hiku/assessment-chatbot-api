import resolve from '@rollup/plugin-commonjs'
// to do: allow multiple entry and multipe output
export default [
  {
    input: 'twilioFunctions/nearestCenter.js',
    output: {
      file: 'functions/nearestCenter.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/nearestHospital.js',
    output: {
      file: 'functions/nearestHospital.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/informationRoute.js',
    output: {
      file: 'functions/informationRoute.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  }
]
