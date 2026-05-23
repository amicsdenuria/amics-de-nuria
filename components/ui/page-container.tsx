import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn('container mx-auto px-4 sm:px-8 md:px-12', className)}>
      {children}
    </div>
  );
};
export default PageContainer;
