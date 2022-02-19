const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json'
      }
    }
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      '#components/*': path.resolve(__dirname, 'src/components/*'),
      '#interfaces': path.resolve(__dirname, 'src/interfaces'),
      '#store': path.resolve(__dirname, 'src/store'),
      '#store/*': path.resolve(__dirname, 'src/store/*'),
      '#utils/*': path.resolve(__dirname, 'src/utils/*')
    }
  }
};
