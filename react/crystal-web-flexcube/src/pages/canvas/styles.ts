import {
  space,
} from "../../styles/common.style";

const panelStyle = `
  &-panel {
    margin-left: 10px;
    background-color: #fff;
    &-floor {
      width: 450px;
      height: 600px;
      overflow-y: auto;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px 5px 10px;
      }
      .main {
        &-header {
          text-align: center;
          padding: 10px 0;
          &-btn {
            width: 80%;
          }
        }
      }
    }
  }
`;

/* 主画布样式 */
const canvasStyle = `
  &-canvas {
    width: 300px;
    height: 200px;
    box-shadow: 0 0 0 2px #2d64ff;
  }
  // 
  // main {
  //   display: flex;
  //   padding: ${space} 0;
  // }
  // &-submain {
  //   flex-grow: 1;
  // }
`;

// ${subCanvasStyle}
// ${proppanelStyle}

export const style = `
  display: flex;
  justify-content: center;
  margin-top: 40px;

  ${canvasStyle}
  ${panelStyle}
`;
