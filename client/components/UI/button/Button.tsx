import styles from './Button.module.scss';

import React, { FC, memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import type { ButtonDefaultProps } from './button.interface';

const ButtonDefault: FC<ButtonDefaultProps> = ({
  type = 'button',
  disabled,
  onClick,
  title,
  color,
  iconLeft,
  close,
  className,
}) => {
  const colors: { black: string; yellow: string; gray: string } = {
    black: styles.btnBlack,
    yellow: styles.btnYellow,
    gray: styles.btnGray,
  };

  return (
    <button
      type={type}
      className={clsx(
        styles.btn,
        color && colors[color],
        iconLeft && styles.btn__iconLeft,
        close && styles.btn__close,
        className && className
      )}
      onClick={onClick}
      disabled={disabled}>
      {close ? <FontAwesomeIcon icon={faWindowClose} /> : title}
    </button>
  );
};

export const ButtonComponent: FC<ButtonDefaultProps> = memo(
  ({ version, ...otherProps }) => <ButtonDefault {...otherProps} />
);
