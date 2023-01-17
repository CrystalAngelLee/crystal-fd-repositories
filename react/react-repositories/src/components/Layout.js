import React from "react";
import { Layout, Menu } from "antd";
import { comp } from "../statics/datas";
import Container from "./Container";

const { Header, Content, Sider } = Layout;
const prefixCls = "crBest-layout";

function CustomLayout({ children, selectKey, onSelect }) {
  return (
    <Layout>
      <Header className={`${prefixCls}-header`}>
        <Container renderer={<div className="title" />}>
          HELLO I AM Cystal Angel <span className="name">精灵小不点</span>
        </Container>
      </Header>
      <Content>
        <Container renderer={<Layout className={`${prefixCls}-container`} />}>
          <Sider className={`${prefixCls}-container-sider`} width={200}>
            <Menu mode="inline" defaultSelectedKeys={[selectKey]}>
              {comp &&
                comp.map(c => (
                  <Menu.Item key={c.key} onClick={() => onSelect(c.key, c)}>
                    {c.name}
                  </Menu.Item>
                ))}
            </Menu>
          </Sider>
          <Content className={`${prefixCls}-container-contant`}>
            <div>{children}</div>
          </Content>
        </Container>
      </Content>
    </Layout>
  );
}

export default CustomLayout;
