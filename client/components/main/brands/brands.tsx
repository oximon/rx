import styles from './brand.module.scss';

import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore, MainStore } from '../../../mobx';

import clsx from 'clsx';

import SectionTitle from '../sectionTitle';

export const Brands: FC = observer(() => {
  const { isLoading } = LoaderStore;
  const { partners } = MainStore;

  return (
    <section className={clsx(styles.brands, 'wrapper padding-9rem')}>
      <SectionTitle
        title='Производители'
        className='sectionTitleMainpageBrands'
      />

      <div
        className={clsx(styles.brands__container, isLoading && styles.loading)}>
        {partners?.map((brand) => (
          <img
            src={brand}
            alt='Изображение производителя'
            key={brand.toString()}
            className={styles.brands__img}
          />
        ))}
        {partners.map((brand) => (
          <div className={styles.brands__mock} key={brand.toString()}></div>
        ))}
      </div>
    </section>
  );
});
