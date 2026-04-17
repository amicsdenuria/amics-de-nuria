import Image from 'next/image';
import PageContainer from '@/components/ui/page-container';
import RouteHero from '../../components/RouteHero';
import { TypoP } from '@/components/ui/typo/typoComponents';
import { notFound } from 'next/navigation';
import { pois } from '@/data/pois';

export const dynamicParams = false;
export const generateStaticParams = async () =>
  pois.map((poi) => ({ poi: poi.id }));

interface RegionPageParams {
  params: Promise<{ poi: string }>;
}

const RegionPage = async ({ params }: RegionPageParams) => {
  const { poi: id } = await params;
  const poi = pois.find((poi) => poi.id === id);

  if (!poi) notFound();

  return (
    <>
      <RouteHero
        title={poi.name}
        origin=""
        destiny=""
        alternativeRoutePoints={['aixo no anira aquí']}
        type="stage"
      />

      <PageContainer className="mb-12">
        <TypoP>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore sunt
          quae ut laboriosam et ex. Architecto neque, hic provident fuga modi
          at! Officiis maiores deserunt, ducimus suscipit tempore commodi
          consequatur praesentium reprehenderit quos totam? Velit pariatur
          quidem sequi iste vero explicabo, porro laudantium esse libero. A
          tempora in, ullam laudantium expedita unde, vitae qui deleniti
          excepturi id incidunt delectus explicabo odio rerum voluptate dolorum.
          Veritatis, explicabo ut, deserunt quae distinctio excepturi officiis
          necessitatibus quis perferendis aperiam aspernatur magni blanditiis
          eaque vitae! Non minima consequuntur facere! Recusandae placeat,
          aliquid laboriosam facere sed veniam quaerat mollitia provident
          aspernatur incidunt eum tempora sit aut inventore. Molestias iusto
          laborum consequatur facere quas, provident maxime itaque cupiditate,
          aliquid nihil ullam libero alias quam totam natus!
        </TypoP>
        <TypoP>
          Assumenda ullam repellendus sequi ex facere rem debitis molestias,
          optio repudiandae architecto consequatur blanditiis earum minus
          possimus, eveniet odio necessitatibus explicabo laborum iste eaque
          voluptatibus. Voluptates dolorem ipsum delectus fugit explicabo
          laboriosam ad, culpa quidem rerum earum nesciunt vel autem omnis aut?
          Illo numquam sit, dolor vero quae nihil hic. Architecto itaque nobis
          quidem voluptates doloremque repudiandae doloribus magnam at,
          officiis, reiciendis illo qui tenetur quaerat quae? Fuga labore ipsum
          commodi? Consectetur veritatis quod officia odit tempora perferendis
          nostrum voluptatibus adipisci inventore temporibus esse autem nihil
          quia laborum in reiciendis accusantium blanditiis sunt fugiat quam,
          cupiditate tenetur sed accusamus! Nihil, amet! Nisi modi dignissimos,
          vero quo quisquam tempore, molestiae ipsa, saepe quasi quas eius
          praesentium quaerat quam sit reiciendis voluptate?
        </TypoP>

        <div className="w-full flex justify-center mt-12">
          <Image
            src={poi.img}
            alt=""
            width={800}
            height={800}
          />
        </div>
      </PageContainer>
    </>
  );
};

export default RegionPage;
