module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    [
      'module-resolver',
      {
        alias: {
          '@views': './src/app/views',
          '@middlewares': './src/app/middlewares',
          '@errors': './src/app/errors',
          '@providers': './src/providers',
          '@config': './src/config',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
