import React, { FC } from "react";
import styled from "@emotion/styled";
import { style } from "./styles";
import { CanvasProps, StyledProps } from "./canvas.types";
import SubCanvas from "./components/SubCanvas";

export const ItemTypes = {
  BOX: "box",
};

const Canvas: FC<CanvasProps> = ({ className: prefixCls, conf, ...props }) => {
  const { canvasStyle, viewStyle } = conf;
  /* 属性值通过 props 读取 */
  const CanvasContainer = styled.div`
    ${canvasStyle}
    width: 400px;
  `;
  const CanvasView = styled.div`
    /* 内边距 */
    padding: 15px;
    /* border-radius:  */
    border-radius: 5px;
    ${viewStyle}
  `;

  return (
    <div className={prefixCls}>
      <span className={`${prefixCls}-tip`}>画布宽度：400px</span>
      <CanvasContainer className={`${prefixCls}-container`}>
        <CanvasView className={`${prefixCls}-view`}>
          <SubCanvas />
        </CanvasView>
      </CanvasContainer>
    </div>
  );
};

export default styled(Canvas)<StyledProps>`
  ${style}
`;
