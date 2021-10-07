import styles from './login.module.scss';

import React, {
  Fragment,
  useState,
  useRef,
  FC,
  FormEvent,
  useMemo,
} from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore } from '../../../mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
  faSignInAlt,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import Modal from '../../modal/Modal';
import { ButtonComponent } from '../../UI/button';
import { InputComponent } from '../../UI/input';
import InputErrorComponent from '../../inputErrorComponent';

import {
  MODAL_LOGIN_IN_MAINPAGE,
  MODAL_SIGNUP_IN_MAINPAGE,
} from '../../../../lib/constants/modal.constants';
import { useModalFormHook, useOnClickOutside } from '../../../hooks';

import type { LoginModalInterface } from './loginModal.interface';

export const LoginModal: FC<LoginModalInterface> = observer(
  ({ onToggleModalView, innerRef }) => {
    const { isLoading } = LoaderStore;
    const [passState, setPassState] = useState<boolean>(false);
    const loginModalRef = useRef<HTMLDivElement>(null);
    const loginRef = useRef<HTMLInputElement>();
    const passRef = useRef<HTMLInputElement>();

    useOnClickOutside(loginModalRef, () =>
      onToggleModalView(MODAL_LOGIN_IN_MAINPAGE)
    );

    const { onSubmit, value } = useModalFormHook({
      type: 'login',
    });

    const openSignupModal = (): void => {
      onToggleModalView(MODAL_LOGIN_IN_MAINPAGE);
      onToggleModalView(MODAL_SIGNUP_IN_MAINPAGE, true);
    };

    const titleButton: string = useMemo(
      () => (isLoading ? 'Загрузка...' : 'Войти'),
      [isLoading]
    );

    return (
      <Modal innerRef={innerRef}>
        <div className={styles.login} ref={loginModalRef}>
          <h2 className={styles.login__title}>
            Авторизация на&nbsp;
            <span>
              rx<span>machine</span>
            </span>
          </h2>

          <form
            onSubmit={(e: FormEvent) =>
              onSubmit(e)({
                login: loginRef.current?.value,
                password: passRef.current?.value,
              })
            }
            className={styles.login__form}>
            <div className={styles.login__inputLogin}>
              <InputComponent
                innerRef={loginRef}
                version='v1'
                placeholder='Адрес электронной почти'
                className={styles.login__input}
                iconLeft={<FontAwesomeIcon icon={faEnvelope} />}
              />
              {value?.login && <InputErrorComponent message={value?.login} />}
            </div>

            <div className={styles.login__inputPassword}>
              <InputComponent
                innerRef={passRef}
                version='v1'
                placeholder='Пароль'
                className={styles.login__input}
                type={passState ? 'text' : 'password'}
                iconLeft={<FontAwesomeIcon icon={faLock} />}
              />
              <FontAwesomeIcon
                className={styles.login__inputPasswordIcon}
                icon={passState ? faEye : faEyeSlash}
                onClick={() => setPassState(!passState)}
              />
            </div>
            {value?.password && (
              <InputErrorComponent message={value?.password} />
            )}

            <ButtonComponent
              color='yellow'
              type='submit'
              title={
                <Fragment>
                  <FontAwesomeIcon icon={faSignInAlt} /> {titleButton}
                </Fragment>
              }
              className={styles.login__btn}
            />

            <div className={styles.login__helpers}>
              <p className={styles.login__helpersRemember}>
                <FontAwesomeIcon icon={faCheckCircle} />
                Запомнить меня
              </p>
              <p className={styles.login__helpersForget}>Забыли пароль?</p>
            </div>

            <p className={styles.login__question}>
              Впервые на RX<span>machine</span>?
            </p>

            <p
              onClick={() => openSignupModal()}
              className={styles.login__signup}>
              Зарегистрируйтесь сейчас
            </p>

            <p className={styles.login__terms}>
              При входе вы подтверждаете согласие с условиями{' '}
              <span>
                пользовательского соглашения и политикой конфиденциальности.
              </span>
            </p>
            <p className={styles.login__termsAdditional}>
              Подробнее на сайте: https://rx-machine.ru
            </p>
          </form>

          <ButtonComponent
            onClick={() => onToggleModalView(MODAL_LOGIN_IN_MAINPAGE)}
            close
          />
        </div>
      </Modal>
    );
  }
);
