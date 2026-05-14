import { defineField, defineType } from 'sanity';

import MultilineDescription from '@/sanity/components/MultilineDescription';
import { apiVersion } from '@/sanity/env';

export const route = defineType({
  name: 'route',
  title: 'Ruta',
  type: 'document',
  preview: {
    select: {
      origin: 'origin',
      internalCode: 'internalCode',
      destiny: 'destiny',
      wayPoints: 'wayPoints',
    },
    prepare({ origin, destiny, wayPoints, internalCode }) {
      const cleanWayPoints = Array.isArray(wayPoints)
        ? wayPoints.filter(Boolean)
        : [];

      return {
        title: [origin, destiny].filter(Boolean).join(' - '),
        subtitle: internalCode
          ? internalCode
          : cleanWayPoints.length
            ? cleanWayPoints.join(' - ')
            : undefined,
      };
    },
  },

  fields: [
    defineField({
      name: 'internalCode',
      title: 'Codi Intern',
      type: 'string',
      validation: (Rule) =>
        Rule.max(30).custom(async (internalCode, context) => {
          if (!internalCode) return true;

          const documentId = context.document?._id as string | undefined;

          if (!documentId) return true;

          const publishedId = documentId.replace(/^drafts\./, '');
          const draftId = `drafts.${publishedId}`;

          const client = context
            .getClient({ apiVersion })
            .withConfig({ perspective: 'raw' });

          const exists = await client.fetch<boolean>(
            `count(*[
          _type == "route" &&
          internalCode == $internalCode &&
          !(_id in [$publishedId, $draftId]) &&
          !(_id in path("versions.**"))
        ]) > 0`,
            {
              internalCode,
              publishedId,
              draftId,
            },
          );

          return exists
            ? 'Aquest codi intern ja existeix en una altra ruta'
            : true;
        }),
    }),
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
      of: [
        {
          type: 'reference',
          to: [{ type: 'stage' }],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((stages: { _ref?: string }[] | undefined) => {
            if (!stages) return true;

            const refs = stages.map((item) => item?._ref).filter(Boolean);
            const uniqueRefs = new Set(refs);

            if (refs.length !== uniqueRefs.size) {
              return "No pots afegir la mateixa etapa més d'una vegada";
            }

            return true;
          }),
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
