import { DbHost } from '@/entities/db-hosts/api/dbHostsApi';
import { useHostUsers } from '@/entities/host-users';
import { EditDbHostData } from '@/shared/api/oraculus-api/OraculusApi';

import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditDbHost } from '../..';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { InputField, SearchSelectField, Option, Label, Toggle, Button } from '@vtb/ui-kit3';

interface EditDbHostFormProps {
  dbhost: DbHost;
  onSuccess?: () => void;
  onError?: () => void;
}

export const EditDbHostForm: FC<EditDbHostFormProps> = ({
  dbhost,
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

  const { mutate, isSuccess, isLoading, isError } = useEditDbHost(
    queryClient,
    dbhost.id,
  );

  const [hostName, setHostName] = useState<string>(dbhost.host_name);
  const [hostDesc, setHostDesc] = useState<string | undefined>(
    dbhost.host_desc,
  );
  const [sshPort, setSshPort] = useState<number>(); //FIX_API
  const [dbPath, setDbPath] = useState<string>(dbhost.db_path);
  const [dbPort, setDbPort] = useState<number>(); //FIX_API
  const [dbType, setDbType] = useState<string>(dbhost.db_type);
  const [dbOsUser, setDbOsUser] = useState<string>(dbhost.db_os_user);
  const [isVirtual, setIsVirtual] = useState<boolean>(dbhost.is_virtual);
  const [hostUserId, setHostUserId] = useState<string>(dbhost.host_user_id);

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
      return;
    }

    const newDbHost: EditDbHostData = {
      id: dbhost.id,
      host_name: hostName,
      host_desc: hostDesc,
      ssh_port: sshPort,
      db_path: dbPath,
      db_port: dbPort,
      db_type: dbType,
      db_os_user: dbOsUser,
      is_virtual: isVirtual,
      host_user_id: hostUserId,
    };

    console.log(newDbHost);
    mutate(newDbHost);
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
    <form className="flex flex-col w-full gap-3 form-control mt-4">
      {isLoading ? <BlurLoader /> : null}
      <div>
        <InputField
          label={t('createdbhostform.hostname.label')}
          type="text"
          value={hostName}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setHostName(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdbhostform.hostdesc.label')}
          type="text"
          value={hostDesc}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setHostDesc(event.currentTarget.value);
          }}
        />
      </div>
      <div style={{width: "auto", height: "1px", flexShrink: 0, background: "var(--Neutral-Neutral-20, #D5D8DE)", marginTop: "12px", marginBottom: "12px"}}></div>
      <div>
        <InputField
          label={t('createdbhostform.sshport.label')}
          type="number"
          value={sshPort}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setSshPort(parseInt(event.currentTarget.value));
          }}
        />

      </div>
      <div>
        <InputField
          label={t('createdbhostform.dbpath.label')}
          type="text"
          value={dbPath}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setDbPath(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <InputField
          label={t('createdbhostform.dbport.label')}
          type="number"
          value={dbPort}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setDbPort(parseInt(event.currentTarget.value));
          }}
        />
      </div>
      <div>
        <SearchSelectField
          label={t('createdbhostform.dbtype.label')}
          value={dbType}
          onChange={(event) => {
            setDbType(event.currentTarget.value);
          }}>
          <Option value={''}>{t('createdbhostform.dbtype.hint')}</Option>
          <Option value="postgresql">PostgreSQL</Option>
          <Option value="clickhouse">ClickHouse</Option>
        </SearchSelectField>
      </div>
      <div>
        <InputField
          label={t('createdbhostform.dbosuser.label')}
          type="text"
          value={dbOsUser}
          placeholder={t('createdbhostform.defaultplaceholder')}
          onChange={(event) => {
            setDbOsUser(event.currentTarget.value);
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
            }}>
            <Option value={''}>{t('createdbhostform.hostuser.hint')}</Option>
            {hostUsersData.map((user) => (
              <Option key={user.id} value={user.id}> {user.login}
                {user.description ? ` - ${user.description}` : null}</Option>
            ))}
          </SearchSelectField>
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
        {t('edit')}
      </Button>
    </form>
  );
};
