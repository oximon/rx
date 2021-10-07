import styles from './bestOffers.module.scss';

import React, { FC, useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore, MainStore } from '../../../mobx';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import clsx from 'clsx';

import SectionTitle from '../sectionTitle';
import OfferItem from '../../offerItem';
import BidItem from '../../BidItem';

import { checkLengthArr } from '../../../../lib/helpers';
import { ADS_TYPE_ENUM } from '../../../../lib/enums/ads.enum';

import type { CategoryOfferItemProps } from './bestOffers.interface';

SwiperCore.use([Pagination, Navigation]);

const arrCategories: string[] = ['Аренда', 'Продажа', 'Перевозки', 'Заявки'];

const CategoryOfferItem: FC<CategoryOfferItemProps> = ({
  name,
  activeOffer,
  index,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        styles.bestOffers__categoryItem,
        activeOffer === index && styles.bestOffers__categoryItem_active
      )}
      onClick={onClick}>
      <h3 className={styles.bestOffers__categoryItemTitle}>{name}</h3>
    </div>
  );
};

export const BestOffers: FC = observer(() => {
  const { isLoading } = LoaderStore;
  const { bids, ads } = MainStore;
  const { rent, sale, transportaion } = ads;

  const [activeOffer, setActiveOffer] = useState<number>(0);

  useEffect(() => {
    if (activeOffer === 1) {
      !checkLengthArr(sale) &&
        MainStore.getAds({ types: ADS_TYPE_ENUM.ADS_TYPE_SALE, limit: 8 });
    } else if (activeOffer === 2) {
      !checkLengthArr(transportaion) &&
        MainStore.getAds({
          types: ADS_TYPE_ENUM.ADS_TYPE_TRANSPORTAION,
          limit: 8,
        });
    } else if (activeOffer === 3) {
      !checkLengthArr(bids) && MainStore.getBids();
    }
  }, [activeOffer]);

  const offers = useMemo(() => {
    if (activeOffer === 0) return rent;
    else if (activeOffer === 1) return sale;
    else if (activeOffer === 2) return transportaion;
    else if (activeOffer === 3) return bids;
  }, [activeOffer, isLoading]);

  const isBids = useMemo(() => activeOffer === 3, [activeOffer]);

  return (
    <section className={clsx(styles.bestOffers, 'wrapper padding-9rem')}>
      <SectionTitle
        title='Лучшие предложение'
        tooltipText='Представлены объявления с наибольшим количеством просмотров'
        className='sectionTitleMainpageBestOffers'
      />
      <div className={styles.bestOffers__categoryContainer}>
        {arrCategories.map((name, index) => (
          <CategoryOfferItem
            name={name}
            activeOffer={activeOffer}
            index={index}
            key={(name + index).toString()}
            onClick={() => setActiveOffer(index)}
          />
        ))}
      </div>

      <div className={styles.bestOffers__categoryLine}></div>

      {checkLengthArr(offers) ? (
        <div className={styles.popularShops__containerBlock}>
          <div
            className={clsx(
              styles.swiperButtonPrev,
              'swiper-button-prev',
              'bestOffers_nav_prev'
            )}></div>
          <div
            className={clsx(
              styles.swiperButtonNext,
              'swiper-button-next',
              'bestOffers_nav_next'
            )}></div>
          <div
            className={clsx(
              styles.swiperPagination,
              'swiper-pagination',
              'bestOffers_pagination'
            )}></div>
            {/* TODO: менять колво элементов в ряду в зависимости от выбранного типа предложений */}
            {/* TODO: при изменении типа слайдер перематывать в начало списка */}
          <Swiper
            breakpoints={{
              1440: { slidesPerView: 4, spaceBetween: 20 },
              960: { slidesPerView: 'auto' },
              768: { slidesPerView: 'auto' },
              414: { slidesPerView: 'auto' },
              320: { slidesPerView: 'auto' },
            }}
            pagination={{
              clickable: true,
              el: '.bestOffers_pagination',
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
              nextEl: '.bestOffers_nav_next',
              prevEl: '.bestOffers_nav_prev',
              disabledClass: clsx(
                styles.swiperButtonDisabled,
                'swiper-button-disabled'
              ),
            }}
            className={clsx(isLoading && styles.loading)}>
            {offers?.map(
              (
                {
                  photos,
                  price,
                  title,
                  year,
                  createdAt,
                  city,
                  desc,
                  condition,
                },
                index
              ) => (
                <SwiperSlide key={(title + index).toString()}>
                  {isBids ? (
                    <BidItem
                      title={title}
                      price={price}
                      createdAt={createdAt}
                      city={city.title}
                      desc={desc}
                      key={(title + index).toString()}
                    />
                  ) : (
                    <OfferItem
                      title={title}
                      photos={photos}
                      price={price}
                      year={year}
                      createdAt={createdAt}
                      city={city.title}
                      condition={condition.title}
                      desc={desc}
                      key={(title + index).toString()}
                    />
                  )}
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      ) : null}
    </section>
  );
});
