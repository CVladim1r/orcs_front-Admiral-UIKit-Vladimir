import { useState, type FC, type MouseEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreateDataSetByReplData } from '@/shared/api/oraculus-api/OraculusApi';
import { useTranslation } from 'react-i18next';
import { useDbHosts } from '@/entities/db-hosts';
import { useCreateDataSetByRepl } from '../..';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField, SearchSelectField, Option } from '@vtb/ui-kit3';

interface CreateDataSetByReplFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const CreateDataSetByReplForm: FC<CreateDataSetByReplFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } =
    useCreateDataSetByRepl(queryClient);
  const [dsName, setDsName] = useState<string>();
  const [srcHost, setSrcHost] = useState<string>('');
  const [description, setDescription] = useState<string>();
  const [replUser, setReplUser] = useState<string>();
  const [replUserPwd, setReplUserPwd] = useState<string>();

  const [dsNameError, setDsNameError] = useState<string>('');
  const [srcHostError, setSrcHostError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [replUserError, setReplUserError] = useState<string>('');
  const [replUserPwdError, setReplUserPwdError] = useState<string>('');

  const {
    data,
    isLoading: isDbHostsLoading,
    isError: isDbHostsError,
  } = useDbHosts();

  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (!dsName || !srcHost || !replUser || !replUserPwd) {
      console.error('form fields not valid');
      if (!dsName) setDsNameError(t('createdatasetbyreplform.dsname.empty'));
      if (!srcHost) setSrcHostError(t('createdatasetbyreplform.srchost.empty'));
      if (!description) setDescriptionError(t('createdatasetbyreplform.description.empty'));
      if (!replUser) setReplUserError(t('createdatasetbyreplform.repluser.empty'));
      if (!replUserPwd) setReplUserPwdError(t('createdatasetbyreplform.repluserpwd.empty'));
      return;

    }

    setDsNameError('');
    setSrcHostError('');
    setReplUserError('');
    setReplUserPwdError('');


    const dataSet: CreateDataSetByReplData = {
      ds_name: dsName,
      src_host: srcHost,
      repl_user: replUser,
      repl_user_pwd: replUserPwd,
    };

    mutate(dataSet);
  };

  useEffect(() => {
    if (isSuccess) {
      setDsName(undefined);
      setSrcHost('');
      setReplUser(undefined);
      setReplUserPwd(undefined);
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
          label={t('createdatasetbyreplform.dsname.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{dsNameError ? dsNameError : ''}</span>}
          value={dsName}
          placeholder={t('createdatasetbyreplform.defaultplaceholder')}
          onChange={(event) => {
            setDsName(event.currentTarget.value);
            setDsNameError('');
          }}
        />
      </div>
      <div>
        {isDbHostsError || isDbHostsLoading ? (
          <>loading...</>
        ) : (
          <SearchSelectField
            label={t('createdatasetbyreplform.srchost.label')}
            value={srcHost}
            placeholder={t('createdatasetbyreplform.srchost.hint')}
            onChange={(event) => {
              setSrcHost(event.currentTarget.value);
              setSrcHostError('');
            }}>
            {data.map((dbHost) => (
              <Option key={dbHost.id} value={dbHost.host_name}> {dbHost.host_name}</Option>
            ))}
          </SearchSelectField>
        )}
        {srcHostError && <span className="mt-1 text-sm text-red-400">{srcHostError}</span>}
      </div>
      <div>
        <InputField
          label={t('createdatasetbyreplform.description.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{descriptionError ? descriptionError : ''}</span>}
          value={dsName}
          placeholder={t('createdatasetbyreplform.defaultplaceholder')}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
            setDescriptionError('');
          }}
        />
      </div>
      <div style={{width: "auto", height: "1px", flexShrink: 0, background: "var(--Neutral-Neutral-20, #D5D8DE)", marginTop: "12px", marginBottom: "12px"}}></div>
      <div>
        <InputField
          label={t('createdatasetbyreplform.repluser.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{dsNameError ? replUserError : ''}</span>}
          placeholder={t('createdatasetbyreplform.defaultplaceholder')}
          value={replUser}
          onChange={(event) => {
            setReplUser(event.currentTarget.value);
            setReplUserError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdatasetbyreplform.repluserpwd.label')}
          type="password"
          extraText={<span className="mt-1 text-sm text-red-400">{replUserPwdError ? replUserPwdError : ''}</span>}
          placeholder={t('createdatasetbyreplform.defaultplaceholder')}
          value={replUserPwd}
          onChange={(event) => {
            setReplUserPwd(event.currentTarget.value);
            setReplUserPwdError('');
          }}
        />
      </div>
      <Button onClick={handleCreate} style={{borderRadius: "4px", width: "124px", height: "40px"}}>
        {t('create')}
      </Button>
    </form>
  );
};
