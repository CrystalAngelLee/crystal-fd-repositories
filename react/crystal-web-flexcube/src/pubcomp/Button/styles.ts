export const style = `
  color: #666;
  background-color: #EEE;
  border-color: #EEE;
  font-weight: 300;
  text-decoration: none;
  text-align: center;
  line-height: 25px;
  height: 25px;
  padding: 0 25px;
  margin: 0;
  display: inline-block;
  appearance: none;
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  transition-property: all;
  transition-duration: .3s;
  font-weight: 400;
  &:visited {
    color: #666; 
  }
  &:hover, &:focus {
    background-color: #f6f6f6;
    text-decoration: none;
    outline: none; 
  }
  &.fastener {
    border-radius: 200px;
  }
  &-box {
    border: 1px solid #e3e3e3;
    display: inline-block;
    padding: 9px;
    background: linear-gradient(#f2f2f2, #FFF);
    border-radius: 200px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04);
  }
`;
