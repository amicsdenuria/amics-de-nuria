import { ArrowLeftIcon } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';
import React from 'react';

interface BackLinkProps {
  href: string;
  title: string;
}

const BackLink = ({ title, href }: BackLinkProps) => {
  return (
    <Button
      asChild
      variant={'link'}
      className="text-lg mb-2"
    >
      <Link
        href={href}
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon />
        {title}
      </Link>
    </Button>
  );
};

export default BackLink;
