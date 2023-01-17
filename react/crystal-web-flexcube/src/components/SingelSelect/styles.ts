export const style = `
  &-unified {
    .ant-select {
      width: 150px;
      margin-right: 10px;
    }
  }
  &-separate {
    display: flex;
    margin-top: 10px;
    color: #666;
    &-item {
      flex-grow: 1;
      &:not(:first-child) {
        margin-left: 10px;
      }
      .ant-select {
        width: 100%;
      }
      &-title {
        text-align: center;
        margin-top: 5px;
      }
    }
  }
`;
