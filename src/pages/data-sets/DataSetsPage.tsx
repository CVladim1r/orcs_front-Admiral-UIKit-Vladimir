import { CreateVdbForm } from '@/features/create-vdb';
import { CreateDataSetForm } from '@/widgets/create-data-set-form';
import { DataSetsTable } from '@/widgets/data-sets-table';
import { Button, Modal } from '@vtb/ui-kit3';
import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';

export const DataSetsPage: FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVdb, setIsOpenVdb] = useState(false);

  return (
    <>
       <div className='overflow-x-auto w-full h-full flex flex-col'>
        <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '1250px', paddingBottom: "30px", paddingTop: "30px"}}>
          <h1 style={{fontFamily: "VTB Group UI",fontWeight: "550", fontStyle: "normal", fontSize: "28px", color: "var(--light-web-text-primary, #2B313B)", }} className="text-2xl font-semibold text-center">
            {t('datasets')}
          </h1>
          <Button 
            appearance = 'primary'
            dimension = 's'
            id="createUserButton"
            className="overflow-x-auto h-4 text-2xl font-semibold text-blue-900 text-center bg-[]" 
            onClick={() => setIsOpen(true)}
            >
            {t('createdataset')}
          </Button>
        </div>
        
        <div style={{borderRadius: '6px', maxWidth: '1250px'}} className="flex overflow-x-auto flex-col items-center gap-10 bg-[#FFFFFF]">
          <div style={{ width: '100%'}} className="overflow-x-auto">
            <DataSetsTable/>
          </div>
        </div>
      
        {isOpen ? (
          <Modal onClose={() => setIsOpen(false)}>
            <CreateDataSetForm
              onSuccess={() => setIsOpen(false)}
              onError={() => setIsOpen(false)}
            />
          </Modal>
        ) : null}
        {isOpenVdb ? (
          <Modal onClose={() => setIsOpenVdb(false)}>
            <CreateVdbForm
              onSuccess={() => setIsOpenVdb(false)}
              onError={() => setIsOpenVdb(false)}
            />
          </Modal>
        ) : null}
      </div>
    </>
  );
};
