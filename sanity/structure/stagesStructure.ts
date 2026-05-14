// sanity/structure/stagesStructure.ts

import type {
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/structure';

import { apiVersion } from '../env';

type StageInternalTag = {
  _id: string;
  tag?: string;
};

export function stagesStructure(
  S: StructureBuilder,
  context: StructureResolverContext,
) {
  const client = context.getClient({ apiVersion });

  return S.listItem()
    .title('Etapes')
    .child(
      S.list()
        .title('Etapes')
        .items([
          S.documentTypeListItem('stage').title('Totes les etapes'),

          S.divider(),

          S.listItem()
            .title('Etapes per tag')
            .child(async () => {
              const tags = await client.fetch<StageInternalTag[]>(
                `*[_type == "stageInternalTag"] | order(tag asc) {
                  _id,
                  tag
                }`,
              );

              return S.list()
                .title('Etapes per tag')
                .items(
                  tags.map((tag) =>
                    S.listItem()
                      .id(`stage-tag-${tag._id}`)
                      .title(tag.tag ?? 'Sense tag')
                      .child(
                        S.documentList()
                          .id(`stages-by-tag-${tag._id}`)
                          .title(`Etapes: ${tag.tag ?? 'Sense tag'}`)
                          .schemaType('stage')
                          .filter(
                            `_type == "stage" && $tagId in internalTags[]._ref`,
                          )
                          .params({ tagId: tag._id })
                          .defaultOrdering([
                            { field: 'origin', direction: 'asc' },
                          ]),
                      ),
                  ),
                );
            }),
        ]),
    );
}
