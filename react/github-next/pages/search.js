import { memo, isValidElement, useEffect } from 'react';
import { withRouter } from 'next/router';
import { Row, Col, List, Pagination } from 'antd';
import Link from 'next/link';
import Styles from '../styles/Search.module.css';
import UserRepos from '../components/UserRepos';
import { cacheArray } from '../lib/basicRepoCache';
const api = require('../lib/api');

const isServer = typeof window === 'undefined';
const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust'];
const SORT_TYPES = [
  { name: 'Best Match' },
  { name: 'Most Starts', value: 'starts', order: 'desc' },
  { name: 'Fewest Starts', value: 'starts', order: 'asc' },
  { name: 'Most Forks', value: 'forks', order: 'desc' },
  { name: 'Fewest Forks', value: 'forks', order: 'asc' },
];
const selectedItemStyle = {
  borderLeft: '2px solid #e36209',
  fontWeight: 100,
};
const noop = function () {};
const per_page = 20;

const FilterLink = memo(({ name, query, lang, sort, order, page }) => {
  let queryStr = `?query=${query}`;
  if (lang) queryStr += `&lang=${lang}`;
  if (sort) queryStr += `&sort=${sort}&order=${order || 'desc'}`;
  if (page) queryStr += `&page=${page}`;

  queryStr += `&per_page${per_page}`;
  return (
    <Link href={`/search${queryStr}`}>
      {isValidElement(name) ? name : <a>{name}</a>}
    </Link>
  );
});
/**
 * sort: 排序方式
 * lang: 仓库的项目开发主语言
 * order: 排序顺序
 * page: 分页页面
 */
function Search({ router, repos }) {
  const { ...querys } = router.query;
  const { lang, sort, order, page } = router.query;

  useEffect(() => {
    if (!isServer) {
      cacheArray(repos.items);
    }
  });
  return (
    <div className={Styles.root}>
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className={Styles['list-header']}>语言</span>}
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGES}
            renderItem={(item) => {
              let selected = lang === item;
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  {selected ? (
                    <span>{item}</span>
                  ) : (
                    <FilterLink {...querys} name={item} lang={item} />
                  )}
                </List.Item>
              );
            }}
          />
          <List
            bordered
            header={<span className="list-header">排序</span>}
            dataSource={SORT_TYPES}
            renderItem={(item) => {
              let selected = false;
              if (item.name === 'Best Match' && !sort) {
                selected = true;
              } else if (item.value === sort && item.order === order) {
                selected = true;
              }
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  {selected ? (
                    <span>{item.name}</span>
                  ) : (
                    <FilterLink
                      {...querys}
                      name={item.name}
                      sort={item.value}
                      order={item.order}
                    />
                  )}
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={18}>
          <h3 className={Styles['repos-title']}>
            {repos.total_count || 0} 个仓库
          </h3>
          {repos &&
            repos.items.map((repo) => <UserRepos key={repo.id} repo={repo} />)}
          <div className={Styles.pagination}>
            <Pagination
              total={1000}
              pageSize={per_page}
              current={Number(page) || 1}
              onChange={noop}
              itemRender={(page, type, ol) => {
                const p =
                  type === 'page'
                    ? page
                    : type === 'prev'
                    ? page - 1
                    : page + 1;
                const name = type === 'page' ? page : ol;
                return <FilterLink {...querys} page={p} name={name} />;
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
Search.getInitialProps = async (ctx) => {
  const { query, sort, lang, order, page } = ctx.query;

  if (!query) {
    return {
      repos: {
        total_count: 0,
      },
    };
  }
  let queryStr = `?q=${query}`;
  if (lang) queryStr += `+language:${lang}`;
  if (sort) queryStr += `&sort=${sort}&order=${order || 'desc'}`;
  if (page) queryStr += `&page=${page}`;
  queryStr += `&per_page=${per_page}`;

  const result = await api.request(
    { url: `/search/repositories${queryStr}` },
    ctx.req,
    ctx.res
  );

  return {
    repos: result.data,
  };
};
export default withRouter(Search);
