import { DataSet } from '@/entities/data-sets/api/dataSetsApi';
import { EditDataSetData } from '@/shared/api/oraculus-api/OraculusApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditDataSet } from '../..';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField } from '@vtb/ui-kit3';

interface EditDataSetFormProps {
  dataSet: DataSet;
  onSuccess: () => void;
  onError: () => void;
}

export const EditDataSetForm: FC<EditDataSetFormProps> = ({
  dataSet,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useEditDataSet(
    queryClient,
    dataSet.id,
  );
  const [dsName, setDsName] = useState<string | undefined>(dataSet.dsname);
  const [dsPort, setDsPort] = useState<number | undefined>(dataSet.dsport);

  const handleCreate = (event: MouseEvent) => {
    event.preventDefault();
    if (!dsName || !dsPort) {
      console.error('form fields not valid');
      return;
    }

    const newDataSet: EditDataSetData = {
      id: dataSet.id,
      dataset_name: dsName,
      dsport: dsPort,
    };

    console.log(newDataSet);

    mutate(newDataSet);
  };

  useEffect(() => {
    if (isSuccess) {
      setDsName(undefined);
      setDsPort(undefined);
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
          value={dsName}
          placeholder={t('createdatasetbyreplform.defaultplaceholder')}
          onChange={(event) => {
            setDsName(event.currentTarget.value);
          }}
        />
      </div>
      <div>
      <InputField
          label= {t('createdatasetbyreplform.dbport.label')}
          type="text"
          value={dsPort}
          placeholder={t('createdatasetbyreplform.defaultplaceholder')}
          onChange={(event) => {
            setDsPort(parseInt(event.currentTarget.value));
          }}
        />
      </div>
      <Button onClick={handleCreate} style={{borderRadius: "4px", width: "144px", height: "40px", paddingRight: "30px"}}>
        {t('edit')}
      </Button>
    </form>
  );
};
