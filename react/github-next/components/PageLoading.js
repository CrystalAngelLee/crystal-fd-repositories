import { Spin } from 'antd';
import styles from '../styles/PageLoading.module.css';

const LoadingPage = () => (
  <div className={styles.root}>
    <Spin />
  </div>
);

export default LoadingPage;
