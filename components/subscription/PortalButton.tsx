'use client';

import { Button } from '../ui/button';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

const PortalButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenPortal = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/create-portal', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(
          "No s'ha pogut obrir el portal de modificació. Intenta-ho més tard",
        );
        setLoading(false);
        return;
      }

      window.open(data.url, '_blank');
    } catch (error) {
      console.error(error);
      setError(
        "No s'ha pogut obrir el portal de modificació. Intenta-ho més tard",
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 items-start">
      <Button
        onClick={handleOpenPortal}
        disabled={loading}
      >
        {loading && <Loader2Icon className="animate-spin h-4 w-4" />}
        Modifica la teva suscripció
      </Button>
      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  );
};

export default PortalButton;
