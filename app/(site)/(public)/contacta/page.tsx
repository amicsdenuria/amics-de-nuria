import { Button } from '@/components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import { contactaContent } from '@/content/contacta/contactaPage';

const ContactaPage = () => {
  const { home: contactInfo } = contactaContent;
  return (
    <>
      <PrimaryPageHero
        title={contactInfo.hero.title}
        description={contactInfo.hero.subtitle}
        img={contactInfo.hero.img}
      />
      <PageContainer className="py-16 md:py-24">
        <div className="mb-12 relative grid grid-cols-2 gap-8">
          <div className="text-right">
            <h2 className="text-muted-foreground">
              {contactInfo.info.email.label}
            </h2>
            <p className="text-lg">{contactInfo.info.email.value}</p>
          </div>
          <div className="absolute bg-linear-to-b from-transparent via-border to-transparent h-12 border inset-x-1/2 -translate-x-1/2" />
          <div>
            <h2 className="text-muted-foreground">
              {contactInfo.info.phone.label}
            </h2>
            <p className="text-lg">{contactInfo.info.phone.value}</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-muted-foreground">
            {contactInfo.info.web.label}
          </h2>
          <Button
            asChild
            variant={'ghost'}
            className="hover:text-primary-foreground transition-colors duration-100 text-lg"
          >
            <Link
              href={contactInfo.info.web.href ?? ''}
              className="flex gap-2 items-center"
              target="_blank"
            >
              {contactInfo.info.web.value}
              <ExternalLinkIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </PageContainer>
    </>
  );
};

export default ContactaPage;
