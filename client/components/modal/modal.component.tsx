import dynamic from 'next/dynamic';
import React, { useRef, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ModalStore } from '../../mobx';

import {
  MODAL_LOGIN_IN_MAINPAGE,
  MODAL_SIGNUP_IN_MAINPAGE,
  MODAL_RESET_PASSWORD_IN_MAINPAGE,
  MODAL_CHANGE_PASSWORD_IN_MAINPAGE,
  MODAL_SIGNUP_SUCCESS,
  MODAL_CONFIRM_EMAIL_SUCCESS,
} from '../../../lib/constants/modal.constants';

import type { LoginModalInterface } from '../popup/login/loginModal.interface';
import type { SignupModalInterface } from '../popup/signup/signupModal.interface';
import type { resetPasswordModalInterface } from '../popup/resetPasswordModal/resetPasswordModal.interface';
import type { changePasswordModalInterface } from '../popup/changePasswordModal/changePasswordModal.interface';
import type { additionalModalModalInterface } from '../popup/additionalModal/additionalModal.interface';
import type { ModalComponentType } from './modal.interface';

const LoginModal = dynamic<LoginModalInterface>(() => import('../popup/login'));
const SignupModal = dynamic<SignupModalInterface>(
  () => import('../popup/signup')
);
const ResetPasswordModal = dynamic<resetPasswordModalInterface>(
  () => import('../popup/resetPasswordModal')
);
const ChangePasswordModal = dynamic<changePasswordModalInterface>(
  () => import('../popup/changePasswordModal')
);
const AdditionalModal = dynamic<additionalModalModalInterface>(
  () => import('../popup/additionalModal')
);

const ModalComponent: FC<ModalComponentType> = ({ modalName }) => {
  const { modals, onToggleModalView } = ModalStore;

  const modalRef = useRef<HTMLDivElement>(null);

  switch (modalName) {
    case MODAL_LOGIN_IN_MAINPAGE:
      return (
        modals.includes(MODAL_LOGIN_IN_MAINPAGE) && (
          <LoginModal
            innerRef={modalRef}
            onToggleModalView={onToggleModalView}
          />
        )
      );

    case MODAL_SIGNUP_IN_MAINPAGE:
      return (
        modals.includes(MODAL_SIGNUP_IN_MAINPAGE) && (
          <SignupModal
            innerRef={modalRef}
            onToggleModalView={onToggleModalView}
          />
        )
      );

    case MODAL_RESET_PASSWORD_IN_MAINPAGE:
      return (
        modals.includes(MODAL_RESET_PASSWORD_IN_MAINPAGE) && (
          <ResetPasswordModal
            innerRef={modalRef}
            onToggleModalView={onToggleModalView}
          />
        )
      );

    case MODAL_CHANGE_PASSWORD_IN_MAINPAGE:
      return (
        modals.includes(MODAL_CHANGE_PASSWORD_IN_MAINPAGE) && (
          <ChangePasswordModal
            innerRef={modalRef}
            onToggleModalView={onToggleModalView}
          />
        )
      );

    case MODAL_SIGNUP_SUCCESS:
      return (
        modals.includes(MODAL_SIGNUP_SUCCESS) && (
          <AdditionalModal
            innerRef={modalRef}
            onToggleModalView={onToggleModalView}
            type='success'
            title='Вы успешно зарегистрировались!'
            subtitle='Для подтверждения аккаунта
            мы отправили ссылку на вашу почту'
          />
        )
      );

    case MODAL_CONFIRM_EMAIL_SUCCESS:
      return (
        modals.includes(MODAL_CONFIRM_EMAIL_SUCCESS) && (
          <AdditionalModal
            innerRef={modalRef}
            onToggleModalView={onToggleModalView}
            type='success'
            title='Вы успешно подтвердили почту!'
            subtitle='Добро пожаловать на сайт RXmachine'
          />
        )
      );

    default:
      return null;
  }
};

export default observer(ModalComponent);
