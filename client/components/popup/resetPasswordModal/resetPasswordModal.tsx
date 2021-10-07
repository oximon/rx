import styles from './resetPasswordModal.module.scss';

import React, { useRef, FC, FormEvent, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { LoaderStore } from '../../../mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../modal/Modal';
import { ButtonComponent } from '../../UI/button';
import { InputComponent } from '../../UI/input';
import InputErrorComponent from '../../inputErrorComponent';

import { MODAL_RESET_PASSWORD_IN_MAINPAGE } from '../../../../lib/constants/modal.constants';
import { useModalFormHook, useOnClickOutside } from '../../../hooks';

import type { resetPasswordModalInterface } from './resetPasswordModal.interface';

export const ResetPasswordModal: FC<resetPasswordModalInterface> = observer(
  ({ onToggleModalView, innerRef }) => {
    const { isLoading } = LoaderStore;
    const loginModalRef = useRef<HTMLDivElement>(null);
    const loginRef = useRef<HTMLInputElement>();

    useOnClickOutside(loginModalRef, () =>
      onToggleModalView(MODAL_RESET_PASSWORD_IN_MAINPAGE)
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
            Восстановление пароля на&nbsp;
            <span>
              rx<span>machine</span>
            </span>
          </h2>

          <p className={styles.login__subtitle}>
            Введите электронную почту для смены пароля
          </p>

          <form
            onSubmit={(e: FormEvent) =>
              onSubmit(e)({
                login: loginRef.current?.value,
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
            onClick={() => onToggleModalView(MODAL_RESET_PASSWORD_IN_MAINPAGE)}
            close
          />
        </div>
      </Modal>
    );
  }
);
