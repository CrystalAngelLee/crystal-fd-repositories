import {
  space,
  spaceSm,
  linehightX,
  commonBorder,
} from "../../styles/common.style";

export const style = `
    overflow: hidden;
    &-header {
        background-color: #eee;
        line-height: ${linehightX};
        padding: ${spaceSm} ${space};
        cursor: pointer;
        color: #666;
    }
    &-panel {
        overflow: hidden;
        max-height: 0px;

        /* 展开面板 */
        &.active {
            max-height: 500px;
            border: ${commonBorder};
            border-top: 0;
            
            transition: transform 0.3s, max-height 0.3s;
		    transform-origin: top center;
        }
    }
`;
