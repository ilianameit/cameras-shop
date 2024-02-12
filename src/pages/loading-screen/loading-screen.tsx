// author https://codepen.io/supah/
import { memo } from 'react';
import styles from './style.module.css';

export function LoadingScreenComponent(): JSX.Element {
  return (
    <svg className={styles.spinner} viewBox="0 0 50 50">
      <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
}

const LoadingScreen = memo(LoadingScreenComponent);
export default LoadingScreen;
