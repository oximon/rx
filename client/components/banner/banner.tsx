import styles from './banner.module.scss';

import React, { memo, FC } from 'react';

import type { BannerProps } from './banner.interface';

export const Banner: FC<BannerProps> = memo(({ images }) => {
  return (
    <picture className={styles.banner}>
      {images.map(({ media, srcset }) => (
        <source media={media} srcSet={srcset} key={srcset.toString()} />
      ))}
      <img src={images[0].srcset} alt='Изображение баннера' />
    </picture>
  );
});
