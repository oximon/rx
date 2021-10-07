import styles from './header.module.scss';

import Link from 'next/link';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { ModalStore, UserStore } from '../../mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import CitySelect from '../citySelect';
import Navbar from '../navbar';
import { ButtonComponent } from '../UI/button/Button';
import ModalComponent from '../modal/modal.component';

import {
  MODAL_LOGIN_IN_MAINPAGE,
  MODAL_SIGNUP_IN_MAINPAGE,
  MODAL_RESET_PASSWORD_IN_MAINPAGE,
  MODAL_CHANGE_PASSWORD_IN_MAINPAGE,
  MODAL_SIGNUP_SUCCESS,
  MODAL_CONFIRM_EMAIL_SUCCESS,
} from '../../../lib/constants/modal.constants';

const plusCircle = (
  <svg
    width='20'
    height='20'
    className={styles.header__button_login_svg}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.8333 5.8335H9.16658V9.16683H5.83325V10.8335H9.16658V14.1668H10.8333V10.8335H14.1666V9.16683H10.8333V5.8335Z'
      fill='#00002B'
    />
    <path
      d='M10.0001 1.6665C5.40508 1.6665 1.66675 5.40484 1.66675 9.99984C1.66675 14.5948 5.40508 18.3332 10.0001 18.3332C14.5951 18.3332 18.3334 14.5948 18.3334 9.99984C18.3334 5.40484 14.5951 1.6665 10.0001 1.6665ZM10.0001 16.6665C6.32425 16.6665 3.33341 13.6757 3.33341 9.99984C3.33341 6.324 6.32425 3.33317 10.0001 3.33317C13.6759 3.33317 16.6667 6.324 16.6667 9.99984C16.6667 13.6757 13.6759 16.6665 10.0001 16.6665Z'
      fill='#00002B'
    />
  </svg>
);

export const Header = observer(() => {
  const { onToggleModalView } = ModalStore;
  const { isAuth } = UserStore;

  return (
    <Fragment>
      <ModalComponent modalName={MODAL_LOGIN_IN_MAINPAGE} />
      <ModalComponent modalName={MODAL_SIGNUP_IN_MAINPAGE} />
      <ModalComponent modalName={MODAL_RESET_PASSWORD_IN_MAINPAGE} />
      <ModalComponent modalName={MODAL_CHANGE_PASSWORD_IN_MAINPAGE} />
      <ModalComponent modalName={MODAL_SIGNUP_SUCCESS} />
      <ModalComponent modalName={MODAL_CONFIRM_EMAIL_SUCCESS} />

      <header className={styles.header}>
        <div className={styles.header__blackColor}>
          <div className={clsx(styles.header__top, 'wrapper padding-9rem')}>
            <div className={styles.header__logoContainer}>
              <Link href='/'>
                <a className={styles.navbar__logoLink}>
                  <img
                    className=''
                    src='/images/logo.svg'
                    alt='лого rx machine'
                  />
                </a>
              </Link>

              <CitySelect direction='bottom' color='black' />
            </div>

            <div className={styles.header__btnContainer}>
              <ButtonComponent
                title={
                  <Fragment>
                    <FontAwesomeIcon
                      className={styles.header__button_login_svg}
                      icon={faSignInAlt}
                    />
                    Войти
                  </Fragment>
                }
                color='black'
                onClick={() => onToggleModalView(MODAL_LOGIN_IN_MAINPAGE, true)}
                iconLeft
              />
              <ButtonComponent
                title={
                  <Fragment>
                    {plusCircle}
                    Заявка
                  </Fragment>
                }
                color='yellow'
                onClick={() =>
                  onToggleModalView(isAuth ? '' : MODAL_LOGIN_IN_MAINPAGE, true)
                }
                iconLeft
              />
              <ButtonComponent
                title={
                  <Fragment>
                    {plusCircle}
                    Объявление
                  </Fragment>
                }
                color='yellow'
                onClick={() =>
                  onToggleModalView(isAuth ? '' : MODAL_LOGIN_IN_MAINPAGE, true)
                }
                iconLeft
              />
            </div>
          </div>
        </div>

        <div className={clsx(styles.header__navbar, 'wrapper padding-9rem')}>
          <Navbar />
        </div>
      </header>
    </Fragment>
  );
});
