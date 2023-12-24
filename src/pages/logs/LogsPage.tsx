import { useLogs } from '@/entities/logs/api/logsApi';
import Loader from '@/shared/ui/loader';
import type { FC } from 'react';

export const LogsPage: FC = ({}) => {
  const { data, isLoading, isError } = useLogs();

  if (isLoading) return <Loader />;
  if (isError) return <>error</>;

  return (
    
    <div className='overflow-x-auto w-full h-full flex flex-col'>
      <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '1250px', paddingBottom: "30px", paddingTop: "30px"}}>
        <h1 style={{fontFamily: "VTB Group UI",fontWeight: "550", fontStyle: "normal", fontSize: "28px", color: "var(--light-web-text-primary, #2B313B)", }} className="text-2xl font-semibold text-center">
          LOG
        </h1>
      </div>
      <div style={{borderRadius: '6px'}} className="flex overflow-x-auto flex-col items-center bg-[#FFFFFF] gap-10 p-4">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full overflow-y-scroll">
            {data.map((log) => (
              <pre key={log} className="max-w-1/2">
                {log}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
