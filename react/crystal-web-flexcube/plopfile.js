module.exports = (plop) => {
  // 第一个参数是生成器的名字，第二个是生成器的配置选项
  plop.setGenerator("component", {
    description: "create a component", // 生成器的描述
    prompts: [
      // 交互
      {
        type: "input",
        name: "name",
        message: "component name",
        default: "MyComponent", // 默认答案
      },
    ],
    actions: [
      // 命令行交互之后执行的动作
      {
        type: "add", // 代表添加文件
        path: "src/components/{{name}}/index.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add", // 代表添加文件
        path: "src/components/{{name}}/styles.ts",
        templateFile: "plop-templates/component.css.hbs",
      },
      {
        type: "add", // 代表添加文件
        path: "src/components/{{name}}/index.d.ts",
        templateFile: "plop-templates/component.d.hbs",
      },
    ],
  });
  plop.setGenerator("page", {
    description: "create a page", // 生成器的描述
    prompts: [
      // 交互
      {
        type: "input",
        name: "name",
        message: "page name",
        default: "page", // 默认答案
      },
    ],
    actions: [
      // 命令行交互之后执行的动作
      {
        type: "add", // 代表添加文件
        path: "src/pages/{{name}}/index.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add", // 代表添加文件
        path: "src/pages/{{name}}/styles.ts",
        templateFile: "plop-templates/component.css.hbs",
      },
      {
        type: "add", // 代表添加文件
        path: "src/pages/{{name}}/index.d.ts",
        templateFile: "plop-templates/component.d.hbs",
      },
    ],
  });
};
