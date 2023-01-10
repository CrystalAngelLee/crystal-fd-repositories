const headerStyle = `
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    box-shadow: #ddd 4px 4px 6px;
    &-icon {
      font-size: 30px;
      cursor: pointer;
    }
    &-menu {
      .menu-item {
        margin-left: 10px;
      }
    }
  }
`;

export const style = `
  ${headerStyle}
`;
