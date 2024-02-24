const path = require("path");

const { override, resolve } = require("customize-cra");

module.exports = override(
  // Add resolve fallback configuration
  resolve({
    fallback: {
      crypto: false,
    },
  })
);
