import React, { useState, useEffect, useRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useUserLogin } from '../api/userLogin';
import Cookies from 'js-cookie';
import { sessionModel } from '@/entities/session';
import toast from 'react-hot-toast';
import { setAuthorizationHeader } from '@/shared/lib/axios';
import { Button, InputField } from '@vtb/ui-kit3';
import logo from '@/shared/assets/dark-logo.png';

const baseUrlFromEnv = import.meta.env.VITE_ORACULUS_API_BASE_URL;

interface UserLoginFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const UserLoginForm: FC<UserLoginFormProps> = ({ onSuccess, onError }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isSuccess, isError } = useUserLogin(queryClient);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!login || !password) {
      console.error('Поля формы не заполнены');
      if (!login) setLoginError('Введите логин');
      if (!password) setPasswordError('Введите пароль');
      return;
    }

    setLoginError('');
    setPasswordError('');

    try {
      const token = await fetchAuthToken();
      if (token) {
        sessionModel.login();
        toast.success('Пользователь успешно вошел в систему');
      } else {
        toast.error('Ошибка входа');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const fetchAuthToken = async () => {
    try {
      const response = await fetch(
        `${baseUrlFromEnv}/user/login?username=${login}&password=${password}`,
      );
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      const token = await response.json();
      Cookies.set('AuthToken', token);

      setAuthorizationHeader(token);

      return token;
    } catch (error) {
      console.error('Произошла ошибка:', error);
      return null;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setLogin('');
      setPassword('');

      if (onSuccess) onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (onError) onError();
    }
  }, [isError]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin(event as unknown as React.MouseEvent);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(event as unknown as React.MouseEvent);
  };

  return (
    <form className="flex flex-col w-full gap-3 form-control" onSubmit={handleSubmit}>
      <div style={{paddingTop: "134px", display: "flex", justifyContent: "center", flexWrap: "nowrap", alignItems: "center", gap: "36px", flexDirection: "column"}}>
        <img
          style={{width: "90px", height: "33px"}}
          src={logo}
          alt="Logo"
        />
        <h1 style={{fontFamily: "VTB Group UI",fontWeight: "550", fontStyle: "normal", fontSize: "32px", color: "var(--light-web-text-primary, #2B313B)", }} className="text-2xl font-semibold text-center">Вход в систему</h1>
      </div>
     
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: "24px", paddingBottom: "20px"}}>
        <div style={{width: "328px"}}>
          <InputField
            label="Логин"
            extraText={<span className="mt-1 text-sm text-red-400">{loginError ? loginError : ''}</span>}
            value={login}
            className='w-full'
            placeholder={t('createuserform.defaultplaceholder')}
            onChange={(event) => {
              setLogin(event.currentTarget.value);
              setLoginError('');
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div style={{width: "328px"}}>
          <InputField
            label="Пароль"
            type="password"
            extraText={<span className="mt-1 text-sm text-red-400">{passwordError ? passwordError : ''}</span>}
            value={password}
            className='w-full'
            placeholder={t('createuserform.defaultplaceholder')}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              setPasswordError('');
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button type="submit" ref={buttonRef} style={{width: "328px", height: "40px", borderRadius: "10px", opacity: 0.9}}>
          {t('login')}
        </Button>
        <div style={{width: "352px", height: "1px", flexShrink: 0, background: "var(--Neutral-Neutral-20, #D5D8DE)", marginTop: "32px", marginBottom: "80px"}}></div>
      </div>
      
      
    </form>
  );
};