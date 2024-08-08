import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'cHooks',
  },
  resolve: {
    atomDirs: [
      {
        type: 'hooks',
        dir: 'packages/hooks/src/',
        subType: 'cui',
      },
    ],
  },
  base: '/hooks/',
});
