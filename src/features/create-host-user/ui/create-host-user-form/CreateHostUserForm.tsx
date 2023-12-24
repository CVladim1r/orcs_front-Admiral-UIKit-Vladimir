
import { useState, type FC, type MouseEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreateHostUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { useCreateHostUser } from '../../api/createHostUser';
import { useTranslation } from 'react-i18next';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField, Label, Toggle } from '@vtb/ui-kit3';

interface CreateHostUserFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const CreateHostUserForm: FC<CreateHostUserFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } =
    useCreateHostUser(queryClient);

  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isNeedSudo, setIsNeedSudo] = useState<boolean>(false);
  const [isUseSshKey, setIsUseSshKey] = useState<boolean>(false);
  const [sshKey, setSshKey] = useState<string | undefined>();



  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [sshKeyError, setSshKeyError] = useState<string>('');
  const [passwordErrorPattern, setPasswordErrorPattern] = useState<string>('');

  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (!login || !password || !description || !description) {
      console.error('Create host user form fields not valid');
      if (!login) setLoginError(t('createhostuserform.login.empty'));
      if (!password) setPasswordError(t('createhostuserform.password.empty'));
      if (!description) setDescriptionError(t('createhostuserform.description.empty'));
      if (!sshKey) setSshKeyError(t('createhostuserform.sshkey.empty'));
      return;
    }

    setLoginError('');
    setPasswordError('');
    setDescriptionError('');
    setSshKeyError('');

    const hostUser: CreateHostUserData = {
      login,
      description,
      pwd: password,
      need_sudo: isNeedSudo,
      use_ssh_key: isUseSshKey,
      sshkey: sshKey,
    };

    mutate(hostUser);
  };

  useEffect(() => {
    if (isSuccess) {
      setLogin(undefined);
      setPassword(undefined);
      setDescription(undefined);
      setIsNeedSudo(false);
      setIsUseSshKey(false);
      setSshKey(undefined);
      if (onSuccess) onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (onError) onError();
    }
  }, [isError]);

  return (
    <form className="flex flex-col w-full gap-3 form-control ml-2 mt-4">
      {isLoading ? <BlurLoader /> : null}
      <div>
        <InputField
          label={t('createhostuserform.login.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{loginError ? loginError : ''}</span>}
          value={login}
          placeholder={t('createhostuserform.defaultplaceholder')}
          onChange={(event) => {
            setLogin(event.currentTarget.value);
            setLoginError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createhostuserform.password.label')}
          extraText={
            <span className={`mt-1 text-sm ${passwordError ? 'text-red-400' : ''}`}>
              {passwordError ? passwordError : ''}
              {passwordErrorPattern && (
                <p className="text-red-400 mt-1">
                  Неверный пароль. Пожалуйста, убедитесь, что пароль содержит минимум 8 символов, включая хотя бы одну цифру, одну строчную и одну прописную букву.
                </p>
              )}
            </span>
          }
          value={password}
          placeholder={t('createhostuserform.defaultplaceholder')}
          type='password'
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          onChange={(event) => {
            const newPassword = event.currentTarget.value;
            setPassword(newPassword);
            if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
              setPasswordErrorPattern('Неверный адрес электронной почты');
            } else {
              setPasswordError('');
              setPasswordErrorPattern('');
            }
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createhostuserform.description.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{descriptionError ? descriptionError : ''}</span>}
          value={description}
          placeholder={t('createhostuserform.defaultplaceholder')}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
            setDescriptionError('');
          }}
        />
      </div>
      <div>
        <Label className="label cursor-pointer">
          {t('createhostuserform.sshkey.label')}
          <Toggle
            type="checkbox"
            checked={isUseSshKey}
            onChange={() => {
              setIsUseSshKey((prev) => !prev);
            }}
          />
        </Label>
        <InputField
          disabled={!isUseSshKey}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{sshKeyError && isUseSshKey ? sshKeyError : ''}</span>}
          value={sshKey}
          placeholder={t('createhostuserform.defaultplaceholder')}
          onChange={(event) => {
            setSshKey(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <Label className="label cursor-pointer">
          {t('createhostuserform.sudo.label')}
          <Toggle
            type="checkbox"
            checked={isNeedSudo}
            onChange={() => {
              setIsNeedSudo((prev) => !prev);
            }}
          />
        </Label>
      </div>

      <Button onClick={handleCreate}>
        {t('create')}
      </Button>
    </form>
  );
};
