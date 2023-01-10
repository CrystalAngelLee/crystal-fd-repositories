// faker 可以用来随机生成数据
import faker from "faker";

function mount(el) {
  let products = `这是Cart页面${faker.name.findName()}`;
  el.innerHTML = products;
}

// 此处代码是 products 应用在本地开发环境下执行的
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-carts");
  // 当容器应用在本地开发环境下执行时也可以进入到以上这个判断, 容器应用在执行当前代码时肯定是获 取不到 dev-products 元素的, 所以此处还需要对 el 进行判断.
  if (el) mount(el);
}

export { mount };
