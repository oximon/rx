import styles from './bidItem.module.scss';

import React, { FC, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { DateTime } from 'luxon';

import type { BidItemProps } from './bidItem.interface';

export const BidItem: FC<BidItemProps> = memo(
  ({ isVip, isFavorite, favorite, price, title, desc, createdAt, city }) => {
    return (
      <div className={styles.offerItem}>
        <div className={styles.offerItem__labelContainer}>
          {isVip && (
            <span className={styles.offerItem__label}>
              VIP
              <span className={styles.offerItem__labelTriangle}></span>
            </span>
          )}
        </div>
        {isFavorite && (
          <FontAwesomeIcon
            className={clsx(
              styles.offerItem__favorite,
              favorite
                ? styles.offerItem__favorite_orange
                : styles.offerItem__favorite_gray
            )}
            icon={faStar}
          />
        )}
        <div className={styles.offerItem__descriptionContainer}>
          <h2 className={styles.offerItem__descriptionTitle}>{title}</h2>
          <p className={styles.offerItem__descriptionPrice}>
            {price} {price > 0 && <span>&#8381;</span>}
          </p>
          <p className={styles.offerItem__descriptionText}>{desc}</p>

          <div className={styles.offerItem__descriptionAdditionalInfo}>
            <p className={styles.offerItem__descriptionPublishDate}>
              {DateTime.fromISO(createdAt)
                .setLocale('ru')
                .toLocaleString(DateTime.DATETIME_MED)}
            </p>
            <p className={styles.offerItem__descriptionCity}>{city}</p>
          </div>
        </div>
      </div>
    );
  }
);
