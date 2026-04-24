import { defineField, defineType } from 'sanity';

export const poi = defineType({
  name: 'poi',
  title: "Lloc d'interès",
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
      name: 'location',
      title: 'Ubicació',
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
