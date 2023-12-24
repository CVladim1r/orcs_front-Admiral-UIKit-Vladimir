import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC, useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateVdbSnapshot } from '../..';
import { CreateVdbSnapshotData } from '@/shared/api/oraculus-api/OraculusApi';
import { BlurLoader } from '@/shared/ui/blur-loader';
import { Button, InputField } from '@vtb/ui-kit3';

interface CreateVdbSnapshotFormProps {
  vdbId: string;
  onSuccess: () => void;
  onError: () => void;
}

export const CreateVdbSnapshotForm: FC<CreateVdbSnapshotFormProps> = ({
  vdbId,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError } = useCreateVdbSnapshot(queryClient, vdbId);

  const [vdbSnapshotName, setVdbName] = useState<string>();

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    if (!vdbSnapshotName) {
      console.error('form fields not valid');
      return;
    }

    const newVdb: CreateVdbSnapshotData = {
      vdbId: vdbId,
      snapname: vdbSnapshotName,
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
    <form className="flex flex-col w-full gap-3 form-control pl-2">
     {isLoading ? <BlurLoader /> : null}
      <div>
      <InputField
          label= {t('createvdbsnapshotform.snapshotname.label')}
          type="text"
          value={vdbSnapshotName}
          placeholder={t('createvdbsnapshotform.defaultplaceholder')}
          onChange={(event) => {
            setVdbName(event.currentTarget.value);
          }}
        />
        </div>
      <Button onClick={handleSubmit}>
        {t('create')}
      </Button>
    </form>
  );
};
