'use client';

import { CheckIcon, Link2Icon } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CopyLinkButtonProps {
  hash?: string;
}

const CopyLinkButton = ({ hash }: CopyLinkButtonProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = new URL(window.location.origin);
    url.pathname = pathname;
    url.search = searchParams.toString();

    if (hash) {
      url.hash = hash.startsWith('#') ? hash : `#${hash}`;
    }

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el enlace:', err);
    }
  };

  return (
    <Button
      variant={'ghost'}
      size={'icon-sm'}
      onClick={handleCopyLink}
      className="ml-4"
      title={copied ? 'Copiado!' : 'Copiar enlace'}
    >
      {copied ? <CheckIcon className="text-green-500" /> : <Link2Icon />}
    </Button>
  );
};

export default CopyLinkButton;
