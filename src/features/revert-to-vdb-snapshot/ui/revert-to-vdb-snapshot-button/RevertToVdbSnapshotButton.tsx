import { VdbSnapshot } from '@/entities/vdbs/api/vdbSnapshotsApi';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FC } from 'react';
import { useRevertToVdbSnapshot } from '../..';
import { Button, Modal } from '@vtb/ui-kit3';
import blue from '@/shared/assets/blue.svg';

interface RevertToVdbSnapshotButtonProps {
  vdbId: string;
  snapshot: VdbSnapshot;
}

const buttonStyle = {
  opacity: 1,
  fontWeight: 400,
  lineHeight: '16px',
  fontSize: '14px',
  color: '#2b313b',
};
/**         <img src={green}></img>*/
/**         <Button onClick={() => setIsOpen(false)} appearance = 'ghost'>Отмена</Button> */

export const RevertToVdbSnapshotButton: FC<RevertToVdbSnapshotButtonProps> = ({
  vdbId,
  snapshot,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useRevertToVdbSnapshot(queryClient, vdbId);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (saveState: boolean) => {
    mutate({ vdbId, snapname: snapshot.id, saveState });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        appearance="ghost"
        dimension="s"
        style={buttonStyle}
      >
        <img src={blue} alt="" />
        Перейти
      </Button>
      {isOpen ?
        <Modal onClose={() => setIsOpen(false)}>
          <div style={{paddingLeft: "24px", paddingTop: "10px"}}>
            <div> Сохранить текущее состояние?</div>
            <div className="flex justify-end gap-3" style={{paddingTop: "20px"}}>
              <Button onClick={() => handleClick(true)} appearance = 'ghost'>Да</Button>
              <Button onClick={() => handleClick(false)} appearance = 'ghost'>Нет</Button>
            </div>
          </div>
        </Modal>
        : null}
    </>
  );
};
