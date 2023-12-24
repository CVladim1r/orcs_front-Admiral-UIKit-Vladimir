import type { FC } from 'react';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
  return <span className="loading loading-spinner loading-lg" />;
};
