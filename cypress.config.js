const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) { },
    baseUrl: 'http://www.automationpractice.pl/index.php',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
