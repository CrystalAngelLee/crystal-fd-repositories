import { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '../stores/actions/userAction';
import Link from 'next/link';
import Container from './Container';
import styles from '../styles/Layout.module.css';

const { Header, Content, Footer } = Layout;
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

const CustomLayout = function ({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query;
  const [search, setSearch] = useState(urlQuery || '');

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
        <Container renderer={<div className={styles['header-inner']} />}>
          <div className={styles['header-left']}>
            <div className={styles['logo']}>
              <Link href={'/'}>
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
          <div className={styles['header-right']}>
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <Avatar size={40} src={user.avatar_url} />
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
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomLayout));
