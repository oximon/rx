import styles from './navbar.module.scss';

import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CatalogStore } from '../../mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { ButtonComponent } from '../UI/button/Button';
import { InputComponent } from '../UI/input/Input';

import { navItems } from '../../../lib/constants/navbar.constants';

import type {
  CatalogItemMobileProps,
  CatalogItemProps,
  NavItemProps,
} from './navbar.interface';

const CatalogItem: FC<CatalogItemProps> = ({ title, activeItem, onClick }) => {
  return (
    <div
      className={clsx(
        styles.navbar__catalogSidebarTitleContainer,
        title === activeItem &&
          styles.navbar__catalogSidebarTitleContainer_active
      )}
      onClick={onClick}>
      <div className={styles.navbar__catalogSidebarTitleTriangle} />
      <p className={styles.navbar__catalogSidebarTitle}>{title}</p>
    </div>
  );
};

const NavItem: FC<NavItemProps> = ({ title, icon, route }) => {
  const { pathname } = useRouter();

  return (
    <Link href={route}>
      <a className={styles.navbar__menuItemLink}>
        <li
          className={clsx(
            styles.navbar__menuItem,
            route === pathname && styles.navbar__menuItem_active
          )}>
          <div className={styles.navbar__menuItemIcon}>{icon}</div>
          <p className={styles.navbar__menuItemText}>{title}</p>
        </li>
      </a>
    </Link>
  );
};

const NavMenu: FC = () => (
  <ul className={styles.navbar__menu}>
    {navItems.map(({ title, icon, route }) => (
      <NavItem title={title} icon={icon} route={route} key={title} />
    ))}
  </ul>
);

const CatalogItemMobile: FC<CatalogItemMobileProps> = ({
  onClick,
  activeItem,
  title,
  data,
}) => {
  return (
    <li
      className={clsx(
        styles.navbar__catalogSidebarTitlecontainer,
        title === activeItem &&
          styles.navbar__catalogSidebarTitleContainer_active
      )}
      onClick={onClick}>
      <h3 className={styles.navbar__catalogSidebarTitle}>{title}</h3>
      <div className={styles.navbar__catalogMain}>
        <ul>
          {Object.entries<any>(data).map((item) => (
            <li key={item[0]}>
              <span>{item[0]}</span>
              {item[1].map(({ title }) => (
                <p className={styles.navbar__catalogMainText} key={title}>
                  {title}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export const Navbar: FC = observer(() => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const { isOpen, setOpen, catalog, setActiveItem, activeItem } = CatalogStore;
  //TODO: сделать возможность на разрешении <414 скрывать текущий итем каталога
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
      window.scrollBy(0, -40000000);
      if (window.innerWidth < 414) {
        // setNumberCatalog(null);
        setActiveItem(null);
      }
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__container}>
        <ButtonComponent
          title={
            <Fragment>
              <FontAwesomeIcon icon={icons[isOpen ? 'faTimes' : 'faList']} />
              <span>Каталог</span>
            </Fragment>
          }
          color={isOpen ? 'black' : 'yellow'}
          className={styles.navbar__btn}
          onClick={() => setOpen()}
          iconLeft
        />

        <ButtonComponent
          title={<FontAwesomeIcon icon={icons['faSearch']} />}
          color={activeSearch ? 'black' : 'yellow'}
          className={styles.navbar__inputBtn}
          onClick={() => setActiveSearch(!activeSearch)}
        />
        <div
          className={clsx(
            styles.navbar__inputContainer,
            activeSearch && styles.navbar__inputContainer_open
          )}>
          <InputComponent
            placeholder='Искать на RX'
            className={styles.navbar__input}
          />
          <ButtonComponent
            title={<FontAwesomeIcon icon={icons['faSearch']} />}
            className={styles.navbar__inputContainerBtn}
            color='yellow'
          />
        </div>
      </div>

      <NavMenu />

      {isOpen && (
        <div className={styles.navbar__catalog}>
          <div className={clsx(styles.wrapper, 'wrapper')}>
            <div className={styles.navbar__catalogWrapper}>
              {window.innerWidth > 413 ? (
                <Fragment>
                  <div className={styles.navbar__catalogSidebar}>
                    {catalog.map(({ title }, index) => (
                      <CatalogItem
                        title={title}
                        key={(title + index).toString()}
                        activeItem={activeItem?.title}
                        onClick={() => setActiveItem(title)}
                      />
                    ))}
                  </div>
                  <div className={styles.navbar__catalogMain}>
                    {
                      // typeof numberCatalog !== 'object' &&
                      <ul>
                        {Object.entries<any>(activeItem?.data).map((item) => (
                          <li key={item[0]}>
                            <span>{item[0]}</span>
                            {item[1].map(({ title }) => (
                              <p
                                className={styles.navbar__catalogMainText}
                                key={title}>
                                {title}
                              </p>
                            ))}
                          </li>
                        ))}
                      </ul>
                    }
                  </div>
                </Fragment>
              ) : (
                <ul>
                  {catalog?.map(({ title, data }, index) => (
                    <CatalogItemMobile
                      onClick={() =>
                        // setNumberCatalog(numberCatalog === index ? null : index)
                        setActiveItem(title)
                      }
                      title={title}
                      data={data}
                      activeItem={activeItem?.title}
                      key={(title + index).toString()}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
