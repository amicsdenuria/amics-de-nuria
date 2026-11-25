import PageContainer from '@/components/ui/page-container';
import PrimaryPageHero from '../components/PrimaryPageHero';
import WhatsAppButton from '@/components/WhatsAppButton';
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
        <div className="mb-12 relative flex flex-col md:grid grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h2 className="text-muted-foreground">
              {contactInfo.info.email.label}
            </h2>
            <p className="text-lg">{contactInfo.info.email.value}</p>
          </div>
          <div className="hidden md:block absolute bg-linear-to-b from-transparent via-border to-transparent h-12 border inset-x-1/2 -translate-x-1/2" />
          <div className="text-center md:text-left">
            <h2 className="text-muted-foreground">
              {contactInfo.info.phone.label}
            </h2>
            <p className="text-lg">{contactInfo.info.phone.value}</p>
          </div>
        </div>
        <section
          aria-labelledby="contacta-whatsapp"
          className="mx-auto flex max-w-md flex-col items-center gap-4 border-t border-border pt-8 text-center"
        >
          <h2 id="contacta-whatsapp" className="text-muted-foreground">
            WhatsApp
          </h2>
          <WhatsAppButton variant="inline" />
        </section>
      </PageContainer>
    </>
  );
};

export default ContactaPage;
