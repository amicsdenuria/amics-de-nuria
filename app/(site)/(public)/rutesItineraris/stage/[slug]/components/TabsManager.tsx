'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';

import { ReactNode } from 'react';

interface TabsManagerProps {
  paramName: string;
  defaultValue: string;
  sectionId: string;
  tabs: Array<{
    value: string;
    label: string;
    icon: ReactNode;
  }>;
  children: ReactNode;
}

export const TabsManager = ({
  paramName,
  defaultValue,
  sectionId,
  tabs,
  children,
}: TabsManagerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramName) ?? defaultValue;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, value);
    router.replace(`?${params.toString()}`, { scroll: false });

    // Scroll a la sección después de un micro delay
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  return (
    <Tabs
      value={currentValue}
      onValueChange={handleTabChange}
    >
      {tabs.length > 1 && (
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      {children}
    </Tabs>
  );
};
