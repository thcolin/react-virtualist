module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'VirtuaList',
      externals: {
        react: 'React'
      }
    }
  }
}
