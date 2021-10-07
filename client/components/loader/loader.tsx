import Styles from './loader.module.scss';

import React, { FC, memo } from 'react';

import type { LoaderInterface } from './loader.interface';

export const Loader: FC<LoaderInterface> = memo(({ noFullscreen }) => {
  return (
    <div className={noFullscreen ? Styles.noFullscreen_holder : Styles.holder}>
      <div className={Styles.preloader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
});
