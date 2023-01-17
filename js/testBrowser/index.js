/* 检测浏览器的类型和版本 */
export const testBrowser = {
  getExplore: function () {
    var Sys = {}
    var ua = navigator.userAgent.toLowerCase()
    var s
    ;(s = ua.match(/rv:([\d.]+)\) like gecko/))
      ? (Sys.ie = s[1])
      : (s = ua.match(/msie ([\d\.]+)/))
      ? (Sys.ie = s[1])
      : (s = ua.match(/edge\/([\d\.]+)/))
      ? (Sys.edge = s[1])
      : (s = ua.match(/firefox\/([\d\.]+)/))
      ? (Sys.firefox = s[1])
      : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
      ? (Sys.opera = s[1])
      : (s = ua.match(/chrome\/([\d\.]+)/))
      ? (Sys.chrome = s[1])
      : (s = ua.match(/version\/([\d\.]+).*safari/))
      ? (Sys.safari = s[1])
      : 0
    // 根据关系进行判断
    if (Sys.ie) return 'IE: ' + Sys.ie
    if (Sys.edge) return 'EDGE: ' + Sys.edge
    if (Sys.firefox) return 'Firefox: ' + Sys.firefox
    if (Sys.chrome) return 'Chrome: ' + Sys.chrome
    if (Sys.opera) return 'Opera: ' + Sys.opera
    if (Sys.safari) return 'Safari: ' + Sys.safari
    return 'Unkonwn'
  },
  getExploreName: function () {
    var userAgent = navigator.userAgent
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      return 'Opera'
    } else if (
      userAgent.indexOf('compatible') > -1 &&
      userAgent.indexOf('MSIE') > -1
    ) {
      return 'IE'
    } else if (userAgent.indexOf('Edge') > -1) {
      return 'Edge'
    } else if (userAgent.indexOf('Firefox') > -1) {
      return 'Firefox'
    } else if (
      userAgent.indexOf('Safari') > -1 &&
      userAgent.indexOf('Chrome') == -1
    ) {
      return 'Safari'
    } else if (
      userAgent.indexOf('Chrome') > -1 &&
      userAgent.indexOf('Safari') > -1
    ) {
      return 'Chrome'
    } else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return 'IE>=11'
    } else {
      return 'Unkonwn'
    }
  },
}
