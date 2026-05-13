import PrimaryPageHero from '../../components/PrimaryPageHero';
import TextBlock from '../../components/TextBlock';
import { notFound } from 'next/navigation';
import { santuariContent } from '@/content/santuari/santuariPage';

const LlarAmadeuPage = () => {
  // TODO pendent d'activar (llar amadeu) ACTIVAR LA DE BAIX
  const isActive = false;
  const { llarAmadeu } = santuariContent.pages;
  return !isActive ? (
    notFound()
  ) : (
    <>
      <PrimaryPageHero
        title={llarAmadeu.title}
        subtitle={llarAmadeu.intro}
        img={{
          src: '/santuari/vall-nuria-2.webp',
          alt: 'Vall de Núria',
          className: 'object-center',
        }}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {llarAmadeu.blocks.map((block, i) => (
              <TextBlock
                key={i}
                block={block}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// TODO pendent d'activar (llar amadeu)
// const LlarAmadeuPage = () => {
//   const { llarAmadeu } = santuariContent.pages;
//   return (
//     <>
//       <PrimaryPageHero
//         title={llarAmadeu.title}
//         subtitle={llarAmadeu.intro}
//         img={{
//           src: '/santuari/vall-nuria-2.webp',
//           alt: 'Vall de Núria',
//           className: 'object-center',
//         }}
//       />

//       <section className="py-16 md:py-24">
//         <div className="mx-auto max-w-3xl px-6">
//           <div className="space-y-12">
//             {llarAmadeu.blocks.map((block, i) => (
//               <TextBlock
//                 key={i}
//                 block={block}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

export default LlarAmadeuPage;
