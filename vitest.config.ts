import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: ['**/Slidev/**', '**/src/app.ts**', '**/utils/timeOut.ts**', ...coverageConfigDefaults.exclude]
    },
  },
})