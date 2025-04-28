import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import sass from 'sass';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: { modules: { auto: true } },
              },
            ],
          },
          {
            test: /\.s[ac]ss$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: { auto: true },
                  importLoaders: 2,
                },
              },
              require.resolve('resolve-url-loader'),
              {
                loader: require.resolve('sass-loader'),
                options: {
                  implementation: sass,
                  sourceMap: true,
                  sassOptions: {
                    // не показывать предупреждения из зависимостей
                    quietDeps: true,                             
                    // игнорировать именно депрекации legacy JS API
                    silenceDeprecations: ['legacy-js-api'],      
                    // можно полностью выключить все сообщения:
                    logger: sass.Logger.silent,                  
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
  webpackFinal: async (storybookConfig) => {
    // алиасы
    if (storybookConfig.resolve) {
      storybookConfig.resolve.alias = {
        ...(storybookConfig.resolve.alias || {}),
        fonts:     path.resolve(__dirname, '../src/fonts'),
        src:       path.resolve(__dirname, '../src'),
        components: path.resolve(__dirname, '../src/components'),
      };
    }
    return storybookConfig;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { builder: { useSWC: true } },
  },
  swc: () => ({
    jsc: { transform: { react: { runtime: 'automatic' } } },
  }),
  docs: { autodocs: 'tag' },
};

export default config;
