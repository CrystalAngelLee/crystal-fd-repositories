const itemStyle = `
  &-header {
    padding: 20px 10px 0 10px;
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 280px);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    padding: 20px 10px;
  }
  &-item {
    width: 100%;
    height: 300px;
    padding: 10px 15px;
    background-image: linear-gradient(to bottom, #ddd, #fff);
    cursor: pointer;
    overflow: hidden;
    .image {
      height: 200px;
      display: flex;
      align-items: center;
      
      img {
        width: 100%;
      }
    }
    &:hover {
      box-shadow: #ddd 2px 2px 4px;
      .title {
        font-size: 1.2rem;
      }
    }
  }
`;

export const style = `
  ${itemStyle}
`;
