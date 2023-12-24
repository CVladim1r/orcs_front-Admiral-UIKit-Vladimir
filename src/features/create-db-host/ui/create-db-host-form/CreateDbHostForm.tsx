
import { useState, type FC, type MouseEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CreateDbHostData } from '@/shared/api/oraculus-api/OraculusApi';
import { useCreateDbHost } from '../../api/createDbHostApi';
import { useHostUsers } from '@/entities/host-users';
import { useTranslation } from 'react-i18next';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField, Label, SearchSelectField, Toggle, Option } from '@vtb/ui-kit3';

interface CreateDbHostFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const CreateDbHostForm: FC<CreateDbHostFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    data: hostUsersData,
    isLoading: isHostUsersLoading,
    isError: isHostUsersError,
  } = useHostUsers();

  const { mutate, isSuccess, isLoading, isError } = useCreateDbHost(queryClient);

  const [hostName, setHostName] = useState<string>("");
  const [hostDesc, setHostDesc] = useState<string>("");
  const [sshPort, setSshPort] = useState<string>("0");
  const [dbPath, setDbPath] = useState<string>("");
  const [dbPort, setDbPort] = useState<string>("0");
  const [dbType, setDbType] = useState<string>("");
  const [dbOsUser, setDbOsUser] = useState<string>("");
  const [isVirtual, setIsVirtual] = useState<boolean>(false);
  const [hostUserId, setHostUserId] = useState<string>("");

  const [hostNameError, setHostNameError] = useState<string>("");
  const [hostDescError, setHostDescError] = useState<string>("");
  const [sshPortError, setSshPortError] = useState<string>("");
  const [dbPathError, setDbPathError] = useState<string>("");
  const [dbPortError, setDbPortError] = useState<string>("");
  const [dbTypeError, setDbTypeError] = useState<string>("");
  const [dbOsUserError, setDbOsUserError] = useState<string>("");
  const [hostUserIdError, setHostUserIdError] = useState<string>("");


  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (
      !hostName ||
      !hostDesc ||
      !hostDesc ||
      !dbPath ||
      !sshPort ||
      !dbPort ||
      !dbType ||
      !dbOsUser ||
      !hostUserId
    ) {
      console.error('Create host user form fields not valid');
      if (!hostName) setHostNameError(t('createdbhostform.hostname.empty'));
      if (!hostDesc) setHostDescError(t('createdbhostform.hostdesc.empty'));
      if (!sshPort) setSshPortError(t('createdbhostform.sshport.empty'));
      if (!dbPath) setDbPathError(t('createdbhostform.dbpath.empty'));

      if (!dbPort) setDbPortError(t('createdbhostform.dbport.empty'));
      if (!dbType) setDbTypeError(t('createdbhostform.dbtype.empty'));
      if (!dbOsUser) setDbOsUserError(t('createdbhostform.dbosuser.empty'));
      if (!hostUserId) setHostUserIdError(t('createdbhostform.hostuser.empty'));
      return;
    }
    setHostNameError('');
    setHostDescError('');
    setSshPortError('');
    setDbPathError('');
    setDbPortError('');
    setDbTypeError('');
    setDbOsUserError('');
    setHostUserIdError('');

    const dbHost: CreateDbHostData = {
      host_name: hostName,
      host_desc: hostDesc,
      ssh_port: +sshPort,
      db_path: dbPath,
      db_port: +dbPort,
      db_type: dbType,
      db_os_user: dbOsUser,
      is_virtual: isVirtual,
      host_user_id: hostUserId,
    };

    mutate(dbHost);
  };

  useEffect(() => {
    if (isSuccess) {
      setHostName("");
      setHostDesc("");
      setSshPort("0");
      setDbPath("");
      setDbPort("0");
      setDbType("");
      setDbOsUser("");
      setIsVirtual(false);
      setHostUserId("");

      if (onSuccess) onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (onError) onError();
    }
  }, [isError]);

  return (
    <form className="flex flex-col w-full gap-3 form-control  mt-4">
      {isLoading ? <BlurLoader /> : null}
      <div>
        <InputField
          label={t('createdbhostform.hostname.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{hostNameError ? hostNameError : ''}</span>}
          value={hostName}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setHostName(event.currentTarget.value);
            setHostNameError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdbhostform.hostdesc.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{hostDescError ? hostDescError : ''}</span>}
          value={hostDesc}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setHostDesc(event.currentTarget.value);
            setHostDescError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdbhostform.sshport.label')}
          type="number"
          extraText={<span className="mt-1 text-sm text-red-400">{sshPortError ? sshPortError : ''}</span>}
          value={sshPort}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            const value = event.currentTarget.value.trim(); // Удаляем пробелы в начале и конце строки
            if (value === '' || (parseInt(value, 10) >= 0)) {
              setSshPort(value);
              setSshPortError('');
            } else {
              setSshPortError(t('SSH Port должен быть больше 0'));
            }
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdbhostform.dbpath.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{dbPathError ? dbPathError : ''}</span>}
          value={dbPath}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setDbPath(event.currentTarget.value);
            setDbPathError('');
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdbhostform.dbport.label')}
          type="number"
          extraText={<span className="mt-1 text-sm text-red-400">{dbPortError ? dbPortError : ''}</span>}
          value={dbPort}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            const value = event.currentTarget.value.trim();
            if (value === '' || (parseInt(value, 10) >= 0)) {
              setDbPort(value);
              setDbPortError('');
            } else {
              setDbPortError(t('DB port должен быть больше 0'));
            }
          }}
        />
      </div>
      <div>
        <SearchSelectField
          label={t('createdbhostform.dbtype.label')}
          value={dbType}
          onChange={(event) => {
            setDbType(event.currentTarget.value);
            setDbTypeError('');
          }}>
          <Option value={''}>{t('createdbhostform.dbtype.hint')}</Option>
          <Option value="postgresql">PostgreSQL</Option>
          <Option value="clickhouse">ClickHouse</Option>
        </SearchSelectField>
        {dbTypeError && <span className="mt-1 text-sm text-red-400">{dbTypeError}</span>}
      </div>
      <div>
        <InputField
          label={t('createdbhostform.dbosuser.label')}
          type="text"
          extraText={<span className="mt-1 text-sm text-red-400">{dbOsUserError ? dbOsUserError : ''}</span>}
          value={dbOsUser}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setDbOsUser(event.currentTarget.value);
            setDbOsUserError('');
          }}
        />
      </div>
      {isHostUsersLoading || isHostUsersError ? (
        <>loading</>
      ) : (
        <div>
          <SearchSelectField
            label={t('createdbhostform.hostuser.label')}
            value={hostUserId}
            onChange={(event) => {
              setHostUserId(event.currentTarget.value);
              setHostUserIdError('');
            }}>
            <Option value={''}>{t('createdbhostform.hostuser.hint')}</Option>
            {hostUsersData.map((user) => (
              <Option key={user.id} value={user.id}> {user.login}
                {user.description ? ` - ${user.description}` : null}</Option>
            ))}
          </SearchSelectField>
          {hostUserIdError && <span className="mt-1 text-sm text-red-400">{hostUserIdError}</span>}
        </div>
      )}
      <div>
        <Label className="label cursor-pointer">
          {t('createdbhostform.isvirtual.label')}
          <Toggle
            type="checkbox"
            checked={isVirtual}
            onChange={() => {
              setIsVirtual((prev) => !prev);
            }}
          />
        </Label>
      </div>
      <Button onClick={handleCreate}>
        {t('create')}
      </Button>
    </form >
  );
};
