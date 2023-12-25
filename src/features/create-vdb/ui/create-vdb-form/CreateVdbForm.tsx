
import { useState, type FC, type MouseEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreateVdbData } from '@/shared/api/oraculus-api/OraculusApi';
import { useTranslation } from 'react-i18next';
import { useCreateVdb } from '../../api/createVdbApi';
import { useDbHosts } from '@/entities/db-hosts';
import { useDataSetSnapshots, useDataSets } from '@/entities/data-sets';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { useUsers } from '@/entities/users/api/usersApi';
import { Button, InputField, SearchSelectField, Option } from '@vtb/ui-kit3';

interface CreateVdbFormProps {
  onSuccess?: () => void;
  onError?: () => void;
  defaultDsId?: string;
  defaultSnapId?: string;
}

export const CreateVdbForm: FC<CreateVdbFormProps> = ({
  onSuccess,
  onError,
  defaultDsId,
  defaultSnapId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useCreateVdb(queryClient);

  const {
    data: dbHostsData,
    isLoading: isDbHostsLoading,
    isError: isDbHostsError,
  } = useDbHosts();

  const {
    data: dataSetsData,
    isLoading: isDataSetsLoading,
    isError: isDataSetsError,
  } = useDataSets();

  const [vdbName, setVdbName] = useState<string>();
  const [hostId, setHostId] = useState<string>('');
  const [dbPort, setDbPort] = useState<number>();
  const [dsId, setDsId] = useState<string | undefined>(defaultDsId);
  const [snapId, setSnapId] = useState<string | undefined>(defaultSnapId);
  const [selectedUser, setSelectedUser] = useState<string | undefined>('');


  const [vdbNameError, setVdbNameError] = useState<string>();
  const [hostIdError, setHostIdError] = useState<string>();
  const [dbPortError, setDbPortError] = useState<string>();
  const [dsIdError, setDsIdError] = useState<string>();
  const [snapIdError, setSnapIdError] = useState<string>();
  const [userError, setUserError] = useState<string>('');

  const {
    data: dsSnapshotsData,
    isLoading: isDsSnapshotsLoading,
    isError: isDsSnapshotsError,
  } = useDataSetSnapshots(dsId);

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsers();

  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (!vdbName || !hostId || !dbPort || !dsId || !snapId || !selectedUser) {
      console.error('form fields not valid');
      if (!vdbName) setVdbNameError(t('createvdbform.vdbname.empty'));
      if (!hostId) setHostIdError(t('createvdbform.host.empty'));
      if (!dbPort) setDbPortError(t('createvdbform.dbport.empty'));
      if (!dsId) setDsIdError(t('createvdbform.dataset.empty'));
      if (!snapId) setSnapIdError(t('createvdbform.snapshot.empty'));
      if (!selectedUser) setUserError(t('createvdbform.user.empty'));
      return;
    }
    setVdbNameError('');
    setHostIdError('');
    setDbPortError('');
    setDsIdError('');
    setSnapIdError('');
    setUserError('');

    const vdb: CreateVdbData = {
      vdbname: vdbName,
      hostid: hostId,
      dbport: dbPort,
      dsid: dsId,
      snapid: snapId,
      vdbpath: '',
      ownerid: selectedUser,
    };

    mutate(vdb);
  };

  useEffect(() => {
    if (isSuccess) {
      setVdbName(undefined);
      setHostId('');
      setDbPort(undefined);
      setDsId('');
      setSnapId(undefined);
      setSelectedUser('');
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
          label={t('createvdbform.vdbname.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{vdbNameError ? vdbNameError : ''}</span>}
          value={vdbName}
          placeholder={t('createvdbform.defaultplaceholder')}
          onChange={(event) => {
            setVdbName(event.currentTarget.value);
            setVdbNameError('');
          }}
        />
      </div>
      <div style={{width: "auto", height: "1px", flexShrink: 0, background: "var(--Neutral-Neutral-20, #D5D8DE)", marginTop: "12px", marginBottom: "12px"}}></div>
      <div>
        {isDbHostsError || isDbHostsLoading ? (
          <>loading...</>
        ) : (
          <SearchSelectField
            label={t('createvdbform.host.label')}
            value={hostId}
            placeholder={t('createvdbform.host.hint')}
            onChange={(event) => {
              setHostId(event.currentTarget.value);
              setHostIdError('');
            }}>
            {dbHostsData.map((dbHost) => (
              <Option key={dbHost.id} value={dbHost.id}>
                {dbHost.host_name}
              </Option>
            ))}
          </SearchSelectField>
        )}
        {hostIdError && <span className="mt-1 text-sm text-red-400">{hostIdError}</span>}
      </div>

      <div>
        <InputField
          label={t('createvdbform.dbport.label')}
          type="number"
          extraText={<span className="mt-1 text-sm text-red-400">{dbPortError ? dbPortError : ''}</span>}
          value={dbPort}
          placeholder={t('createvdbform.defaultplaceholder')}
          onChange={(event) => {
            setDbPort(parseInt(event.currentTarget.value));
            setDbPortError('');
          }}
        />
      </div>

      <div>
        {isDataSetsError || isDataSetsLoading ? (
          <>loading...</>
        ) : (
          <SearchSelectField
            label={t('createvdbform.dataset.label')}
            value={dsId}
            placeholder={t('createvdbform.dataset.hint')}
            onChange={(event) => {
              setDsId(event.currentTarget.value);
              setDsIdError('');
            }}>
            {dataSetsData.map((dataSet) => (
              <Option key={dataSet.id} value={dataSet.id}>
                {dataSet.dsname}
              </Option>
            ))}
          </SearchSelectField>
        )}
        {dsIdError && <span className="mt-1 text-sm text-red-400">{dsIdError}</span>}
      </div>

      <div>
        <SearchSelectField
          label={t('createvdbform.snapshot.label')}
          value={snapId}
          disabled={!dsId}
          placeholder={t('createvdbform.snapshot.hint')}
          onChange={(event) => {
            setSnapId(event.currentTarget.value);
            setSnapIdError('');
          }}>
          {isDsSnapshotsLoading ? (
            <>loading...</>
          ) : isDsSnapshotsError ? (
            <>error</>
          ) : (
            dsSnapshotsData.map((snapshot) => (
              <Option value={snapshot.id} key={snapshot.id}>
                {snapshot.sname}
              </Option>
            ))
          )}
        </SearchSelectField>
        {snapIdError && <span className="mt-1 text-sm text-red-400">{snapIdError}</span>}
      </div>
      <div>

        <SearchSelectField
          label={t('createvdbform.user.label')}
          value={selectedUser}
          placeholder={t('createvdbform.user.hint')}
          onChange={(event) => {
            setSelectedUser(event.currentTarget.value);
            setUserError('');
          }}>

          {isUsersLoading ? (
            <>loading...</>
          ) : isUsersError ? (
            <>error </>
          ) : (
            usersData.filter((user) => user.user_type === 'user')
              .map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.full_name}
                </Option>
              ))
          )}
        </SearchSelectField>
        {userError && <span className="mt-1 text-sm text-red-400">{userError}</span>}
      </div>
      <Button onClick={handleCreate} style={{borderRadius: "4px", width: "124px", height: "40px"}}>
        {t('create')}
      </Button>
    </form>
  );
};
