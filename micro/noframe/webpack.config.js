const singleSpaDefaults = require("webpack-config-single-spa")
const { merge } = require("webpack-merge")

module.exports = () => {
    const defaultConfig = singleSpaDefaults({
        orgName: "mic-demo", // 组织名称
        projectName: "noframe" // 微应用的名字
    })

    const currentConfig = {
        devServer: {
            port: 9001
        }
    }
    
    return merge(defaultConfig, currentConfig)
}