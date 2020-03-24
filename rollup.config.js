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
    input: 'twilioFunctions/triage1.js',
    output: {
      file: 'functions/triage1.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/Questions1.js',
    output: {
      file: 'functions/Questions1.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/safetytips.js',
    output: {
      file: 'functions/safetytips.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/selfisolation.js',
    output: {
      file: 'functions/selfisolation.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/newsupdate.js',
    output: {
      file: 'functions/newsupdate.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  }
]
