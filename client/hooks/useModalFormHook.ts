import { FormEvent, useState } from 'react';
import { UserStore, ModalStore } from '../mobx';
import validator from 'validator';
import { isEmpty } from 'lodash-core';

import {
  MODAL_LOGIN_IN_MAINPAGE,
  MODAL_SIGNUP_IN_MAINPAGE,
} from '../../lib/constants/modal.constants';

import type { errorObjectInterface, inputInterface } from './hooks.interface';

export const useModalFormHook = ({ type }) => {
  const [value, setValue] = useState<any>({});

  const errorTextObj: errorObjectInterface = {
    required: 'Обязательное поле',
    minLength: 'Количество символов меньше 4',
    patternText: 'Только латинские буквы и цифры',
    incorrectEmail: 'Неправильный email',
  };

  const errorObj: any = {};
//TODO: пароль от 5 до 30 символов. символы все, кроме пробелов
  const inputsValidator = (inputs: inputInterface[]) => {
    for (const input of inputs) {
      const { inputName, options, inputValue } = input;

      if (options.includes('required') && !inputValue) {
        errorObj[inputName] = errorTextObj.required;
        continue;
      }

      if (
        options.includes('incorrectEmail') &&
        !validator.isEmail(inputValue)
      ) {
        errorObj[inputName] = errorTextObj.incorrectEmail;
        continue;
      }

      if (
        options.includes('minLength') &&
        !validator.isLength(inputValue, { min: 4 })
      ) {
        errorObj[inputName] = errorTextObj.minLength;
        continue;
      }

      if (
        options.includes('patternText') &&
        !/^[a-zA-Z0-9_-]+$/i.test(inputValue)
      ) {
        errorObj[inputName] = errorTextObj.patternText;
        continue;
      }
    }

    return isEmpty(errorObj);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    return async (data: any): Promise<any> => {
      if (type === 'login') {
        const { login, password }: { login: string; password: string } = data;

        if (
          !inputsValidator([
            {
              inputValue: login,
              inputName: 'login',
              options: ['required', 'incorrectEmail'],
            },
            {
              inputValue: password,
              inputName: 'password',
              options: ['required', 'minLength'],
            },
          ])
        ) {
          setValue(errorObj);
          return;
        }

        setValue({});

        await UserStore.login(
          validator.escape(login),
          validator.escape(password)
        );

        // ModalStore.onToggleModalView(MODAL_ADDITIONAL_LOGIN, true);
        UserStore.isAuth &&
          ModalStore.onToggleModalView(MODAL_LOGIN_IN_MAINPAGE);
      }
    };
  };

  return {
    onSubmit,
    value,
  };
};
