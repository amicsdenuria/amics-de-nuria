import { defineField, defineType } from 'sanity';

export const subscription = defineType({
  name: 'subscription',
  title: 'Subscripció',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'subscriber',
      title: 'Subscriptor',
      type: 'reference',
      to: [{ type: 'subscriber' }],
      validation: (Rule) => Rule.required(),
    }),

    // IDs Stripe
    defineField({
      name: 'stripeSubscriptionId',
      title: 'Stripe Subscription ID',
      type: 'string',
      description:
        "Identificador individual de cada subscripció de cada usuari (Vé d'Stripe)",
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
    }),
    defineField({
      name: 'stripeProductId',
      title: 'Stripe Product ID',
      type: 'string',
    }),

    // Readable Info
    defineField({
      name: 'productName',
      title: 'Nom del producte (Stripe)',
      type: 'string',
      description: 'Nom del producte recuperat des de Stripe',
    }),
    defineField({
      name: 'unit_amount',
      title: 'Import',
      type: 'number',
      description: 'Import definit a Stripe',
    }),
    defineField({
      name: 'priceInterval',
      title: 'Interval de cobrament',
      type: 'string',
      options: {
        list: [
          { title: 'Mensual', value: 'month' },
          { title: 'Anual', value: 'year' },
        ],
      },
    }),

    // Status & Dates
    defineField({
      name: 'status',
      title: 'Estat',
      type: 'string',
      options: {
        list: [
          { title: 'Activa', value: 'active' },
          { title: 'Pendent / fallida', value: 'past_due' },
          { title: 'Cancelada', value: 'canceled' },
          { title: 'Incompleta', value: 'incomplete' },
        ],
      },
    }),
    defineField({
      name: 'current_period_end',
      title: 'Fi del període',
      type: 'datetime',
      description:
        "Indica la data en que acaba el període cobrat. Un cop es fa el cobrament automàtic, s'actualitza la nova data",
    }),
    defineField({
      name: 'canceled_at',
      title: 'Cancelada el',
      type: 'datetime',
      description: 'Data en què ha estat cancelada la subscripció',
    }),
    defineField({
      name: 'createdAt',
      title: 'Creada el',
      type: 'datetime',
      description: 'Data en què va començar la subscripció',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      subscriberName: 'subscriber.displayName',
      subscriberEmail: 'subscriber.email',
      status: 'status',
      end: 'current_period_end',
    },
    prepare(selection) {
      const { subscriberName, subscriberEmail, status, end } = selection;
      const title = subscriberName || subscriberEmail || 'Subscriptor';
      const endStr = end
        ? ` - fins al ${new Date(end).toLocaleDateString()}`
        : '';
      const subtitle = `${status ?? 'desconegut'}${endStr}`;

      return { title, subtitle };
    },
  },
});
