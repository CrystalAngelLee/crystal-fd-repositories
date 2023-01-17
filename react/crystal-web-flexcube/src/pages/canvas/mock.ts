export const res_data = {
  code: 1,
  data: {
    status: 1,
    datas: {
      name: "模板名称",
      layout: "布局方式",
      image: "预览图",
      configData: {
        // 楼层配置
        floorConfig: {
          width: 1125,
          bgDesc: {
            bgType: 0, // 0： 背景颜色
            bgColor: "#fff", // 背景色
          },
        },
        // 画布配置
        canvasConfig: {
          lrPadding: 12, // 左右边距
          tbPadding: 9, // 上下边距
          // 内边距
          pdDesc: {
            value: 0,
            standalone: false,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          // 背景色
          bgDesc: {
            bgType: 0, // 0： 背景颜色
            bgColor: "#fff", // 背景色
          },
          // 圆角配置
          rdDesc: {
            value: 0,
            standalone: false,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
        },
      },
    },
  },
};