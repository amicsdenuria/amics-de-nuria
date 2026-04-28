import {
  TypoH2Var,
  TypoPVar,
  TypoSmall,
} from '@/components/ui/typo/typoComponents';

import { SocialLink } from '@/content/lliga-espiritual/lligaEspiritualPage';
import SocialLinkCard from './SocialLinkCard';

interface RRSSSectionProps {
  title: string;
  subtitle: string;
  own: SocialLink[];
  others: SocialLink[];
}

const RRSSSection = ({ title, subtitle, own, others }: RRSSSectionProps) => {
  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <TypoH2Var className="mb-4">{title}</TypoH2Var>
        <TypoPVar className="mx-auto">{subtitle}</TypoPVar>
      </div>

      {/* Main social links grid */}
      <div className="space-y-16">
        {/* Our social networks */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <TypoSmall className="uppercase tracking-wider font-medium text-foreground/70">
              Les nostres xarxes
            </TypoSmall>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {own.map((social) => (
              <SocialLinkCard
                key={social.href}
                label={social.label}
                subtitle={social.subtitle}
                href={social.href}
                icon={social.icon}
              />
            ))}
          </div>
        </div>

        {/* Other related links */}
        {others.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border" />
              <TypoSmall className="uppercase tracking-wider font-medium text-foreground/70">
                Enllaços d&apos;interès
              </TypoSmall>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((link) => (
                <SocialLinkCard
                  key={link.href}
                  label={link.label}
                  subtitle={link.subtitle}
                  href={link.href}
                  variant="secondary"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RRSSSection;
