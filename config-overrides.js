const { override, addWebpackResolve } = require("customize-cra");

module.exports = override(
  addWebpackResolve({
    fallback: {
      crypto: false, // Use an empty module for 'crypto'
    },
  })
);
