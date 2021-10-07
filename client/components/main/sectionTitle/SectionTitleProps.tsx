import styles from './sectionTitle.module.scss';

import React, { FC, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import type { SectionTitleProps } from './sectionTitle.interface';

export const SectionTitle: FC<SectionTitleProps> = memo(
  ({ title, tooltipText, className }) => {
    return (
      <div className={clsx(styles.sectionTitle, className)}>
        <img
          className={styles.sectionTitle__img}
          src='/images/main/sectionTitle/Subtract.svg'
          alt='Указатель'
        />
        <p className={styles.sectionTitle__title}>{title}</p>
        {tooltipText && (
          <div className={styles.sectionTitle__tooltip}>
            <span className={styles.sectionTitle__tooltipIcon}>
              <FontAwesomeIcon icon={faQuestion} />
            </span>
            <div className={styles.sectionTitle__tooltipTextContainer}>
              <span></span>
              <p className={styles.sectionTitle__tooltipText}>{tooltipText}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
