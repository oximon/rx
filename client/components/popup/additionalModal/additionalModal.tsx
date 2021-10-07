import styles from './additionalModal.module.scss';

import React, { memo, useRef, FC, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBan,
  faCheckCircle,
  faTimesCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import Modal from '../../modal/Modal';
import { ButtonComponent } from '../../UI/button';

import { useOnClickOutside } from '../../../hooks';
import { MODAL_SIGNUP_SUCCESS } from '../../../../lib/constants/modal.constants';

import type { additionalModalModalInterface } from './additionalModal.interface';

export const AdditionalModalModalInterface: FC<additionalModalModalInterface> =
  memo(({ onToggleModalView, innerRef, type, title, subtitle }) => {
    const signupModalRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(signupModalRef, () =>
      onToggleModalView(MODAL_SIGNUP_SUCCESS)
    );

    const modalIcon: IconDefinition = useMemo(() => {
      switch (type) {
        case 'success':
          return faCheckCircle;
        case 'error':
          return faBan;
        case 'remove':
          return faTimesCircle;
        default:
          break;
      }
    }, [type]);

    const types: { error: string; success: string; remove: string } = {
      error: styles.additionalModal_error,
      success: styles.additionalModal_success,
      remove: styles.additionalModal_remove,
    };

    return (
      <Modal innerRef={innerRef}>
        <div className={styles.signup}>
          <h2 className={styles.signup__title}>
            Регистрация на&nbsp;
            <span>
              rx<span>machine</span>
            </span>
          </h2>

          <div className={styles.signup__success}>
            <FontAwesomeIcon
              className={styles.signup__successIcon}
              icon={modalIcon}
            />
            <h3 className={styles.signup__successTitle}>{title}</h3>
            <p className={styles.signup__successSubtitle}>{subtitle}</p>
          </div>

          <ButtonComponent
            onClick={() => onToggleModalView(MODAL_SIGNUP_SUCCESS)}
            close
          />
        </div>
      </Modal>
    );
  });
