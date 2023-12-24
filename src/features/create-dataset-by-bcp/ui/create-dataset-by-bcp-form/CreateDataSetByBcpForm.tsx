
import { useState, type FC, type MouseEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreateDataSetByBcpData } from '@/shared/api/oraculus-api/OraculusApi';
import { useTranslation } from 'react-i18next';
import { useCreateDataSetByBcp } from '../..';
import { useDbHosts } from '@/entities/db-hosts';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { InputField, SearchSelectField, Option, Button} from '@vtb/ui-kit3';

interface CreateDataSetByBcpFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const CreateDataSetByBcpForm: FC<CreateDataSetByBcpFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } =
    useCreateDataSetByBcp(queryClient);
  const [dsName, setDsName] = useState<string>();
  const [srcHost, setSrcHost] = useState<string>('');
  const [description, setDescription] = useState<string>();
  const [remotePath, setRemotePath] = useState<string>();
  const [tableSpaceId, setTableSpaceId] = useState<string>('16386');




  const [dsNameError, setDsNameError] = useState<string>('');
  const [srcHostError, setSrcHostError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [remotePathError, setRemotePathError] = useState<string>('');
  const [tableSpaceIdError, setTableSpaceIdError] = useState<string>('');

  const {
    data,
    isLoading: isDbHostsLoading,
    isError: isDbHostsError,
  } = useDbHosts();

  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (!dsName || !srcHost || !remotePath || !tableSpaceId) {
      console.error('form fields not valid');
      if (!dsName) setDsNameError(t('createdatasetbybcpform.dsname.empty'));
      if (!srcHost) setSrcHostError(t('createdatasetbybcpform.srchost.empty'));
      if (!description) setDescriptionError(t('createdatasetbybcpform.description.empty'));
      if (!remotePath) setRemotePathError(t('createdatasetbybcpform.remotepath.empty'));
      if (!tableSpaceId) setTableSpaceIdError(t('createdatasetbybcpform.tablespaceid.empty'));
      return;
    }

    setDsNameError('');
    setSrcHostError('');
    setRemotePathError('');
    setTableSpaceIdError('');

    const dataSet: CreateDataSetByBcpData = {
      ds_name: dsName,
      src_host: srcHost,
      remote_path: remotePath,
      table_space_id: tableSpaceId,
    };

    mutate(dataSet);
  };

  useEffect(() => {
    if (isSuccess) {
      setDsName("");
      setSrcHost("");
      setRemotePath("");
      setTableSpaceId('16386');
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
          label={t('createdatasetbybcpform.dsname.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{dsNameError ? dsNameError : ''}</span>}
          value={dsName}
          placeholder={t('createdatasetbybcpform.defaultplaceholder')}
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
          label={t('createdatasetbybcpform.srchost.label')}
          value={srcHost}
          onChange={(event) => {
            setSrcHost(event.currentTarget.value);
            setSrcHostError('');
          }}>
          <Option value={''}>{t('createdatasetbybcpform.srchost.hint')}</Option>
          {data.map((dbHost) => (
              <Option key={dbHost.id} value={dbHost.id}>
                {dbHost.host_name}
              </Option>
            ))}
        </SearchSelectField>

        )}
        {srcHostError && <span className="mt-1 text-sm text-red-400">{srcHostError}</span>}
      </div>
      <div>
        <InputField
          label={t('createdatasetbybcpform.description.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{descriptionError ? descriptionError : ''}</span>}
          value={description}
          placeholder={t('createdatasetbybcpform.defaultplaceholder')}
          onChange={(event) => {
            setDescription(event.currentTarget.value);
            setDescriptionError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdatasetbybcpform.remotepath.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{remotePathError ? remotePathError : ''}</span>}
          value={remotePath}
          placeholder={t('createdatasetbybcpform.defaultplaceholder')}
          onChange={(event) => {
            setRemotePath(event.currentTarget.value);
            setRemotePathError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdatasetbybcpform.tablespaceid.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{tableSpaceIdError ? tableSpaceIdError : ''}</span>}
          value={tableSpaceId}
          placeholder={t('createdatasetbybcpform.defaultplaceholder')}
          onChange={(event) => {
            setTableSpaceId(event.currentTarget.value);
            setTableSpaceIdError('');
          }}
        />
      </div>
      <Button onClick={handleCreate}>
        {t('create')}
      </Button>
    </form>
  );
};
