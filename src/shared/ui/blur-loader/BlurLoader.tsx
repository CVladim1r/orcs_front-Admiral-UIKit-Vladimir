import type { FC } from 'react';
import Loader from '../loader';

interface BlurLoaderProps {}

export const BlurLoader: FC<BlurLoaderProps> = ({}) => {
  return (
    <div className="backdrop-blur-sm w-full h-full absolute top-0 right-0 flex justify-center items-center">
      <Loader />
    </div>
  );
};
