import styles from './descriptionMain.module.scss';

import React, { memo } from 'react';

import clsx from 'clsx';

export const DescriptionMain = memo(() => (
  <div className={styles.description__blockGradient}>
    <section
      className={clsx(styles.description__block, 'wrapper padding-9rem')}>
      <h1 className={styles.description__blockTitle}>
        Доступная площадка для спецоборудования
      </h1>
      <p className={styles.description__blockSubtitle}>
        Интернет-площадка по аренде, продаже и перевозкам спецоборудования
      </p>
      <img
        src='/images/main/descriptionMain/descriptionMainCar.png'
        alt='Камаз, бульдозер, трактор'
        className={styles.description__blockImg}
      />
    </section>
  </div>
));
