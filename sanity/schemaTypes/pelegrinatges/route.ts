import { defineField, defineType } from 'sanity';

import MultilineDescription from '@/sanity/components/MultilineDescription';

export const route = defineType({
  name: 'route',
  title: 'Ruta',
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
      title: 'Punts destacats - (si cal)',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina'),
        },
      ],
      validation: (Rule) => Rule.unique(),
      description: MultilineDescription([
        {
          type: 'text',
          value:
            "Punts que defineixen la ruta i la diferencien d'altres similars.",
        },
        { type: 'text', value: 'Ex: Berguedà, Lluçanès, Campdevànol' },
      ]),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc) => {
          const { origin, destiny, wayPoints } = doc;
          const safeWayPoints = Array.isArray(wayPoints) ? wayPoints : [];
          const parts = [origin, destiny, ...safeWayPoints];
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
      type: 'array',
      of: [
        {
          type: 'text',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina'),
        },
      ],
      validation: (Rule) => Rule.required(),
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
      name: 'stages',
      title: 'Etapes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'stage' }] }],
      validation: (Rule) => Rule.required().unique(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes - (opcional)',
      type: 'array',
      of: [
        {
          type: 'text',
          validation: (Rule) =>
            Rule.required().error('No pot estar buit. Emplena o elimina'),
        },
      ],
    }),
  ],
});
