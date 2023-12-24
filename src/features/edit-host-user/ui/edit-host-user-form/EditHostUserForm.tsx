import { HostUser } from '@/entities/host-users/api/hostUsersApi';
import { EditHostUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditHostUser } from '../../api/editHostUserApi';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField, Label, Toggle } from '@vtb/ui-kit3';

interface EditHostUserFormProps {
  hostUser: HostUser;
  onSuccess: () => void;
  onError: () => void;
}

export const EditHostUserForm: FC<EditHostUserFormProps> = ({
  hostUser,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useEditHostUser(
    queryClient,
    hostUser.id,
  );

  const [login, setLogin] = useState<string>(hostUser.login);
  const [password, setPassword] = useState<string>();
  const [description, setDescription] = useState<string | null>(
    hostUser.description,
  );
  const [isNeedSudo, setIsNeedSudo] = useState<boolean>(hostUser.need_sudo);
  const [isUseSshKey, setIsUseSshKey] = useState<boolean>(hostUser.use_ssh_key);
  const [sshKey, setSshKey] = useState<string | undefined>(hostUser.sshkey);

  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (!login || !password || !description) {
      console.error('Create host user form fields not valid');
      return;
    }

    const newHostUser: EditHostUserData = {
      id: hostUser.id,
      login,
      description,
      pwd: password,
      need_sudo: isNeedSudo,
      use_ssh_key: isUseSshKey,
      sshkey: sshKey,
    };

    console.log(newHostUser);
    mutate(newHostUser);
  };

  useEffect(() => {
    if (isSuccess) {
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
          type="text"
          label={t('createhostuserform.login.label')}
          value={login}
          placeholder={t('createhostuserform.defaultplaceholder')}
          onChange={(event) => {
            setLogin(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <InputField
          type="password"
          label={t('createhostuserform.password.label')}
          value={password}
          placeholder={t('createhostuserform.defaultplaceholder')}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <InputField
          type="text"
          label={t('createhostuserform.description.label')}
          value={description ? description : undefined}
          placeholder={t('createhostuserform.defaultplaceholder')}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
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
          checked={isUseSshKey}
          disabled={!isUseSshKey}
          type="text"
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
        {t('edit')}
      </Button>
    </form>
  );
};
