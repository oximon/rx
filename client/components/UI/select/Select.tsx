import styles from './select.module.scss';

import React, { memo, useRef, useState, useEffect, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import type { SelectComponentProps } from './select.interface';

export const SelectComponent: FC<SelectComponentProps> = memo(
  ({ onChange, arrValues, previewText, defaultValue, numbersValues }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const select = useRef<HTMLDivElement>();

    const handleClickOutside = (event: Event): void => {
      if (select.current && !select.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    const OptionsList = () => (
      <ul className={styles.select_list}>
        {arrValues.map((item) => {
          let { value, title } = item;
          return (
            <li
              value={value}
              onClick={() => {
                onChange(value, title);
                setIsOpen(!isOpen);
              }}
              className={styles.select_item}
              key={value.toString()}>
              {title}
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className={styles.select} ref={select}>
        {previewText && (
          <p className={styles.select_text}>
            {previewText}
            {previewText && ':'}
          </p>
        )}
        <div className={styles.selectContainer}>
          <div
            className={styles.select_input}
            onClick={() => setIsOpen(!isOpen)}>
            <p className={styles.select_input_value}>
              {defaultValue}
              <FontAwesomeIcon
                className={clsx(styles.icon, isOpen && styles.rotate)}
                icon={faChevronDown}
              />
            </p>
          </div>
          {isOpen && (
            <div
              className={clsx(
                numbersValues
                  ? styles.select_numeric_dropdown
                  : styles.select_dropdown
              )}>
              <OptionsList />
            </div>
          )}
        </div>
      </div>
    );
  }
);
