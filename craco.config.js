const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Disable CSS minimization to fix the minimizer error
      if (env === 'production') {
        // Remove CSS minimizer from optimization
        if (webpackConfig.optimization && webpackConfig.optimization.minimizer) {
          webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
            minimizer => {
              const constructorName = minimizer.constructor.name;
              return constructorName !== 'CssMinimizerPlugin' && constructorName !== 'OptimizeCssAssetsWebpackPlugin';
            }
          );
        }
      }
      
      return webpackConfig;
    },
  },
};