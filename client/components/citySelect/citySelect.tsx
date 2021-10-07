import styles from './citySelect.module.scss';

import React, { useState, useRef, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CityStore } from '../../mobx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faSearch,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { InputComponent } from '../UI/input';
import { ButtonComponent } from '../UI/button';

import { useOnClickOutside } from '../../hooks';

import type {
  CityComponentProps,
  CitySelectProps,
} from './citySelect.interface';

const CityComponent: FC<CityComponentProps> = ({
  title,
  onClick,
  activeCityTitle,
}) => (
  <div
    className={clsx(
      styles.citySelect__cityItem,
      activeCityTitle === title && styles.citySelect__cityItem_active
    )}
    onClick={onClick}>
    <p className={styles.citySelect__cityItemCity}>{title}</p>
  </div>
);

export const CitySelect: FC<CitySelectProps> = observer(
  ({ direction, color }) => {
    const { cities, activeCity } = CityStore;

    const [citySelectActive, setCitySelectActive] = useState<boolean>(false);
    const [activeCityLocal, setActiveCityLocal] = useState<string>(
      activeCity.title
    );
    const citySelectRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(citySelectRef, () => setCitySelectActive(false));

    const directions: { bottom: string; top: string } = {
      bottom: styles.citySelect__list_bottom,
      top: styles.citySelect__list_top,
    };

    const colors: { white: string; black: string } = {
      white: styles.citySelect__chosenCityCity_white,
      black: styles.citySelect__chosenCityCity_black,
    };

    return (
      <div className={styles.citySelect} ref={citySelectRef}>
        <div
          className={styles.citySelect__chosenCity}
          onClick={() => setCitySelectActive(!citySelectActive)}>
          <p className={clsx(styles.citySelect__chosenCityCity, colors[color])}>
            {activeCity.title}
          </p>
          <FontAwesomeIcon
            className={styles.citySelect__chosenCityCity_icon}
            icon={citySelectActive ? faChevronUp : faChevronDown}
          />
        </div>
        {citySelectActive && (
          <div className={clsx(styles.citySelect__list, directions[direction])}>
            <div className={styles.citySelect__listTriangle}></div>
            <h3 className={styles.citySelect__listTitle}>Список городов</h3>
            <div className={styles.citySelect__listContainer}>
              <div className={styles.citySelect__inputContainer}>
                <InputComponent className={styles.citySelect__input} />
                <FontAwesomeIcon
                  className={styles.citySelect__inputIcon}
                  icon={faSearch}
                />
              </div>
              <div className={styles.citySelect__listContainerCities}>
                {cities?.map(({ title }, index) => (
                  <CityComponent
                    title={title}
                    key={(index + title).toString()}
                    onClick={() => setActiveCityLocal(title)}
                    activeCityTitle={activeCityLocal}
                  />
                ))}
              </div>
            </div>

            <ButtonComponent
              color='yellow'
              title='Выбрать'
              className={styles.citySelect__btn}
              onClick={() => {
                CityStore.setActiveCity(activeCityLocal);
                setCitySelectActive(false);
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
