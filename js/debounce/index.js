/**
 * 防抖
 * fn 最终需要执行的事件监听
 * interval 事件触发之后多久开始执行
 * latest 控制执行第一次还是最后一次， false 执行最后一次
 */
function debounce(fn, interval, latest) {
  if (typeof fn !== "function") throw new Error("fn must be a function");
  if (typeof interval === "undefined") interval = 300;
  if (typeof interval === "boolean") {
    latest = interval;
    interval = 300;
  }
  if (typeof latest !== "boolean") latest = false;

  let timer = null;
  return function () {
    const self = this,
      args = arguments,
      init = latest && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      !latest && fn.apply(self, args);
    }, interval);

    // 第一次执行
    if (init) {
      fn.apply(self, args);
    }
  };
}
