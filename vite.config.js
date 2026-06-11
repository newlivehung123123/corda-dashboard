import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';

const hfReadme = `---
title: CORDA Democratic AI-Readiness Index
emoji: \u{1F4CA}
colorFrom: blue
colorTo: indigo
sdk: static
pinned: false
---
`;

function writeHFReadme() {
  return {
    name: 'write-hf-readme',
    closeBundle() {
      writeFileSync('dist/README.md', hfReadme);
    },
  };
}

export default defineConfig({
  plugins: [react(), writeHFReadme()],
  base: './',
  build: {
    outDir: 'dist',
  },
});
