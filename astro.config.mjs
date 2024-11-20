// npm run dev -- --host for using it with code-server
import { defineConfig } from 'astro/config'

import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    define: {
      'import.meta.env.BASE_PATH': process.env.NODE_ENV === 'development' ? '4321' : 'fuckall',
    },
  },
});


