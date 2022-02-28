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
          '@models': './src/app/models',
          '@views': './src/app/views',
          '@middlewares': './src/app/middlewares',
          '@validators': './src/app/validators',
          '@libs': './src/libs',
          '@config': './src/config',
          '@services/*': './src/app/services/*',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
