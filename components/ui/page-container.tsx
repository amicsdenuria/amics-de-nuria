import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

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
