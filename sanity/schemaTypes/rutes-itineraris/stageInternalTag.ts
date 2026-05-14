import { defineField, defineType } from 'sanity';

export const stageInternalTag = defineType({
  name: 'stageInternalTag',
  title: "Tag intern d'etapa",
  type: 'document',

  preview: {
    select: {
      title: 'tag',
    },
  },

  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'tag',
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .slice(0, 80),
      },
    }),
  ],
});
