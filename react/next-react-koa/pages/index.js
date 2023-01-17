import axios from 'axios';
const api = require('../lib/api');

function IndexPage({ data }) {
  console.log('userRepos', data);
  return <span>index</span>;
}

IndexPage.getInitialProps = async ({ ctx }) => {
  // const result = await axios
  //   .get('/github/search/repositories?q=react')
  //   .then((resq) => console.log('resq', resq));
  const result = await api.request(
    { url: '/search/repositories?q=react' },
    ctx.req,
    ctx.res
  );

  return {
    data: result.data,
  };
};
export default IndexPage;
