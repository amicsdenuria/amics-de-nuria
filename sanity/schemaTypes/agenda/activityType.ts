import { defineField, defineType } from 'sanity';

export const activityType = defineType({
  name: 'activityType',
  title: "Tipus d'activitat",
  type: 'document',
  fields: [
    defineField({
      name: 'name', title: 'Nom', type: 'string',
      validation: (Rule) => Rule.required().custom((value) =>
        value?.trim() ? true : 'Cal indicar el nom del tipus.'),
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' },
      validation: (Rule) => Rule.required().error('Cal generar un slug únic.'),
    }),
  ],
  orderings: [{ title: 'Nom', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'slug.current' } },
});
