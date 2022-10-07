module.exports = {
  entry: { content: 'src/content.ts', background: 'src/background.ts' },
  optimization: {
    runtimeChunk: false,
  },
  output: {
    filename: '[name].js',
  },
};
