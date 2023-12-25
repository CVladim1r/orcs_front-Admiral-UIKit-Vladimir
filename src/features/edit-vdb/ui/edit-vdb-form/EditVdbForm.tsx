import { Vdb } from '@/entities/vdbs/api/vdbsApi';
import { EdtiVdbData } from '@/shared/api/oraculus-api/OraculusApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditVdb } from '../..';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField } from '@vtb/ui-kit3';

interface EditVdbFormProps {
  vdb: Vdb;
  onSuccess?: () => void;
  onError?: () => void;
}

export const EditVdbForm: FC<EditVdbFormProps> = ({
  vdb,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useEditVdb(
    queryClient,
    vdb.id,
  );

  const [vdbName, setVdbName] = useState<string>(vdb.vdbname);
  const [dbPort, setDbPort] = useState<number>(vdb.dbport);

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    if (!vdbName || !dbPort) {
      console.error('form fields not valid');
      return;
    }

    const newVdb: EdtiVdbData = {
      id: vdb.id,
      vdbname: vdbName,
      dbport: dbPort,
    };
    console.log(newVdb);
    mutate(newVdb);
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
    <form className="flex flex-col w-full gap-5 form-control ml-3 mt-4 p-3">
      {isLoading ? <BlurLoader /> : null}
      <div>
      <InputField
          label={t('createvdbform.vdbname.label')}
          type="text"
          value={vdbName}
          placeholder={t('createvdbform.defaultplaceholder')}
          onChange={(event) => {
            setVdbName(event.currentTarget.value);
          }}
        />
      </div>
      <div>
      <InputField
          label={t('createvdbform.dbport.label')}
          type="number"
          value={dbPort}
          placeholder={t('createvdbform.defaultplaceholder')}
          onChange={(event) => {
            setDbPort(parseInt(event.currentTarget.value));
          }}
        />
      </div>
      <Button onClick={handleSubmit} style={{borderRadius: "4px", width: "124px", height: "40px"}}>
        {t('edit')}
      </Button>
    </form>
  );
};
