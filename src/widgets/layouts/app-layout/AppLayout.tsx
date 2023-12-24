import { useState, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/widgets/sidebar';
import Header from '../header';
import { Button } from '@/shared/ui/button';
import { LogsView } from '@/entities/logs';
import { ReactComponent as DescriptionOutline } from '@openvtb/admiral-icons/build/documents/DescriptionOutline.svg';

export const AppLayout: FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleLogButton = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const currentUser = {
    username: 'theUser444'
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full">
        <Header currentUser={currentUser}/>
        <div className={`flex w-full h-[calc(100vh_-_64px)]`}>
          <Sidebar />
          <div
            className={`p-10 w-full ${isPanelOpen ? 'h-[calc(100%_-_240px)]' : 'h-full'
              }`}
          >
            <Outlet />
            {isPanelOpen ? (
              <div className="w-full h-64 bg-base-300 absolute bottom-0 left-0 overflow-auto">
                <LogsView />
              </div>
            ) : null}
          </div>
        </div>
        <Button
          onClick={handleLogButton}
          className="absolute bottom-1 right-1 z-30"
        >
          <DescriptionOutline style={{ width: '30px' }} />
        </Button>
      </div>
    </>
  );
};
