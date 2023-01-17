module.exports = {
  webpack: (config) => {
    config.output.library = "flexcube";
    config.output.libraryTarget = "umd";
    config.output.publicPath = "//localhost:3302/";
    return config;
  },
  devServer: (config) => {
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    return config;
  },
};
