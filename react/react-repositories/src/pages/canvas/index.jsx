import React, { useEffect, useState } from "react";
import EasyDrawing from "easy-drawing";
import { Excel } from "../../components";
import A from "../../static/img/A.png";
import B from "../../static/img/B.png";
import C from "../../static/img/C.png";
import D from "../../static/img/D.png";
import E from "../../static/img/E.png";

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
  A: {
    src: A,
    point: [-77.043837, 38.895011],
  },
  B: {
    src: B,
    point: [-77.04437, 38.894796],
  },
};

const scatters = Object.keys(SCATTERS).map((s) => {
  const { src, ...rest } = SCATTERS[s];
  return {
    size: 20,
    img: { src },
    ...rest,
  };
});

const Canvas = () => {
  const [paths, setPaths] = useState([]);

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
        <EasyDrawing areas={[areas]} scatters={scatters} paths={paths} />
      </div>
    </div>
  );
};

export default Canvas;
