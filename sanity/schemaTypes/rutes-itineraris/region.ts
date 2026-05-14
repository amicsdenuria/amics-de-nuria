import { defineField, defineType } from 'sanity';

import SpanWithLink from '@/sanity/components/SpanWithLink';

export const region = defineType({
  name: 'region',
  title: 'Comarca',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
      },
    }),

    defineField({
      name: 'province',
      title: 'Província',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'img',
      title: 'Imatge',
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
      validation: (Rule) => Rule.required().assetRequired(),
      description: SpanWithLink([
        '(Intentar comprimir a ',
        { type: 'link', href: 'https://squoosh.app/', text: 'Squoosh' },
        ' abans. Procés: Compress -> WebP -> Descarregar)',
      ]),
    }),

    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ type: 'text', validation: (Rule) => Rule.required() }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
