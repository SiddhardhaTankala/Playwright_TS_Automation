// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({

  testDir: './tests',
  //testPathPattern: '//Recap.spec.js', -not working as expected. testMatch or testPathPattern should work for any specific file to run
  timeout: 40*1000,
    expect: {
      timeout: 40 *1000,
    },
      reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
  },
});
module.exports = config
