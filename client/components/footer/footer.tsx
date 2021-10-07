import styles from './footer.module.scss';

import React, { useState, useCallback, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ModalStore, CatalogStore } from '../../mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import CitySelect from '../citySelect';

import { navItems } from '../../../lib/constants/footer-menu.constants';
import { MODAL_LOGIN_IN_MAINPAGE } from '../../../lib/constants/modal.constants';

import type { NavItemProps } from './footer.interface';

const NavItem: FC<NavItemProps> = ({ title, icon, onClick }) => {
  return (
    <li className={styles.footer__navItem} onClick={onClick}>
      <div className={styles.footer__navItemIcon}>
        <FontAwesomeIcon icon={icons[icon]} />
      </div>
      <p className={styles.footer__navItemText}>{title}</p>
    </li>
  );
};

export const Footer: FC = observer(() => {
  const [infoActive, setInfoActive] = useState<{
    services: boolean;
    cooperation: boolean;
    contacts: boolean;
  }>({
    services: true,
    cooperation: true,
    contacts: true,
  });
  const [addInfoActive, setAddInfoActive] = useState<{
    add: boolean;
    addInfo: boolean;
  }>({
    add: false,
    addInfo: false,
  });

  const { onToggleModalView } = ModalStore;

  const onNavFunc = useCallback((title: string): void => {
    switch (title) {
      case 'Войти':
        onToggleModalView(MODAL_LOGIN_IN_MAINPAGE, true);
        return;
      case 'Каталог':
        CatalogStore.setOpen();
        return;
      default:
        return;
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.footer__position, 'wrapper padding-9rem')}>
        <div className={styles.footer__container}>
          <div className={styles.footer__description}>
            <img
              className={styles.footer__descriptionLogo}
              src='/images/logo.svg'
              alt='лого rx machine'
            />
            <p
              className={styles.footer__descriptionTextBtn}
              onClick={() =>
                setAddInfoActive({ ...addInfoActive, add: !addInfoActive.add })
              }>
              Подробнее
            </p>
            <p className={styles.footer__descriptionText}>
              Площадка по продаже, аренде, перевозкам коммерческого транспорта,
              спецтехники, сельхозтехники и запчастей.
            </p>
            {addInfoActive.add ? (
              <p className={styles.footer__descriptionText_adaptive}>
                Площадка по продаже, аренде, перевозкам коммерческого
                транспорта, спецтехники, сельхозтехники и запчастей.
              </p>
            ) : null}
            <CitySelect direction='top' color='white' />
{/* TODO: поправить хавер на иконку социалок */}
            <div className={styles.footer__infoList_social}>
              <h2
                className={clsx(
                  styles.footer__infoTitle,
                  styles.footer__infoTitle_social
                )}>
                Мы в соцсетях
              </h2>
              <ul
                className={clsx(
                  styles.footer__infoList,
                  styles.footer__infoList_icon
                )}>
                <li className={styles.footer__infoListIcon}>
                  <img
                    src='/images/footer/fc.svg'
                    alt='Изображение иконки facebook'
                  />
                </li>
                <li className={styles.footer__infoListIcon}>
                  <img
                    src='/images/footer/instagram.svg'
                    alt='Изображение иконки instagram'
                  />
                </li>
                <li className={styles.footer__infoListIcon}>
                  <img
                    src='/images/footer/vk.svg'
                    alt='Изображение иконки vk'
                  />
                </li>
              </ul>
            </div>
          </div>

          <ul className={styles.footer__infoContainer}>
            <li className={styles.footer__info}>
              <h2 className={styles.footer__infoTitle}>Услуги</h2>
              <h2
                className={styles.footer__infoTitle_adaptive}
                onClick={() =>
                  setInfoActive({
                    ...infoActive,
                    services: !infoActive.services,
                  })
                }>
                Услуги
                <FontAwesomeIcon
                  className={styles.footer__infoTitleIcon}
                  icon={
                    icons[infoActive.services ? 'faChevronUp' : 'faChevronDown']
                  }
                />
              </h2>
              <ul
                className={clsx(
                  styles.footer__infoList,
                  infoActive.services
                    ? styles.footer__infoList_open
                    : styles.footer__infoList_close
                )}>
                <li className={styles.footer__infoListItem}>Аренда</li>
                <li className={styles.footer__infoListItem}>Продажа</li>
                <li className={styles.footer__infoListItem}>Перевозка</li>
                <li className={styles.footer__infoListItem}>Заявки</li>
              </ul>
            </li>

            <li className={styles.footer__info}>
              <h2 className={styles.footer__infoTitle}>Сотрудничество</h2>
              <h2
                className={styles.footer__infoTitle_adaptive}
                onClick={() =>
                  setInfoActive({
                    ...infoActive,
                    cooperation: !infoActive.cooperation,
                  })
                }>
                Сотрудничество
                <FontAwesomeIcon
                  className={styles.footer__infoTitleIcon}
                  icon={
                    icons[
                      infoActive.cooperation ? 'faChevronUp' : 'faChevronDown'
                    ]
                  }
                />
              </h2>
              <ul
                className={clsx(
                  styles.footer__infoList,
                  infoActive.cooperation
                    ? styles.footer__infoList_open
                    : styles.footer__infoList_close
                )}>
                <li className={styles.footer__infoListItem}>Реклама</li>
                <li className={styles.footer__infoListItem}>
                  Разместить объявление
                </li>
                <li className={styles.footer__infoListItem}>Оставить заявку</li>
              </ul>
            </li>

            <li
              className={clsx(
                styles.footer__info,
                styles.footer__info_contacts
              )}>
              <h2 className={styles.footer__infoTitle}>Контакты</h2>
              <h2
                className={styles.footer__infoTitle_adaptive}
                onClick={() =>
                  setInfoActive({
                    ...infoActive,
                    contacts: !infoActive.contacts,
                  })
                }>
                Контакты
                <FontAwesomeIcon
                  className={styles.footer__infoTitleIcon}
                  icon={
                    icons[infoActive.contacts ? 'faChevronUp' : 'faChevronDown']
                  }
                />
              </h2>
              <ul
                className={clsx(
                  styles.footer__infoList,
                  infoActive.contacts
                    ? styles.footer__infoList_open
                    : styles.footer__infoList_close
                )}>
                <li className={styles.footer__infoListItem}>
                  <a
                    href='tel:+79027044499'
                    className={clsx(
                      styles.footer__infoLink,
                      styles.footer__infoLinkTdnone
                    )}>
                    +7 902 704 44 99
                  </a>
                </li>
                <li className={styles.footer__infoListItem}>
                  <a
                    href='mailto:info@rx-machine.ru'
                    className={clsx(
                      styles.footer__infoLink,
                      styles.footer__infoLink_mail
                    )}>
                    info@rx-machine.ru
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <img
            src='/images/footer/footerCar.png'
            alt='Изображение бульдозера'
            className='footer__img'
          />
        </div>

        <div className={styles.footer__docs}>
          <div className={styles.footer__docsContainer}>
            <div className={styles.footer__docsCopyright}>
              <FontAwesomeIcon icon={icons['faCopyright']} />
              <p
                className={clsx(
                  styles.footer__docsItem,
                  styles.footer__docsItem_copyright
                )}>
                RX<span>machine</span> 2020
              </p>
            </div>

            <p className={styles.footer__docsItem}>
              Пользовательское соглашение
            </p>
            <p className={styles.footer__docsItem}>Договор оферты</p>
            <p className={styles.footer__docsItem}>
              Политика конфиденциальности
            </p>

            {addInfoActive.addInfo ? (
              <div className={styles.footer__docsContainer_adaptive}>
                <p className={styles.footer__docsItem}>
                  Пользовательское соглашение
                </p>
                <p className={styles.footer__docsItem}>Договор оферты</p>
                <p className={styles.footer__docsItem}>
                  Политика конфиденциальности
                </p>
              </div>
            ) : null}
          </div>

          <p
            className={styles.footer__docsItemAdditionalInfo}
            onClick={() =>
              setAddInfoActive({
                ...addInfoActive,
                addInfo: !addInfoActive.addInfo,
              })
            }>
            Подробная информация
          </p>
        </div>
      </div>

      <nav className={styles.footer__nav}>
        <ul className={clsx(styles.footer__navList, 'wrapper padding-9rem')}>
          {navItems.map((item) => (
            <NavItem
              {...item}
              onClick={() => onNavFunc(item.title)}
              key={item.title}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
});
