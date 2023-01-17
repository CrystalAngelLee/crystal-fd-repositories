import { useState, useCallback } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import getConfig from 'next/config';
import Container from './Container';
import axios from 'axios';
import { logout } from '../store/store';

const { Header, Content, Footer } = Layout;
const { publicRuntimeConfig } = getConfig();

const githubIconStyle = {
  color: '#fff',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
};
const footerStyle = {
  textAlign: 'center',
};
const CustomLayout = ({ children, user, logout, router }) => {
  const urlQuery = (router.query && router.query.query) || '';
  const [search, setSearch] = useState(urlQuery);

  const handleSearchChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );
  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleGoToOAuth = useCallback((e) => {
    e.preventDefault();
    axios
      .get(`/prepare-auth?url=${router.asPath}`)
      .then((resp) => {
        if (resp.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        } else {
          console.log(`prepare auth failed: ${resp}`);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <span onClick={handleLogout}>登出</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon={<UserOutlined />} />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<div />}>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Crystal @<a>crystal</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background-color: #fff;
        }
      `}</style>
    </Layout>
  );
};

export default connect(
  function mapState(state) {
    return {
      user: state.user,
    };
  },
  function mapReducer(dispatch) {
    return {
      logout: () => dispatch(logout()),
    };
  }
)(withRouter(CustomLayout));
