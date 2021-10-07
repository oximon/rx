import styles from './popularShops.module.scss';

import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore, MainStore } from '../../../mobx';

import SectionTitle from '../sectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import clsx from 'clsx';

import type { ShopItemInterface } from './popularShops.interface';

SwiperCore.use([Pagination, Navigation]);

const ShopItem: FC<ShopItemInterface> = ({
  logoUrl,
  title,
  desc,
  adsPhoto,
}) => {
  return (
    <div className={styles.popularShops__item}>
      <div className={styles.popularShops__itemDescription}>
        <div className={styles.popularShops__itemDescriptionImgContainer}>
          <img
            src={logoUrl}
            alt={`Логотип компании - ${title}`}
            className={styles.popularShops__itemDescriptionImg}
          />
        </div>

        <div className={styles.popularShops__itemDescriptionContainer}>
          <h2 className={styles.popularShops__itemDescriptionTitle}>{title}</h2>
          <p className={styles.popularShops__itemDescriptionSignature}>
            {desc}
          </p>
        </div>
      </div>
      <div className={styles.popularShops__itemImgContainer}>
        {adsPhoto?.map((img, index) => (
          <img
            key={(img + index).toString()}
            src={img}
            alt='Изображение специальной техники'
            className={styles.popularShops__itemImg}
          />
        ))}
      </div>
    </div>
  );
};

export const PopularShops: FC = observer(() => {
  const { isLoading } = LoaderStore;
  const { popularShops } = MainStore;

  return (
    <section className={clsx(styles.popularShops, 'wrapper padding-9rem')}>
      <SectionTitle
        title='Популярные магазины'
        tooltipText='Представлены магазины с наибольшим количеством объявлений и просмотров'
        className='sectionTitleMainpagePopularShops'
      />
      <div className={styles.popularShops__containerBlock}>
        <div
          className={clsx(
            styles.swiperButtonPrev,
            'swiper-button-prev',
            'popularShops_nav_prev'
          )}></div>
        <div
          className={clsx(
            styles.swiperButtonNext,
            'swiper-button-next',
            'popularShops_nav_next'
          )}></div>
        <div
          className={clsx(
            styles.swiperPagination,
            'swiper-pagination',
            'popularShops_pagination'
          )}></div>
        <Swiper
          breakpoints={{
            1440: { slidesPerView: 3, spaceBetween: 20 },
            960: { slidesPerView: 'auto' },
            768: { slidesPerView: 'auto' },
            414: { slidesPerView: 'auto' },
            320: { slidesPerView: 'auto' },
          }}
          pagination={{
            clickable: true,
            el: '.popularShops_pagination',
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
            nextEl: '.popularShops_nav_next',
            prevEl: '.popularShops_nav_prev',
            disabledClass: clsx(
              styles.swiperButtonDisabled,
              'swiper-button-disabled'
            ),
          }}
          className={clsx(isLoading && styles.loading)}>
          {popularShops?.map((shop, index) => (
            <SwiperSlide key={(shop.title + index).toString()}>
              <ShopItem {...shop} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});
