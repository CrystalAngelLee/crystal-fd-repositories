import { FromStoreProps } from "../../components/Form";
import Common from "../../types/common";

enum bgType {
  bgColor,
  bgImage
}

type BgDesc = {
  bgType: bgType,
  bgColor: string
}

type PdDesc = {
  [key: string]: number | boolean
}

interface ConfigData {
  floorConfig: {width: number, bgDesc: BgDesc},
  canvasConfig: {
    lrPadding: number, // 左右边距
    tbPadding: number,  // 上下边距
    // 内边距
    pdDesc: PdDesc,
    // 背景色
    bgDesc: BgDesc,
    // 圆角配置
    rdDesc: PdDesc
  }
}

export interface DataProps {
  status: number
  datas?: {
    configData: ConfigData
    name: string,
    layout: string,
    image: string
  }
}

export interface ResProps {
  code: number
  data: DataProps
}

export type confProps = {
  title: string;
  properties: any[];
};

export interface StyledProps {}

export interface CanvasProps extends Common {}

export interface CanvasStoreProps {
  formStore: FromStoreProps;
}
