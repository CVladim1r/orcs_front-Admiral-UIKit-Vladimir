import { CreateDataSetByBcpForm } from '@/features/create-dataset-by-bcp';
import { CreateDataSetByReplForm } from '@/features/create-dataset-by-repl';
import { TabMenu } from '@vtb/ui-kit3';
import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateDataSetFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const CreateDataSetForm: FC<CreateDataSetFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [isCreateByRepl, setIsCreateByRepl] = useState(false);
  const { t } = useTranslation();

  const tabs = [
    {
      id: 'bybackup',
      content: t('bybackup'),
    },
    {
      id: 'byrepl',
      content: t('byrepl'),
    },
  ];

  return (
    <>
      <TabMenu
        activeTab={isCreateByRepl ? 'byrepl' : 'bybackup'}
        onChange={(id) => setIsCreateByRepl(id === 'byrepl')}
        tabs={tabs}
        alignSelf="center"
      />
      {isCreateByRepl ? (
        <CreateDataSetByReplForm onSuccess={onSuccess} onError={onError} />
      ) : (
        <CreateDataSetByBcpForm onSuccess={onSuccess} onError={onError} />
      )}
    </>
  );
};
