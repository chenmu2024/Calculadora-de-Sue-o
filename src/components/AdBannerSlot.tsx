import React, { useEffect } from 'react';
import { Info } from 'lucide-react';

interface AdBannerSlotProps {
  slotType?: 'leaderboard' | 'rectangle' | 'mobile' | 'responsive';
  adClient?: string; // e.g. "ca-pub-0000000000000000"
  adSlot?: string;
  className?: string;
}

export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  slotType = 'responsive',
  adClient,
  adSlot,
  className = ''
}) => {
  // If no active AdSense ID or slot is provided, do not render any empty placeholder box
  if (!adClient || !adSlot) {
    return null;
  }

  useEffect(() => {
    // Attempt to trigger Google AdSense script push if adClient is present
    if (adClient && adSlot && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignore iframe or adblock errors gracefully
      }
    }
  }, [adClient, adSlot]);

  // Dimension classes based on ad format
  const formatClasses = {
    leaderboard: 'w-full max-w-[728px] h-[90px]',
    rectangle: 'w-full max-w-[300px] sm:max-w-[336px] h-[250px] sm:h-[280px]',
    mobile: 'w-full max-w-[320px] h-[100px]',
    responsive: 'w-full min-h-[90px] sm:min-h-[120px]'
  };

  return (
    <div className={`my-6 flex flex-col items-center justify-center text-center ${className}`}>
      {/* Required Ad Label for Google Policy */}
      <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
        <span>Anuncio / Publicidad</span>
        <Info className="w-3 h-3 text-slate-600" />
      </div>

      <div className={`bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-center justify-center p-3 text-slate-500 text-xs overflow-hidden ${formatClasses[slotType]}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
