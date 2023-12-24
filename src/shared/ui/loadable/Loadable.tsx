import { ElementType, Suspense } from 'react';
import { FullPageWrapper } from '../full-page-wrapper';
import Loader from '../loader';

export function Loadable(Component: ElementType) {
  return function fn(props: any) {
    return (
      <Suspense
        fallback={
          <FullPageWrapper>
            <Loader />
          </FullPageWrapper>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
