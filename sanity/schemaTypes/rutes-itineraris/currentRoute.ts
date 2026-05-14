import { defineField, defineType } from 'sanity';

export const currentRoute = defineType({
  name: 'currentRoute',
  title: "Ruta d'Enguany",
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
      name: 'currentRoute',
      title: 'Ruta',
      type: 'reference',
      to: [{ type: 'route' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
