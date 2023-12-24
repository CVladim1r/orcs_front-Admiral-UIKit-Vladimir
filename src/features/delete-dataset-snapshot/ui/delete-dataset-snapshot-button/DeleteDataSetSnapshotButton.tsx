import { Button } from '@vtb/ui-kit3';
import type { FC } from 'react';
import red from '@/shared/assets/red-create.png';

interface DeleteDataSetSnapshotButtonProps { }

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};

export const DeleteDataSetSnapshotButton: FC<
  DeleteDataSetSnapshotButtonProps
> = ({ }) => {
  return (
    <Button
      appearance="ghost"
      dimension="s"
      style={buttonStyle}
      onClick={() => { }}>
      <img style={{opacity: 1}} src={red}></img>
      Удалить
    </Button>
  );
};
