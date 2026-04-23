import { defineField, defineType } from 'sanity';

import CharacterCountTextInput from '@/sanity/components/CharacterCountTextInput';
import { HoursMinsToMinsInput } from '@/sanity/components/HoursMinsToMinsInput';
import { KmToMInput } from '@/sanity/components/KmToMInput';
import SpanWithLink from '@/sanity/components/SpanWithLink';
import WayPointsDescription from '@/sanity/components/stage/WayPointsDescription';

export const stage = defineType({
  name: 'stage',
  title: 'Etapa',
  type: 'document',
  preview: {
    select: {
      origin: 'origin',
      destiny: 'destiny',
      wayPoints: 'wayPoints',
    },
    prepare({ origin, destiny, wayPoints }) {
      const cleanWayPoints = Array.isArray(wayPoints)
        ? wayPoints.filter(Boolean)
        : [];

      return {
        title: [origin, destiny].filter(Boolean).join(' - '),
        subtitle: cleanWayPoints.length
          ? cleanWayPoints.join(' - ')
          : undefined,
      };
    },
  },
  fields: [
    defineField({
      name: 'origin',
      title: 'Origen',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destiny',
      title: 'Destí',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wayPoints',
      title: 'Punts intermitjos',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina.'),
        },
      ],
      validation: (Rule) => Rule.unique(),
      description: WayPointsDescription(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => {
          const { origin, destiny, wayPoints } = doc;
          const safeWayPoins = Array.isArray(wayPoints) ? wayPoints : [];
          const parts = [origin, ...safeWayPoins, destiny];
          return parts.filter(Boolean).join(' ');
        },
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD') // separa acentos
            .replace(/[\u0300-\u036f]/g, '') // elimina acentos
            .replace(/[^a-z0-9\s-]/g, '') // limpia caracteres raros
            .trim()
            .replace(/\s+/g, '-') // espacios -> guiones
            .slice(0, 200),
      },
      description:
        "Autogenerar després d'emplenar origen, destí i punts intermitjos.",
    }),
    defineField({
      name: 'description',
      title: 'Descripció',
      type: 'text',
      validation: (Rule) => Rule.required().min(3).max(1200),
      components: {
        input: (props) => CharacterCountTextInput({ ...props, max: 1200 }),
      },
    }),
    defineField({
      name: 'mapUrl',
      title: 'Mapa (URL)',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['http', 'https'] })
          .error('La url ha de començar per http:// o https://'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Vídeo (URL) - (opcional)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).error(
          'La url ha de començar per http:// o https://',
        ),
    }),
    defineField({
      name: 'imgs',
      title: 'Imatges - (opcional)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Text alt',
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) =>
            Rule.required().assetRequired().error('Falta la imatge.'),
        },
      ],
      validation: (Rule) => Rule.max(10),
      description: SpanWithLink([
        "Imatges per mostrar al carrousel de l'etapa. Mínim requereix 1 i màxim 10. (Intentar comprimir a ",
        { type: 'link', href: 'https://squoosh.app/', text: 'Squoosh' },
        ' abans)',
      ]),
    }),
    defineField({
      name: 'trailLocations',
      title: 'Itinerari',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina.'),
        },
      ],
      validation: (Rule) => Rule.required().min(2),
      description:
        "Punts de referència o d'interès per on passa la ruta. Mínim requereix origen i destí.",
    }),
    // defineField({
    //   name: 'regions',
    //   title: 'Comarques',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'region' }] }],
    //   validation: (Rule) => Rule.required().min(1),
    //   description: "Comarques per les que passa l'etapa.",
    // }),
    // defineField({
    //   name: 'pois',
    //   title: "Punts d'interès",
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'poi' }] }],
    //   validation: (Rule) => Rule.required().min(1),
    //   description: "Punts d'interès pels que passa l'etapa.",
    // }),
    defineField({
      name: 'allocations',
      title: 'Allotjaments - (opcional)',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina.'),
        },
      ],
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Detalls tècnics',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'distance',
          title: 'Distància (km)',
          type: 'number',
          components: {
            input: KmToMInput,
          },
          validation: (Rule) =>
            Rule.custom((val) => {
              console.log(val);
              if (val === undefined || val === null) {
                return 'Requerit';
              }

              if (val < 0.1) {
                return 'Ha de ser més gran o igual a 0.1';
              }

              return true;
            }),
        }),
        defineField({
          name: 'duration',
          title: 'Durada (hh:mm)',
          type: 'number',
          components: {
            input: HoursMinsToMinsInput,
          },
          validation: (Rule) => Rule.required().min(1).integer(),
        }),
        {
          name: 'initialHeight',
          type: 'number',
          title: 'Altura inicial (m)',
          validation: (Rule) => Rule.required().min(1).integer(),
        },
        {
          name: 'finalHeight',
          type: 'number',
          title: 'Altura final (m)',
          validation: (Rule) => Rule.required().min(1).integer(),
        },
        {
          name: 'minHeight',
          type: 'number',
          title: 'Altura mínima (m)',

          validation: (Rule) => Rule.required().min(1).integer(),
        },
        {
          name: 'maxHeight',
          type: 'number',
          title: 'Altura màxima (m)',

          validation: (Rule) => Rule.required().min(1).integer(),
        },
        {
          name: 'cumulativeAscent',
          type: 'number',
          title: 'Desnivell positiu (m)',
          validation: (Rule) => Rule.required().min(1).integer(),
        },
        {
          name: 'cumulativeDescent',
          type: 'number',
          title: 'Desnivell negatiu (m)',
          validation: (Rule) => Rule.required().min(1).integer(),
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes - (opcional)',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina.'),
        },
      ],
      description:
        "Altres notes importants que es vulguin destacar referents a l'etapa.",
    }),
  ],
});
