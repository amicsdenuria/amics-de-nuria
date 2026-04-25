'use client';

import { useEffect } from 'react';

const WIDGET_ID = process.env.LIGHTWIDGET_WIDGET_ID;
const LIGHTWIDGET_SCRIPT = 'https://cdn.lightwidget.com/widgets/lightwidget.js';

export function InstagramFeed() {
  useEffect(() => {
    // Load Lightwidget script
    const script = document.createElement('script');
    script.src = LIGHTWIDGET_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <iframe
        src={`//lightwidget.com/widgets/${WIDGET_ID}.html`}
        scrolling="no"
        className="lightwidget-widget w-full border-0 overflow-hidden"
        style={{
          width: '100%',
          border: 0,
          overflow: 'hidden',
        }}
      />
    </div>
  );
}
