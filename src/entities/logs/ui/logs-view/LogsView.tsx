import Loader from '@/shared/ui/loader';
import type { FC } from 'react';
import { useLogs } from '../..';
import { Button } from '@/shared/ui/button';
import { ReactComponent as UpdateOutline } from '@openvtb/admiral-icons/build/system/UpdateOutline.svg';

interface LogsViewProps { }

export const LogsView: FC<LogsViewProps> = ({ }) => {
  const { data, isLoading, isError, refetch } = useLogs();

  if (isLoading) return <Loader />;
  if (isError) return <>error</>;

  return (
    <div className="flex relative p-1 w-full">
      <Button onClick={() => refetch()} className="absolute top-1 right-1">
        <UpdateOutline style={{ width: '30px' }} />
      </Button>
      <div className="h-60 overflow-y-scroll w-full">
        {data.map((log) => (
          <pre>{log}</pre>
        ))}
      </div>
    </div>
  );
};
