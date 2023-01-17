import WithRepos from '../../components/WithRepo';
import dynamic from 'next/dynamic';
import api from '../../lib/api';
const MyMarkdown = dynamic(() => import('../../components/Markdown'), {
  loading: () => <p>loading...</p>,
});

const Detail = ({ readme }) => {
  return <MyMarkdown content={readme.content} isBase64 />;
};

Detail.getInitialProps = async (ctx) => {
  const {
    query: { owner, name },
    req,
    res,
  } = ctx;
  const result = await api.request(
    { url: `/repos/${owner}/${name}/readme` },
    req,
    res
  );
  return {
    readme: result.data,
  };
};

export default WithRepos(Detail, 'index');
