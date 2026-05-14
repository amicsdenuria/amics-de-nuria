import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Seccions')
    .items([
      S.listItem()
        .title('Subscripcions')
        .child(
          S.list()
            .title('Subscripcions')
            .items([
              S.documentTypeListItem('subscriber'),
              S.documentTypeListItem('subscription'),
            ]),
        ),

      S.listItem()
        .title('Rutes i itineraris')
        .child(
          S.list()
            .title('Rutes i itineraris')
            .items([
              S.documentTypeListItem('route'),
              S.documentTypeListItem('stage'),
              S.documentTypeListItem('poi'),
              S.documentTypeListItem('region'),
            ]),
        ),

      // SINGLETON
      S.listItem()
        .title("Ruta d'Enguany")
        .id('currentRoute')
        .child(
          S.document()
            .schemaType('currentRoute')
            .documentId('currentRouteSingleton'),
        ),
    ]);
