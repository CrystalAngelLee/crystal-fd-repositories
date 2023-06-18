module.exports = {
  sum(a, b) {
    return a + b
  },
  init({ option, param }) {
    console.log('init', option, param)
  },
}
