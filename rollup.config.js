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
  },
  {
    input: 'twilioFunctions/triage4.js',
    output: {
      file: 'functions/triage4.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/triage3.js',
    output: {
      file: 'functions/triage3.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/triage2.js',
    output: {
      file: 'functions/triage2.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  }
]
