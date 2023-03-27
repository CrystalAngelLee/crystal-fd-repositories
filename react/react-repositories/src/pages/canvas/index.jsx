import React, { useEffect, useState } from "react";
import EasyDrawing from "easy-drawing";
import { Excel } from "../../components";
import { COLOR } from "../../utils";
import A from "../../static/img/A.png";
import B from "../../static/img/B.png";
import C from "../../static/img/C.png";
import D from "../../static/img/D.png";
import E from "../../static/img/E.png";
import F from "../../static/img/F.png";
import G from "../../static/img/G.png";
import H from "../../static/img/H.png";
import I from "../../static/img/16gl-I.png";
import J from "../../static/img/16gl-J.png";
import K from "../../static/img/16gl-K.png";
import L from "../../static/img/16gl-L.png";
import M from "../../static/img/16gl-M.png";
import N from "../../static/img/16gl-N.png";

const areas = {
  polygon: [
    [-77.044688, 38.895265],
    [-77.043683, 38.895265],
    [-77.043683, 38.894595],
    [-77.044682, 38.894595],
  ],
  fillStyle: "#fcf7f2",
  strokeStyle: "gray",
};

const SCATTERS = {
  //   A: {
  //     desc: "	进入运营区域",
  //     src: A,
  //     point: [-77.043837, 38.895011],
  //   },
  B: {
    desc: "模板选择区域",
    src: B,
    point: [-77.0446, 38.894906],
    textpoint: [-77.0446, 38.894859],
  },
  C: {
    desc: "可视化预览区域",
    src: C,
    point: [-77.0443, 38.895],
    textpoint: [-77.0443, 38.895],
  },
  D: {
    desc: "配置面板（样式）",
    src: D,
    point: [-77.044212997, 38.895],
  },
  E: {
    desc: "导航区域",
    src: E,
    point: [-77.043699, 38.895],
  },
  F: {
    desc: "全局操作",
    src: F,
    point: [-77.044212997, 38.895229],
  },
  G: {
    desc: "千人千面",
    src: G,
    point: [-77.043749, 38.895],
  },
  H: {
    desc: "模板库",
    src: H,
    point: [-77.044579, 38.895229],
  },
  //   I: {
  //     desc: "iFrame",
  //     src: I,
  //     point: [-77.044579, 38.895229],
  //   },
  //   J: {
  //     desc: "空闲",
  //     src: J,
  //     point: [-77.044579, 38.895229],
  //   },
  //   K: {
  //     desc: "跳出(刷新，页面失去焦点，最小化窗口，切换其他浏览器tab，电脑睡眠，关闭网页，页面跳转)",
  //     src: K,
  //     point: [-77.044579, 38.895229],
  //   },
  L: {
    desc: "发布、预览",
    src: L,
    point: [-77.043837, 38.895229],
  },
  M: {
    desc: "配置面板（素材）",
    src: M,
    point: [-77.044152997, 38.895],
  },
  //   N: {
  //     desc: "弹窗",
  //     src: N,
  //     point: [-77.044152997, 38.895],
  //   },
};

const scatters = Object.keys(SCATTERS).map((s) => {
  const { src, point } = SCATTERS[s];
  return {
    size: 20,
    img: { src },
    point,
  };
});

const texts = Object.keys(SCATTERS).map((s) => {
  const { desc, textpoint, point } = SCATTERS[s];
  return {
    text: desc,
    color: "#000",
    point: textpoint || point,
  };
});

const demoPath = [
  "A_C_K_K_D_K_D_F_D_K_K_D_K_K_D_D_K_F_F_D_C_D_K_D_K_K_K_K",
  "C_A_D_K_M_C_D_K_M_C_D_K_M_C_D_K_M_C_D_K_M_C_D_K_M_C_D_K_M_D_K_M_C_D_K_M_D_C_D_K_M_D_M_K_D_L_K",
  "A_K_C_K_K_C_D_K_M_K_M_K_C_K_C_B_K_D_D_K_D_K_C_D_D_K_K_K_D_C_D_D_D_C_F_C_D_C_D_K_M_K_M_C_K_M_K_M_D_C_D_C_D_C_D_D_K_C_D_K_D_D_K_D_D_F_C_D_C_D_F_D_F_D_L_L_K_C_D_L_K_L_K_K_K",
].map((n) => {
  const points = n
    .split("_")
    .map((w) => SCATTERS[w]?.point)
    .filter((c) => !!c);
  return {
    points,
    color: COLOR.color16(),
  };
});

const Canvas = () => {
  const [paths, setPaths] = useState(demoPath);

  const parseExcel = (file) => {
    const __paths = [];
    const path = {
      points: [],
      color: "#b8e9a4",
    };
    const path2 = {
      points: [SCATTERS["B"].point, SCATTERS["A"].point],
      color: "#dd66dd",
    };
    // 获取标题栏
    const headers = file.shift();
    // 获取v4列所在idx
    const [toIdx] = [
      headers.findIndex((h) => h === "v4"),
      headers.findIndex((h) => h === "v9"),
    ];
    // 获取 path 路径
    const columnPath = file
      .map((f) => SCATTERS[f[toIdx]]?.point)
      .filter((c) => !!c);
    path.points = columnPath;
    __paths.push(path);
    setPaths([...__paths, path2]);
  };
  return (
    <div>
      <Excel type="upload" parseExcel={parseExcel} />
      <div style={{ width: "100vh", height: "90vh", margin: "0 auto" }}>
        <EasyDrawing
          areas={[areas]}
          scatters={scatters}
          paths={paths}
          texts={texts}
        />
      </div>
    </div>
  );
};

export default Canvas;
