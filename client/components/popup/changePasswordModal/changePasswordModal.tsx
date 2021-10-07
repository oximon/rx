import styles from './changePasswordModal.module.scss';

import React, { useRef, FC, FormEvent, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore } from '../../../mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import Modal from '../../modal/Modal';
import { ButtonComponent } from '../../UI/button';
import { InputComponent } from '../../UI/input';
import InputErrorComponent from '../../inputErrorComponent';

import { MODAL_CHANGE_PASSWORD_IN_MAINPAGE } from '../../../../lib/constants/modal.constants';
import { useModalFormHook, useOnClickOutside } from '../../../hooks';

import type { changePasswordModalInterface } from './changePasswordModal.interface';

export const ChangePasswordModal: FC<changePasswordModalInterface> = observer(
  ({ onToggleModalView, innerRef }) => {
    const { isLoading } = LoaderStore;
    const loginModalRef = useRef<HTMLDivElement>(null);
    const loginRef = useRef<HTMLInputElement>();
    const [passState, setPassState] = useState<{
      pass: boolean;
      passRepeat: boolean;
    }>({
      pass: false,
      passRepeat: false,
    });

    useOnClickOutside(loginModalRef, () =>
      onToggleModalView(MODAL_CHANGE_PASSWORD_IN_MAINPAGE)
    );

    const { onSubmit, value } = useModalFormHook({
      type: 'login',
    });

    const titleButton: string = useMemo(
      () => (isLoading ? 'Загрузка...' : 'Отправить'),
      [isLoading]
    );

    return (
      <Modal innerRef={innerRef}>
        <div className={styles.login} ref={loginModalRef}>
          <h2 className={styles.login__title}>
            Смена пароля на&nbsp;
            <span>
              rx<span>machine</span>
            </span>
          </h2>

          <p className={styles.login__subtitle}>Введите новый пароль</p>

          <form
            onSubmit={(e: FormEvent) =>
              onSubmit(e)({
                login: loginRef.current?.value,
              })
            }
            className={styles.login__form}>
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
              title={titleButton}
              className={styles.login__btn}
            />

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
            onClick={() => onToggleModalView(MODAL_CHANGE_PASSWORD_IN_MAINPAGE)}
            close
          />
        </div>
      </Modal>
    );
  }
);
