import { useState, type FC, type MouseEvent, useEffect } from 'react';
import { useCreateUser } from '../../api/createUser';
import { useQueryClient } from '@tanstack/react-query';
import { CreateUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { useTranslation } from 'react-i18next';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField, Option, SearchSelectField } from '@vtb/ui-kit3';
interface CreateUserFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const CreateUserForm: FC<CreateUserFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useCreateUser(queryClient);
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [userType, setUserType] = useState<string>('');

  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [fullNameError, setFullNameError] = useState<string>('');
  const [userTypeError, setUserTypeError] = useState<string>('');

  const [emailErrorPattern, setEmailErrorPattern] = useState<string>('');
  const [passwordErrorPattern, setPasswordErrorPattern] = useState<string>('');
  const handleCreate = async (event: MouseEvent) => {
    event.preventDefault();
    if (!login || !password || !fullName || !email || !userType) {
      console.error('Create user form fields not valid');

      if (!login) setLoginError(t('createuserform.login.empty'));
      if (!password) setPasswordError(t('createuserform.password.empty'));
      if (!email) setEmailError(t('createuserform.email.empty'));
      if (!fullName) setFullNameError(t('createuserform.fullname.empty'));
      if (!userType) setUserTypeError(t('createuserform.type.empty'));
      return;
    }

    setLoginError('');
    setPasswordError('');
    setEmailError('');
    setFullNameError('');
    setUserTypeError('');

    const user: CreateUserData = {
      login,
      pwd: password,
      full_name: fullName,
      email,
      user_type: userType,
      user_locked: false,
      use_ldap: false,
    };

    mutate(user);
  };

  useEffect(() => {
    if (isSuccess) {
      setLogin('');
      setPassword('');
      setEmail('');
      setFullName('');
      setUserType('');
      if (onSuccess) onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (onError) onError();
    }
  }, [isError]);



  return (
    <form className="flex flex-col w-full gap-5 form-control ml-3 mt-4 p-3">
      {isLoading ? <BlurLoader /> : null}
      <div>
        <InputField
          label={t('createuserform.login.label')}
          extraText={<span className="mt-1 text-sm text-red-400">{loginError ? loginError : ''}</span>}
          value={login}
          placeholder={t('createuserform.defaultplaceholder')}
          onChange={(event) => {
            setLogin(event.currentTarget.value);
            setLoginError('');
          }}
          style={{}}
        />
      </div>
      <div>
        <InputField
          label={t('createuserform.password.label')}
          extraText={
            <span className={`mt-1 text-sm ${passwordError || !password ? 'text-red-400' : ''}`}>
              {passwordError && password ? passwordError : ''}
              {passwordErrorPattern && (
                <p className="text-red-400 mt-1">
                  Пожалуйста, убедитесь, что пароль содержит минимум 8 символов, включая хотя бы одну цифру, одну строчную и одну прописную букву.
                </p>
              )}
            </span>
          }
          value={password}
          placeholder={t('createuserform.defaultplaceholder')}
          type='password'
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          onChange={(event) => {
            const newPassword = event.currentTarget.value;
            setPassword(newPassword);

            if (!newPassword) {
              // Empty password
              setPasswordError('');
              setPasswordErrorPattern('');
            } else if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
              setPasswordErrorPattern('Неверный адрес электронной почты');
            } else {
              setPasswordError('');
              setPasswordErrorPattern('');
            }
          }}
        />
      </div>
      <div style={{width: "auto", height: "1px", flexShrink: 0, background: "var(--Neutral-Neutral-20, #D5D8DE)", marginTop: "12px", marginBottom: "12px"}}></div>
      <div>
        <InputField
          label={t('createuserform.email.label')}
          extraText={
            <span className={`mt-1 text-sm ${emailError ? 'text-red-400' : ''}`}>
              {emailError ? emailError : ''}
              {emailErrorPattern && (
                <p className="text-red-400 mt-1">
                  Неверный адрес электронной почты. Пожалуйста, убедитесь, что адрес электронной почты соответствует следующему формату: <b>user@example.com</b>
                </p>
              )}
            </span>
          }
          value={email}
          placeholder={t('createuserform.defaultplaceholder')}
          type="email"
          pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={(event) => {
            const newEmail = event.currentTarget.value;
            setEmail(newEmail);

            if (!newEmail.match(/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)) {
              setEmailErrorPattern('Неверный адрес электронной почты');

            } else {
              setEmailError('');
              setEmailErrorPattern('');
            }
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createuserform.fullname.label')}
          extraText={<span className="mt-1 text-sm text-red-400">{fullNameError ? fullNameError : ''}</span>}
          value={fullName}
          placeholder={t('createuserform.defaultplaceholder')}
          onChange={(event) => {
            setFullName(event.currentTarget.value);
            setFullNameError('');
          }}
        />
      </div>
      <div>
        <SearchSelectField
          label={t('createuserform.type.label')}
          placeholder={t('createuserform.type.hint')}
          value={userType}
          onChange={(event) => {
            setUserType(event.currentTarget.value);
            setUserTypeError('');
          }}>
          <Option value="admin">{t('createuserform.type.variants.admin')}</Option>
          <Option value="user">{t('createuserform.type.variants.user')}</Option>
          <Option value="monitor">{t('createuserform.type.variants.monitor')}</Option>
        </SearchSelectField>
        {userTypeError && <span className="mt-1 text-sm text-red-400">{userTypeError}</span>}
      </div>
      <Button onClick={handleCreate} style={{borderRadius: "4px", width: "124px", height: "40px"}}>
        {t('create')}
      </Button>
    </form>
  );
};
