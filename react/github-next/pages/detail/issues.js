import { useState, useCallback, useEffect } from 'react';
import { Avatar, Button, Select } from 'antd';
import { getLastUpdated } from '../../lib/util';
import dynamic from 'next/dynamic';
import WithRepo from '../../components/WithRepo';
import SearchUser from '../../components/SearchUser';
import api from '../../lib/api';
import Styles from '../../styles/Issues.module.css';
const MyMarkdown = dynamic(() => import('../../components/Markdown'), {
  loading: () => <p>loading...</p>,
});

const CACHE = {};
const isServer = typeof window === 'undefined';
const { Option } = Select;
const OptionDatas = [
  { key: 'all', name: 'all' },
  { key: 'open', name: 'open' },
  { key: 'closed', name: 'closed' },
];

function makeQuery(creator, state, labels) {
  let creatorStr = creator ? `creator=${creator}` : '';
  let stateStr = state ? `state=${state}` : '';
  let labelStr = '';
  if (labels && labels.length > 0) {
    labelStr = `labels=${labels.join(',')}`;
  }

  const arr = [];

  if (creatorStr) arr.push(creatorStr);
  if (stateStr) arr.push(stateStr);
  if (labelStr) arr.push(labelStr);

  return `?${arr.join('&')}`;
}

function IssuesDetail({ issue }) {
  return (
    <div className={Styles['issues-detail']}>
      <MyMarkdown content={issue.body} />
      <div className={Styles['actions']}>
        <Button href={issue.html_url} target="_blank">
          打开Issues讨论页面
        </Button>
      </div>
    </div>
  );
}

function IssuesItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = useCallback(() => {
    setShowDetail((detail) => !detail);
  }, []);
  return (
    <div>
      <div className={Styles.issue}>
        <Button
          type="primary"
          size="small"
          style={{ position: 'absolute', right: 10, top: 10 }}
          onClick={toggleShowDetail}
        >
          {showDetail ? '隐藏' : '查看'}
        </Button>
        <div className={Styles.avatar}>
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className={Styles['main-info']}>
          <h6>
            <span>{issue.title}</span>
            {issue.labels.map((label) => (
              <Label key={label.id} label={label} />
            ))}
          </h6>
          <p className={Styles['sub-info']}>
            <span>Update at {getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>
      </div>
      {showDetail ? <IssuesDetail issue={issue} /> : null}
    </div>
  );
}

function Label({ label }) {
  return (
    <>
      <span
        className={Styles.label}
        style={{ backgroundColor: `#${label.color}` }}
      >
        {label.name}
      </span>
    </>
  );
}
const Issues = ({ initIssues, labels, owner, name }) => {
  const [creator, setCreator] = useState();
  const [state, setState] = useState();
  const [label, setLabel] = useState([]);
  const [issues, setIssue] = useState(initIssues);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!isServer) {
      CACHE[`${owner}/${name}`] = labels;
    }
  }, [owner, name, labels]);

  const onHandelChange = useCallback((value) => {
    setCreator(value);
  }, []);
  const onStateChange = useCallback((value) => {
    setState(value);
  }, []);
  const onLabelChange = useCallback((value) => {
    setLabel(value);
  }, []);
  const onHandelSearch = useCallback(() => {
    setFetching(true);
    api
      .request(
        {
          url: `/repos/${owner}/${name}/issues${makeQuery(
            creator,
            state,
            label
          )}`,
        },
        ctx.req,
        ctx.res
      )
      .then((resp) => {
        setIssue(resp.data);
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
      });
  });
  return (
    <div className={Styles.root}>
      <SearchUser onChange={onHandelChange} value={creator} />
      <Select
        placeholder="状态"
        onChange={onStateChange}
        value={state}
        style={{ width: 200, marginLeft: 20 }}
      >
        {OptionDatas.map((data) => (
          <Option key={data.key} value={data.key}>
            {data.name}
          </Option>
        ))}
      </Select>
      <Select
        mode="multiple"
        placeholder="Label"
        onChange={onLabelChange}
        value={label}
        style={{ flexGrow: 1, marginLeft: 20, marginRight: 20, minWidth: 200 }}
      >
        {labels &&
          labels.map((data) => (
            <Option key={data.id} value={data.name}>
              {data.name}
            </Option>
          ))}
      </Select>
      <Button type="primary" disabled={fetching} onClick={onHandelSearch}>
        搜索
      </Button>
      {fetching ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <div className={Styles.issues}>
          {issues &&
            issues.map((issue) => <IssuesItem key={issue.id} issue={issue} />)}
        </div>
      )}
    </div>
  );
};

Issues.getInitialProps = async (ctx) => {
  const {
    query: { owner, name },
    req,
    res,
  } = ctx;
  const full_name = `${owner}/${name}`;
  const result = Promise.all([
    await api.request({ url: `/repos/${owner}/${name}/issues` }, req, res),
    CACHE[full_name]
      ? Promise.resolve({ data: CACHE[full_name] })
      : await api.request({ url: `/repos/${owner}/${name}/labels` }, req, res),
  ]);
  return {
    initIssues: (result[0] && result[0].data) || [],
    labels: (result[1] && result[1].data) || [],
    owner,
    name,
  };
};

export default WithRepo(Issues, 'issues');
