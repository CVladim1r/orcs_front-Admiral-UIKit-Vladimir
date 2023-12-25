import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateDataSetSnapshot } from '../..';
import { CreateDataSetSnapshotData } from '@/shared/api/oraculus-api/OraculusApi';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField } from '@vtb/ui-kit3';

interface CreateDataSetSnapshotFormProps {
  dataset: string;
  onSuccess: () => void;
  onError: () => void;
}

export const CreateDataSetSnapshotForm: FC<CreateDataSetSnapshotFormProps> = ({
  dataset,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError } = useCreateDataSetSnapshot(queryClient, dataset);

  const [DataSetSnapshotName, setDataSetName] = useState<string>();

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    if (!DataSetSnapshotName) {
      console.error('form fields not valid');
      return;
    }

    const newDataSet: CreateDataSetSnapshotData = {
      dataset: dataset,
      snapname: DataSetSnapshotName,
    };
    console.log(newDataSet);
    mutate(newDataSet);
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
          label={t('createvdbsnapshotform.snapshotname.label')}
          type="text"
          value={DataSetSnapshotName}
          placeholder={t('createvdbsnapshotform.defaultplaceholder')}
          onChange={(event) => {
            setDataSetName(event.currentTarget.value);
          }}
        />
      </div>
      <Button onClick={handleSubmit} style={{borderRadius: "4px", width: "124px", height: "40px"}}>
        {t('create')}
      </Button>
    </form>
  );
};
