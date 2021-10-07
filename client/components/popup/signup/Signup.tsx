import styles from './signup.module.scss';

import React, { memo, useState, useRef, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Modal from '../../modal/Modal';
import { ButtonComponent } from '../../UI/button';
import { InputComponent } from '../../UI/input';

import { useModalFormHook, useOnClickOutside } from '../../../hooks';
import {
  MODAL_SIGNUP_IN_MAINPAGE,
  MODAL_LOGIN_IN_MAINPAGE,
} from '../../../../lib/constants/modal.constants';

import type { SignupModalInterface } from './signupModal.interface';

export const SignupModal: FC<SignupModalInterface> = memo(
  ({ onToggleModalView, innerRef }) => {
    const [passState, setPassState] = useState<{
      pass: boolean;
      passRepeat: boolean;
    }>({
      pass: false,
      passRepeat: false,
    });

    const signupModalRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(signupModalRef, () =>
      onToggleModalView(MODAL_SIGNUP_IN_MAINPAGE)
    );

    const openLoginModal = (): void => {
      onToggleModalView(MODAL_SIGNUP_IN_MAINPAGE);
      onToggleModalView(MODAL_LOGIN_IN_MAINPAGE, true);
    };

    return (
      <Modal innerRef={innerRef}>
        <div className={styles.signup}>
          <h2 className={styles.signup__title}>
            Регистрация на&nbsp;
            <span>
              rx<span>machine</span>
            </span>
          </h2>

          <form className={styles.signup__form}>
            <div className={styles.signup__inputLogin}>
              <InputComponent
                version='v1'
                placeholder='Адрес электронной почти'
                className={styles.signup__input}
                iconLeft={<FontAwesomeIcon icon={faEnvelope} />}
              />
            </div>

            <div className={styles.signup__inputPassword}>
              <InputComponent
                version='v1'
                placeholder='Пароль'
                className={styles.signup__input}
                type={passState.pass ? 'text' : 'password'}
                iconLeft={<FontAwesomeIcon icon={faLock} />}
              />
              <FontAwesomeIcon
                className={styles.signup__inputPasswordIcon}
                icon={passState.pass ? faEye : faEyeSlash}
                onClick={() =>
                  setPassState({ ...passState, pass: !passState.pass })
                }
              />
            </div>

            <div
              className={clsx(
                styles.signup__inputPassword,
                styles.signup__inputPassword_lastChild
              )}>
              <InputComponent
                version='v1'
                placeholder='Подтвердите пароль'
                className={styles.signup__input}
                type={passState.passRepeat ? 'text' : 'password'}
                iconLeft={<FontAwesomeIcon icon={faLock} />}
              />
              <FontAwesomeIcon
                className={styles.signup__inputPasswordIcon}
                icon={passState.passRepeat ? faEye : faEyeSlash}
                onClick={() =>
                  setPassState({
                    ...passState,
                    passRepeat: !passState.passRepeat,
                  })
                }
              />
            </div>

            <ButtonComponent
              color='yellow'
              type='submit'
              title='Зарегистрироваться'
              className={styles.signup__btn}
            />

            <p className={styles.signup__question}>Уже есть аккаунт?</p>

            <p
              onClick={() => openLoginModal()}
              className={styles.signup__signup}>
              Авторизуйтесь сейчас
            </p>

            <p className={styles.signup__terms}>
              При входе вы подтверждаете согласие с условиями&nbsp;
            </p>
            <p
              className={clsx(
                styles.signup__terms,
                styles.signup__terms_underline
              )}>
              пользовательского соглашения и политикой конфиденциальности.
            </p>
            <p className={styles.signup__termsAdditional}>
              Подробнее на сайте: https://rx-machine.ru
            </p>
          </form>

          <ButtonComponent
            onClick={() => onToggleModalView(MODAL_SIGNUP_IN_MAINPAGE)}
            close
          />
        </div>
      </Modal>
    );
  }
);
