import { defineField, defineType } from 'sanity';

export const subscriber = defineType({
  name: 'subscriber',
  title: 'Subscriptor',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'displayName',
      title: 'Nom públic',
      type: 'string',
      description: "Si no ha omplert el nom públic, s'especifica l'Email",
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'clerkId',
      title: 'Clerk ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
    }),
    defineField({
      name: 'currentSubscription',
      title: 'Subscripció',
      type: 'reference',
      to: [{ type: 'subscription' }],
    }),
    defineField({
      name: 'createdStripeAt',
      title: 'Compte creat el',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'createdSubscriberAt',
      title: 'Subscriptor creat el',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'displayName',
      subtitle: 'email',
    },
  },
});
