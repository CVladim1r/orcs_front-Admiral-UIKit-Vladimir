
import { type FC, useState, MouseEvent } from 'react';
import { EditDataSetForm } from '../..';
import { DataSet } from '@/entities/data-sets/api/dataSetsApi';
import { Button, Modal } from '@vtb/ui-kit3';
import green from '@/shared/assets/green-create.png'
interface EditDataSetActionButtonProps {
  dataSet: DataSet;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

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
      <Button appearance="ghost"
        dimension="s"
        onClick={handleClick}
        style={buttonStyle}
        >
        <img src={green} alt="" />
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
