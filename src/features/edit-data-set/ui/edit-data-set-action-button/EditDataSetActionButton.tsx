
import { type FC, useState, MouseEvent } from 'react';
import { EditDataSetForm } from '../..';
import { DataSet } from '@/entities/data-sets/api/dataSetsApi';
import { Button, Modal } from '@vtb/ui-kit3';

interface EditDataSetActionButtonProps {
  dataSet: DataSet;
}

export const EditDataSetActionButton: FC<EditDataSetActionButtonProps> = ({
  dataSet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <Button appearance="secondary"
        dimension="m"
        onClick={handleClick}>
        Изменить
      </Button>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <EditDataSetForm
            dataSet={dataSet}
            onSuccess={() => setIsOpen(false)}
            onError={() => setIsOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
