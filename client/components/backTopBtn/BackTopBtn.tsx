import styles from './backTopBtn.module.scss';

import React, { FC, memo } from 'react';

export const BackTopBtn: FC = memo(() => {
  const backToTopFunc = (): void => {
    if (window.scrollY > 0) {
      window.scrollBy(0, -40);
      setTimeout(backToTopFunc, 0);
    }
  };

  return (
    <div onClick={() => backToTopFunc()} className={styles.backTopBtn}>
      <img src='/images/common/arrowUp.svg' alt='стрелка вверх' />
    </div>
  );
});
