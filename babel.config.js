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
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/app/controllers',
          '@repositories': './src/app/repositories',
          '@views': './src/app/views',
          '@middlewares': './src/app/middlewares',
          '@validators': './src/app/validators',
          '@providers': './src/providers',
          '@config': './src/config',
          '@services/*': './src/app/services/*',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
