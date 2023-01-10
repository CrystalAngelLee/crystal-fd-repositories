import { FormDataProps } from "../../components/Form";

/**
 * configure
 */
// 左右边距
export const getLRConfig = () => {
  return {
    id: "lrpadding",
    name: "左右边距",
    type: "inputslider",
  };
};
export const getUDConfig = () => {
  return {
    id: "udpadding",
    name: "上下边距",
    type: "inputslider",
  };
};
export const getBgConfig = () => {
  const $bgconfig = [];
  // TODO： 支持背景图片
  false &&
    $bgconfig.push({
      id: "bgconf",
      name: "内边框背景",
      type: "radio",
      params: {
        options: [
          {
            label: "背景颜色",
            value: "color",
          },
          {
            label: "背景图片",
            value: "image",
          },
        ],
      },
    });
  $bgconfig.push({
    id: "bgColor",
    name: "背景色",
    type: "colorpicker",
  });
  $bgconfig.push({
    id: "view_bgColor",
    name: "内边框背景色",
    type: "colorpicker",
  });
  return $bgconfig;
};

export const getPDConfig = () => {
  return {
    id: "view_padding",
    name: "内边距",
    type: "singelselect",
    options: [
      {
        value: "0",
      },
      {
        value: "5",
      },
      {
        value: "10",
      },
      {
        value: "15",
      },
    ],
  };
};

/**
 * form conf
 */
export const getFormConfig = () => ({
  fileds: [
    {
      id: "canvas",
      name: "画布配置",
      type: "collapse",
      fileds: [
        {
          id: "padding",
          name: "边距配置",
          type: "collapse",
          fileds: [getLRConfig(), getUDConfig(), getPDConfig()],
        },
        ...getBgConfig(),
      ],
    },
    {
      id: "floor",
      name: "楼层配置",
      type: "collapse",
      fileds: [
        {
          id: "floor_bgColor",
          name: "背景颜色",
          type: "colorpicker",
        },
      ],
    },
  ],
  datas: {
    lrpadding: 15,
    udpadding: 10,
    bgconf: "color",
    bgColor: `rgba(0, 0, 0, 0)`,
    view_padding: "0",
    view_bgColor: `rgba(0, 0, 0, 0)`,
    floor_bgColor: '#ddd'
  },
});

/**
 * canvas Config
 */
export const getCanvasConfig = (data: FormDataProps) => {
  return {
    canvasStyle: {
      padding: `${data.udpadding}px ${data.lrpadding}px`,
      backgroundColor: data.bgColor,
    },
    viewStyle: {
      backgroundColor: data.view_bgColor,
      padding: `${data.view_padding}px`,
    },
  };
};
