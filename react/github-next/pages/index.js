import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useRouter } from 'next/router';
import { Button, Tabs } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { logout } from '../stores/actions/userAction';
import { cacheArray } from '../lib/basicRepoCache';
import LRU from 'lru-cache';
import styles from '../styles/Home.module.css';
import UserRepos from '../components/UserRepos';

const api = require('../lib/api');
const cache = new LRU({
  maxAge: 1000 * 60 * 10, // 最长缓存时间
});

const isServer = typeof window === 'undefined';

function Home({ userRepos, starRepos, user, router }) {
  const _useRouter = useRouter();
  const tabKey = router.query.key || '1';
  const handelTabChange = (activeKey) => {
    _useRouter.push(`/?key=${activeKey}`);
  };

  useEffect(() => {
    if (!isServer) {
      if (userRepos) {
        cache.set('userRepos', userRepos);
      }
      if (starRepos) {
        cache.set('starRepos', starRepos);
      }
    }
  }, [userRepos, starRepos]);

  useEffect(() => {
    if (!isServer) {
      cacheArray(userRepos);
      cacheArray(starRepos);
    }
  });

  if (!user || !user.id) {
    return (
      <div className={styles.root}>
        <p>您还没有登录哦～</p>
        <Button type="primary" href={`/prepare-auth?url=${router.asPath}`}>
          login
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles['user-info']}>
        <img
          src={user.avatar_url}
          alt="user avatar"
          className={styles.avatar}
        />
        <span className={styles['login']}>{user.login}</span>
        <span className={styles['name']}>{user.name}</span>
        <span className={styles['bio']}>{user.bio}</span>
        {user.email && (
          <p className={styles['email']}>
            <MailOutlined />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        )}
      </div>
      <div className={styles['user-repos']}>
        <Tabs
          defaultActiveKey={tabKey}
          onChange={handelTabChange}
          animated={false}
        >
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map((repo) => (
              <UserRepos key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {starRepos.map((repo) => (
              <UserRepos key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

export async function getServerSideProps(ctx) {
  const session = ctx.req.session;
  let reposRest = {},
    starRest = {};
  if (!isServer) {
    // client render check~~~
    if (cache.get('userRepos') && cache.get('starRepos')) {
      return {
        props: {
          userRepos: cache.get('userRepos') || [],
          starRepos: cache.get('starRepos') || [],
        },
      };
    }
  }
  if (session && session.userInfo && session.userInfo.id) {
    reposRest = await api.request({ url: '/user/repos' }, ctx.req, ctx.res);
    starRest = await api.request({ url: '/user/starred' }, ctx.req, ctx.res);
  }

  return {
    props: {
      userRepos: reposRest.data || [],
      starRepos: starRest.data || [],
    },
  };
}
