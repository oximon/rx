import styles from './modal.module.scss';

import React, { memo, ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';

import { isBrowser } from '../../../lib/helpers';

import type { ModalProps } from './modal.interface';

const modalRoot: ReactNode = isBrowser() && document.getElementById('modal');

const Modal: FC<ModalProps> = ({ children, innerRef }) => {
  return createPortal(
    <div ref={innerRef} className={styles.modal}>
      {children}
    </div>,
    modalRoot
  );
};

export default memo(Modal);
