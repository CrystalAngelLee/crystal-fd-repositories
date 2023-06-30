import microApp from '../'

export function getAssetsPlugins(appName) {
  const globalPlugins = microApp.plugins?.global || []
  const modulePlugins = microApp.plugins?.modules?.[appName] || []

  return [...globalPlugins, ...modulePlugins]
}
