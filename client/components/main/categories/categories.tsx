import styles from './categories.module.scss';

import React, { FC, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore, MainStore } from '../../../mobx';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import clsx from 'clsx';

import SectionTitle from '../sectionTitle';

import type { CategoryItemProps } from './categories.interface';

const CategoryItem: FC<CategoryItemProps> = ({
  title,
  count,
  countAdsRent,
  countAdsSale,
  countBids,
}) => {
  const createAbbreviation = (name: string): string =>
    name
      .split(' ')
      .map((item) => item[0])
      .join('')
      .toUpperCase();

  return (
    <Fragment>
      <p className={styles.categoryItem__abbr}>{createAbbreviation(title)}</p>
      <h2 className={styles.categoryItem__title}>{title}</h2>
      <p className={styles.categoryItem__count}>{count}</p>
      <div className={styles.categoryItem__hoverContainer}>
        <h2 className={styles.categoryItem__hoverTitle}>{title}</h2>
        <p className={styles.categoryItem__hoverItem}>
          <span>Продажа</span>
          {countAdsSale}
        </p>
        <p className={styles.categoryItem__hoverItem}>
          <span>Аренда</span>
          {countAdsRent}
        </p>
        <p className={styles.categoryItem__hoverItem}>
          <span>Заявки</span>
          {countBids}
        </p>
      </div>
    </Fragment>
  );
};

SwiperCore.use([Pagination, Navigation]);

export const Categories: FC = observer(() => {
  const { isLoading } = LoaderStore;
  const { catalogWithInfo } = MainStore;

  return (
    <section className={clsx(styles.categories, 'wrapper padding-9rem')}>
      <SectionTitle title='Категории' />
      <div className={styles.categories__containerBlock}>
        <div
          className={clsx(
            styles.swiperButtonPrev,
            'swiper-button-prev',
            'categories_nav_prev'
          )}></div>
        <div
          className={clsx(
            styles.swiperButtonNext,
            'swiper-button-next',
            'categories_nav_next'
          )}></div>
        <div
          className={clsx(
            styles.swiperPagination,
            'swiper-pagination',
            'categories_pagination'
          )}></div>
        <Swiper
          className={clsx(isLoading && styles.loading, styles.swiperContainer)}
          breakpoints={{
            1440: { slidesPerView: 5, slidesPerColumn: 2, spaceBetween: 40 },
            960: { slidesPerView: 4, slidesPerColumn: 2, spaceBetween: 35 },
            768: { slidesPerView: 3, slidesPerColumn: 2, spaceBetween: 40 },
            414: { slidesPerView: 3, slidesPerColumn: 2, spaceBetween: 6 },
            320: {
              slidesPerView: 'auto',
              slidesPerColumn: 2,
              spaceBetween: 5,
            },
          }}
          pagination={{
            clickable: true,
            el: '.categories_pagination',
            type: 'bullets',
            bulletElement: 'span',
            bulletClass: clsx(
              styles.swiperPaginationBullet,
              'swiper-pagination-bullet'
            ),
            bulletActiveClass: clsx(
              styles.swiperPaginationBulletActive,
              'swiper-pagination-bullet-active'
            ),
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '</span>';
            },
          }}
          navigation={{
            nextEl: '.categories_nav_next',
            prevEl: '.categories_nav_prev',
            disabledClass: clsx(
              styles.swiperButtonDisabled,
              'swiper-button-disabled'
            ),
          }}>
          {catalogWithInfo?.map(
            (
              { title, count, countAdsRent, countAdsSale, countBids },
              index
            ) => (
              <SwiperSlide
                className={styles.swiperSlide}
                key={(title + index).toString()}>
                <CategoryItem
                  title={title}
                  count={count}
                  countAdsRent={countAdsRent}
                  countAdsSale={countAdsSale}
                  countBids={countBids}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
});
