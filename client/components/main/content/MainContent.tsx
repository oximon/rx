import styles from './mainContent.module.scss';

import React, { FC, memo } from 'react';

import Categories from '../categories';
import BestOffers from '../bestOffers';
import PopularShops from '../popularShops';
import Brands from '../brands';
import BackTopBtn from '../../backTopBtn';
import Banner from '../../banner';
import DescriptionMain from '../description';

import {
  bannerArr1,
  bannerArr2,
} from '../../../../lib/constants/banners.constants';

export const MainContent: FC = memo(() => {
  return (
    <div className={styles.mainContent}>
      <DescriptionMain />
      <Categories />
      <Banner images={bannerArr1} />
      <BestOffers />
      <Banner images={bannerArr2} />
      <PopularShops />
      <Brands />
      <BackTopBtn />
    </div>
  );
});
