import { withRouter, useEffect } from 'next/router';
import Link from 'next/link';
import UserRepos from './UserRepos';
import { get, cache } from '../lib/basicRepoCache';
const api = require('../lib/api');
const isServer = typeof window === 'undefined';
function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='));
      return result;
    }, [])
    .join('&');
  return `?${query}`;
}
const WithRepos = (Comp, type = 'index') => {
  const WithReposComp = ({ repoBasic, router, ...rest }) => {
    const query = makeQuery(router.query);

    // useEffect(() => {
    //   // if (!isServer) {
    //   //   cache(repoBasic);
    //   // }
    // }, []);

    return (
      <div className="root">
        <div className="repo-basic">
          <UserRepos repo={repoBasic} />
          <div className="tabs">
            {type === 'index' ? (
              <span className="tab">Readme</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            )}
            {type === 'issues' ? (
              <span className="tab">Issues</span>
            ) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </div>
        <div>
          <Comp {...rest} />
        </div>
        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    );
  };

  WithReposComp.getInitialProps = async (ctx) => {
    const { owner, name } = ctx.query;
    const full_name = `${owner}/${name}`;
    let pageData = {};
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(ctx);
    }
    if (get(full_name)) {
      return {
        repoBasic: get(full_name),
        ...pageData,
      };
    }
    const result = await api.request(
      { url: `/repos/${owner}/${name}` },
      ctx.req,
      ctx.res
    );
    return {
      repoBasic: result.data,
      ...pageData,
    };
  };

  return withRouter(WithReposComp);
};

export default WithRepos;
