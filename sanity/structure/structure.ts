import type { StructureResolver } from 'sanity/structure';
import { stagesStructure } from './stagesStructure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, ctx) => {
  const notEditableListItem = (type: string, title: string) =>
    S.listItem().title(title).schemaType(type).child(
      S.documentTypeList(type)
        .title(title)
        // Quita el icono "+"
        .initialValueTemplates([]),
    );

  const singletonItem = (type: string, title: string, documentId = type) =>
    S.listItem()
      .title(title)
      .schemaType(type)
      .child(
        S.document()
          .schemaType(type)
          .documentId(`${documentId}-3`)
          .title(title),
      );

  return S.list()
    .title('Seccions')
    .items([
      S.listItem()
        .title('Subscripcions')
        .child(
          S.list()
            .title('Subscripcions')
            .items([
              notEditableListItem('subscriber', 'Subscriptors'),
              notEditableListItem('subscription', 'Subscripcions'),
            ]),
        ),

      S.listItem()
        .title('Rutes i itineraris')
        .child(
          S.list()
            .title('Rutes i itineraris')
            .items([
              S.documentTypeListItem('route'),
              stagesStructure(S, ctx),
              S.documentTypeListItem('poi'),
              S.documentTypeListItem('region'),
            ]),
        ),

      // SINGLETON
      singletonItem('currentRoute', "Ruta d'Enguany"),

      S.divider(),

      S.listItem()
        .title('Config [NO TOCAR]')
        .child(
          S.list()
            .title('Config')
            .items([
              S.documentTypeListItem('stageInternalTag').title(
                'stageInternalTag',
              ),
            ]),
        ),
    ]);
};
