import Common, { AnyObj } from "../../types/common";

export interface StyledProps {}

/**
 * components types
 */
type ConfProps = {
  canvasStyle?: {
    w?: number;
    bgColor?: string;
    padding: string;
  };
  viewStyle?: AnyObj;
};
export interface CanvasProps extends Common {
  conf: ConfProps;
}
export interface SubCanvasProps extends Common {
  greedy?: boolean;
}

/**
 * utils types
 */
export type StylePropsType = {
  w: number;
  bgColor: string;
  padding: string;
};
