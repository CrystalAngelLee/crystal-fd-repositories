/**
 * 节流
 * 用来实现阻止在短时间内重复多次触发同一个函数。
 */
function throttle(fn, interval) {
  if (typeof fn !== "function") throw new Error("fn must be a function");
  if (typeof interval === "undefined") interval = 400;

  let previous = 0; // 上一次执行操作的时间
  let timer = null;
  return function () {
    let now = new Date(); // 本次执行的时间
    const self = this,
      arg = arguments;
    if (now - previous >= interval) {
      clearTimeout(timer);
      timer = null;
      fn.apply(self, arg);
      previous = now;
    } else if (!timer) {
      timer = setTimeout(function () {
        clearTimeout(timer);
        timer = null;
        fn.apply(self, arg);
        previous = new Date();
      }, interval);
    }
  };
}
