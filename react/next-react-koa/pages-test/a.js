import { withRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
// import moment from 'moment';

// import Comp from '../components/Comp';

const Comp = dynamic(import('../components/Comp')); // 异步组件
const Title = styled.h1`
  color: yellow;
  font-size: 24px;
`;
const ATempPage = ({ router, name, time }) => {
  return (
    <>
      <Title>Title --- </Title>
      <Comp />
      <Link href="#aaa">
        <a>
          id:{router.query.id},name:{name}
        </a>
      </Link>
      <style jsx>{`
        a {
          color: red;
        }
      `}</style>
      <style jsx global>{`
        a {
          color: green;
        }
      `}</style>
    </>
  );
};
ATempPage.getInitialProps = async (ctx) => {
  const moment = await import('moment'); // 异步加载
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const time = moment.default(Date.now() - 60 * 1000).fromNow();
      resolve({
        name: 'pageA',
        time,
      });
    }, 1000);
  });
  return await promise;
};
export default withRouter(ATempPage);
