import Link from 'next/link';
import { StarFilled } from '@ant-design/icons';
import styles from '../styles/UserRepos.module.css';
import { getLastUpdated } from '../lib/util';

function getLicense(license) {
  return license ? `${license.spdx_id}` : null;
}
const UserRepos = ({ repo }) => {
  return (
    <div className={styles.root}>
      <div className={styles['basic-info']}>
        <h3 className={styles['repo-title']}>
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.full_name}</a>
          </Link>
        </h3>
        <p className={styles['repo-desc']}>{repo.description}</p>
        <p className={styles['other-info']}>
          {repo.license ? (
            <span className={styles['license']}>
              {getLicense(repo.license)}
            </span>
          ) : null}
          <span className={styles['last-updated']}>
            {getLastUpdated(repo.updated_at)}
          </span>
          <span className={styles['open-issues']}>
            {repo.open_issues_count} open issues
          </span>
        </p>
      </div>
      <div className={styles['lang-star']}>
        <span className={styles['lang']}>{repo.language}</span>
        <span className={styles['stars']}>
          {repo.stargazers_count} <StarFilled />
        </span>
      </div>
    </div>
  );
};

export default UserRepos;
