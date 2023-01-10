import { useEffect } from 'react';
import axios from 'axios';

import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { connect } from 'react-redux';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

import { add } from '../store/store';

const IndexPage = ({ counter, username, rename, add }) => {
  useEffect(() => {
    axios.get('/api/user/info').then((resp) => {
      console.log('resp', resp);
    });
  }, []);

  const gotoB = () => {
    Router.push(
      {
        pathname: '/b',
        query: {
          id: 2,
        },
      },
      '/b/2'
    );
  };

  return (
    <>
      <Link href="/a?id=1" as="/a/1">
        <Button>counter: {counter}</Button>
      </Link>
      <Button onClick={gotoB}>toB</Button>
      112221
      <input value={username} onChange={(e) => rename(e.target.value)}></input>
      <button onClick={() => add(counter)}>do add</button>
      <a href={publicRuntimeConfig.OAUTH_URL || ''}>login</a>
    </>
  );
};

IndexPage.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3));
  return {};
};
export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter.count,
      username: state.user.username,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: (num) => dispatch({ type: 'ADD', num }),
      rename: (name) => dispatch({ type: 'UPDATE_USERNAME', name }),
    };
  }
)(IndexPage);

// Link本身不作为任何节点，children 一定是单个节点
// as : 路由映射
