import type { StructureResolver } from 'sanity/structure';
import { CalendarIcon, CogIcon, HeartIcon, StarIcon, UsersIcon } from '@sanity/icons';
import { FootprintsIcon, MapIcon, MapPinIcon, RouteIcon } from 'lucide-react';
import { stagesStructure } from './stagesStructure';
import { AGENDA_SINGLETON_IDS } from '../agenda.constants';

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
          .documentId(documentId)
          .title(title),
      );

  return S.list()
    .title('Seccions')
    .items([
      S.listItem()
        .title('Rutes i itineraris')
        .icon(RouteIcon)
        .child(
          S.list()
            .title('Rutes i itineraris')
            .items([
              S.documentTypeListItem('route').title('Rutes').icon(RouteIcon),
              stagesStructure(S, ctx).icon(FootprintsIcon),
              S.documentTypeListItem('poi').title("Llocs d'interès").icon(MapPinIcon),
              S.documentTypeListItem('region').title('Comarca').icon(MapIcon),
              S.divider(),
              S.listItem()
                .title('Config [NO TOCAR]')
                .icon(CogIcon)
                .child(
                  S.list().title('Config').items([
                    S.documentTypeListItem('stageInternalTag').title('stageInternalTag'),
                  ]),
                ),
            ]),
        ),

      S.listItem().title('Agenda').icon(CalendarIcon).child(
        S.list().title('Agenda').items([
          S.documentTypeListItem('activity').title('Activitats').icon(CalendarIcon),
          S.divider(),
          S.documentTypeListItem('activityType').title("Tipus d'activitat").icon(CogIcon),
        ]),
      ),

      S.divider(),

      S.listItem().title('Destacats').icon(StarIcon).child(
        S.list().title('Destacats').items([
          singletonItem('currentRoute', "Ruta d'Enguany", 'currentRoute-3').icon(RouteIcon),
          singletonItem('currentSpiritActivity', 'Sortida amb l’Esperit actual', AGENDA_SINGLETON_IDS.currentSpiritActivity).icon(HeartIcon),
          singletonItem('featuredActivity', 'Activitat destacada', AGENDA_SINGLETON_IDS.featuredActivity).icon(StarIcon),
        ]),
      ),

      S.divider(),

      S.listItem()
        .title('Subscripcions')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Subscripcions')
            .items([
              notEditableListItem('subscriber', 'Subscriptors'),
              notEditableListItem('subscription', 'Subscripcions'),
            ]),
        ),
    ]);
};
