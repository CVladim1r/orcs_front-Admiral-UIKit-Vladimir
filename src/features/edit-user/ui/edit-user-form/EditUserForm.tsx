import { SystemUser } from '@/entities/users/api/usersApi';
import { EditUserData } from '@/shared/api/oraculus-api/OraculusApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditUser } from '../..';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField, SearchSelectField, Option } from '@vtb/ui-kit3';

interface EditUserFormProps {
  user: SystemUser;
  onSuccess?: () => void;
  onError?: () => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({
  user,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useEditUser(
    queryClient,
    user.id,
  );
  const [login, setLogin] = useState<string | undefined>(user.login);
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>(user.email);
  const [fullName, setFullName] = useState<string | undefined>(user.full_name);
  const [userType, setUserType] = useState<string | undefined>(user.user_type);

  const handleEdit = (event: MouseEvent) => {
    event.preventDefault();
    if (!login || !password || !fullName || !email || !userType) {
      console.error('Create user form fields not valid');
      return;
    }

    const newUser: EditUserData = {
      id: user.id,
      login,
      pwd: password,
      full_name: fullName,
      email,
      user_type: userType,
      user_locked: false,
      use_ldap: false,
    };
    console.log(newUser);
    mutate(newUser);
  };

  useEffect(() => {
    if (isSuccess) {
      setLogin(undefined);
      setPassword(undefined);
      setEmail(undefined);
      setFullName(undefined);
      setUserType(undefined);
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
          type="text"
          label={t('createuserform.login.label')}
          value={login}
          placeholder={t('createuserform.defaultplaceholder')}
          onChange={(event) => {
            setLogin(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <InputField
          type="text"
          label={t('createuserform.password.label')}
          value={password}
          placeholder={t('createuserform.defaultplaceholder')}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </div>
      <div style={{width: "auto", height: "1px", flexShrink: 0, background: "var(--Neutral-Neutral-20, #D5D8DE)", marginTop: "12px", marginBottom: "12px"}}></div>
      <div>
        <InputField
          type="text"
          label={t('createuserform.email.label')}
          value={email}
          placeholder={t('createuserform.defaultplaceholder')}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <InputField
          type="text"
          label={t('createuserform.fullname.label')}
          value={fullName}
          placeholder={t('createuserform.defaultplaceholder')}
          onChange={(event) => {
            setFullName(event.currentTarget.value);
          }}
        />
      </div>
      <div>

        <SearchSelectField
          label={t('createuserform.type.label')}
          value={userType}
          onChange={(event) => {
            setUserType(event.currentTarget.value);
          }}>
          <Option value={''}>{t('createuserform.type.hint')}</Option>
          <Option value="admin">
            {t('createuserform.type.variants.admin')}
          </Option>
          <Option value="user">{t('createuserform.type.variants.user')}</Option>
            
        </SearchSelectField>
      </div>
      <Button onClick={handleEdit} style={{borderRadius: "4px", width: "124px", height: "40px"}}>
        Сохранить
      </Button>
    </form>
  );
};
