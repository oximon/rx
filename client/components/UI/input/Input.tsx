import styles from './Input.module.scss';

import React, { FC, memo } from 'react';
import clsx from 'clsx';
import { InputComponentProps } from './input.interface';

const InputDefault: FC<InputComponentProps> = memo(({ innerRef, ...props }) => (
  <input ref={innerRef} {...props} />
));

const InputV1: FC<InputComponentProps> = memo(
  ({ iconLeft, innerRef, ...props }) => (
    <div className={styles.input__container}>
      <div className={styles.input__containerIconLeft}>{iconLeft}</div>
      <input ref={innerRef} {...props} />
    </div>
  )
);

export const InputComponent: FC<InputComponentProps> = memo(
  ({
    version,
    placeholder = '',
    type,
    className,
    onChange,
    value,
    defaultValue,
    ...otherProps
  }) => {
    const inputProps: InputComponentProps = {
      className: clsx(styles.input, className),
      placeholder,
      type,
      onChange,
      value,
      defaultValue,
      ...otherProps,
    };

    const _renderInput = () => {
      switch (version) {
        case 'v1':
          return <InputV1 {...inputProps} />;
        default:
          return <InputDefault {...inputProps} />;
      }
    };

    return _renderInput();
  }
);
