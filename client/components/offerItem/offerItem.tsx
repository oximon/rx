import styles from './offerItem.module.scss';

import React, { FC, memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { DateTime } from 'luxon';

import type { OfferItemProps } from './offerItem.interface';

export const OfferItem: FC<OfferItemProps> = memo(
  ({
    photos,
    price,
    title,
    year,
    createdAt,
    city,
    desc,
    condition,
    favorite,
    isFavorite,
    isVip,
  }) => {
    return (
      <div className={styles.offerItem}>
        <img
          src={photos[0]}
          alt='Изображение специальной техники'
          className={styles.offerItem__img}
        />

        <div className={styles.offerItem__labelContainer}>
          <div className={styles.offerItem__labelContainerPhoto}>
            <FontAwesomeIcon icon={faCamera} />
            <span className={styles.offerItem__labelCount}>
              {photos.length}
            </span>
          </div>

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
        <span
          className={clsx(
            styles.offerItem__state,
            condition === 'Новый'
              ? styles.offerItem__state_green
              : styles.offerItem__state_gray
          )}>
          {condition}
          <span className={styles.offerItem__stateTriangle}></span>
        </span>

        <div className={styles.offerItem__descriptionContainer}>
          <h2 className={styles.offerItem__descriptionTitle}>{title}</h2>
          <p className={styles.offerItem__descriptionDate}>
            {DateTime.fromISO(year).year}г.
          </p>
          <p className={styles.offerItem__descriptionPrice}>
            {price} <span>&#8381;</span>
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
