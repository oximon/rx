import Styles from './inputErrorComponent.module.scss';

import React, { memo } from 'react';

import type { inputErrorComponentType } from './inputErrorComponent.interface';

export const InputErrorComponent: React.FC<inputErrorComponentType> = memo(
  ({ message }) => {
    return <p className={Styles.text}>{message}</p>;
  }
);
