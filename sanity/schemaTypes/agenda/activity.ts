import { defineArrayMember, defineField, defineType } from 'sanity';

const validateBounds = (value: unknown, min: string, max: string) => {
  const bounds = value as Record<string, unknown> | undefined;
  return !bounds || typeof bounds[min] !== 'number' || typeof bounds[max] !== 'number' ||
    bounds[min] <= bounds[max] || 'El mínim no pot superar el màxim.';
};
const imageFields = [defineField({
  name: 'alt', title: 'Text alternatiu en català', type: 'string',
  validation: (Rule) => Rule.required().custom((value) =>
    value?.trim() ? true : 'Cal descriure la imatge en català.'),
})];
const statuses = [
  { title: 'Agendada', value: 'scheduled' },
  { title: 'Completa', value: 'full' },
  { title: 'Cancel·lada', value: 'cancelled' },
];

export const activity = defineType({
  name: 'activity', title: 'Activitat', type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'schedule', title: 'Horari' },
    { name: 'location', title: 'Ubicació i organització' },
    { name: 'registration', title: 'Inscripció i preu' },
    { name: 'requirements', title: 'Requisits' },
    { name: 'content', title: 'Contingut' },
    { name: 'cancellation', title: 'Cancel·lació' },
  ],
  fields: [
    defineField({
      name: 'title', title: 'Títol', type: 'string', group: 'general',
      validation: (Rule) => Rule.required().custom((value) =>
        value?.trim() ? true : 'Cal indicar el títol.'),
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'general',
      options: { source: 'title' },
      description: 'Cada edició ha de tenir un slug propi, encara que comparteixi el títol.',
      validation: (Rule) => Rule.required().error('Cal generar un slug únic.'),
    }),
    defineField({
      name: 'description', title: 'Descripció', type: 'text', group: 'general',
      validation: (Rule) => Rule.required().custom((value) =>
        value?.trim() ? true : 'Cal indicar la descripció.'),
    }),
    defineField({
      name: 'type', title: "Tipus d'activitat", type: 'reference', group: 'general',
      to: [{ type: 'activityType' }], weak: false,
      validation: (Rule) => Rule.required().error("Cal seleccionar un tipus d'activitat."),
    }),
    defineField({
      name: 'isSpiritActivity', title: 'Sortida amb l’Esperit', type: 'boolean',
      group: 'general', initialValue: false,
      description: 'Marca totes les edicions. La sortida actual es tria al selector de l’Agenda.',
    }),
    defineField({
      name: 'status', title: 'Estat', type: 'string', group: 'general',
      initialValue: 'scheduled', options: { list: statuses, layout: 'radio' },
      validation: (Rule) => Rule.required().custom((value) =>
        value === undefined || statuses.some((item) => item.value === value) || 'Tria un estat de la llista.')
        .error('Tria Agendada, Completa o Cancel·lada. La finalització es calcula al web.'),
    }),
    defineField({
      name: 'schedule', title: 'Horari', type: 'object', group: 'schedule',
      validation: (Rule) => Rule.required().custom((value) => {
        const schedule = value as { startDate?: string; endDate?: string; durationMinutes?: number } | undefined;
        if (!schedule?.startDate || !schedule.endDate) return true;
        const start = Date.parse(schedule.startDate), end = Date.parse(schedule.endDate);
        if (!Number.isFinite(start) || !Number.isFinite(end)) return true;
        if (end <= start) return 'La data de fi ha de ser posterior a l’inici.';
        return schedule.durationMinutes === undefined ||
          Math.abs((end - start) / 60_000 - schedule.durationMinutes) < 0.000001 ||
          'La durada ha de coincidir amb la diferència entre inici i fi.';
      }),
      fields: [
        defineField({
          name: 'startDate', title: 'Inici', type: 'datetime',
          validation: (Rule) => Rule.required().custom((value) =>
            value && Number.isFinite(Date.parse(value)) ? true : 'Cal una data d’inici vàlida.'),
        }),
        defineField({
          name: 'endDate', title: 'Fi (opcional)', type: 'datetime',
          validation: (Rule) => Rule.custom((value) =>
            value === undefined || Number.isFinite(Date.parse(value)) || 'Cal una data de fi vàlida.'),
        }),
        defineField({
          name: 'durationMinutes', title: 'Durada (minuts, opcional)', type: 'number',
          validation: (Rule) => Rule.min(1).integer().error('La durada ha de ser un nombre enter positiu.'),
        }),
      ],
    }),
    defineField({
      name: 'location', title: 'Ubicació', type: 'object', group: 'location',
      validation: (Rule) => Rule.required().error('Cal indicar la ubicació.'),
      fields: [
        defineField({ name: 'name', title: 'Nom del lloc o plataforma', type: 'string',
          validation: (Rule) => Rule.required().custom((value) => value?.trim() ? true : 'Cal indicar el lloc.') }),
        defineField({ name: 'isOnline', title: 'Activitat en línia', type: 'boolean', initialValue: false,
          validation: (Rule) => Rule.required().error('Cal indicar si és en línia.') }),
        ...[['address', 'Adreça'], ['city', 'Població'], ['province', 'Província']].map(([name, title]) =>
          defineField({ name, title, type: 'string', hidden: ({ parent }) => parent?.isOnline === true })),
      ],
    }),
    defineField({
      name: 'organizer', title: 'Organització', type: 'object', group: 'location',
      validation: (Rule) => Rule.required().error('Cal indicar l’organització.'),
      fields: [
        defineField({ name: 'name', title: 'Nom', type: 'string',
          validation: (Rule) => Rule.required().custom((value) => value?.trim() ? true : 'Cal indicar l’organització.') }),
        defineField({ name: 'organizerUrl', title: 'Web (opcional)', type: 'url',
          validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).error('La URL ha de començar per http:// o https://.') }),
      ],
    }),
    defineField({
      name: 'participants', title: 'Participants (opcional)', type: 'object', group: 'requirements',
      validation: (Rule) => Rule.custom((value) => validateBounds(value, 'minParticipants', 'maxParticipants')),
      fields: [
        defineField({ name: 'minParticipants', title: 'Mínim', type: 'number',
          validation: (Rule) => Rule.min(0).integer().error('Cal un nombre enter igual o superior a zero.') }),
        defineField({ name: 'maxParticipants', title: 'Màxim', type: 'number',
          validation: (Rule) => Rule.min(0).integer().error('Cal un nombre enter igual o superior a zero.') }),
      ],
    }),
    defineField({
      name: 'registration', title: 'Inscripció (opcional)', type: 'object', group: 'registration',
      fields: [defineField({
        name: 'registrationUrl', title: 'Enllaç extern d’inscripció', type: 'url',
        description: 'Sense enllaç no es mostra cap botó d’inscripció. La disponibilitat la gestiona el servei extern.',
        validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).error('La URL ha de començar per http:// o https://.'),
      })],
    }),
    defineField({
      name: 'price', title: 'Preu', type: 'object', group: 'registration',
      validation: (Rule) => Rule.required().error('Cal indicar el preu.'),
      fields: [
        defineField({ name: 'isFree', title: 'Activitat gratuïta', type: 'boolean', initialValue: true,
          validation: (Rule) => Rule.required().error('Cal indicar si és gratuïta.') }),
        defineField({
          name: 'amount', title: 'Import (€)', type: 'number',
          hidden: ({ parent }) => parent?.isFree !== false,
          validation: (Rule) => Rule.custom((value, context) => {
            if ((context.parent as { isFree?: boolean } | undefined)?.isFree !== false) return true;
            return typeof value === 'number' && Number.isFinite(value) && value >= 0 ||
              'Cal un import igual o superior a zero per a una activitat de pagament.';
          }),
        }),
      ],
    }),
    defineField({
      name: 'requirements', title: 'Requisits (opcional)', type: 'object', group: 'requirements',
      validation: (Rule) => Rule.custom((value) => validateBounds(value, 'minAge', 'maxAge')),
      fields: [
        defineField({ name: 'minAge', title: 'Edat mínima', type: 'number',
          validation: (Rule) => Rule.min(0).integer().error('Cal una edat entera igual o superior a zero.') }),
        defineField({ name: 'maxAge', title: 'Edat màxima', type: 'number',
          validation: (Rule) => Rule.min(0).integer().error('Cal una edat entera igual o superior a zero.') }),
        defineField({ name: 'level', title: 'Nivell', type: 'string',
          options: { list: [
            { title: 'Iniciació', value: 'beginner' }, { title: 'Intermedi', value: 'intermediate' },
            { title: 'Avançat', value: 'advanced' }, { title: 'Qualsevol', value: 'any' },
          ] },
          validation: (Rule) => Rule.custom((value) =>
            value === undefined || ['beginner', 'intermediate', 'advanced', 'any'].includes(value) || 'Tria un nivell de la llista.'),
        }),
        defineField({ name: 'requiredMaterials', title: 'Material necessari', type: 'array',
          of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.required().min(1).error('Emplena o elimina el material.') })],
          validation: (Rule) => Rule.unique().error('No repeteixis el mateix material.') }),
        defineField({ name: 'notes', title: 'Observacions', type: 'text' }),
      ],
    }),
    defineField({
      name: 'content', title: 'Imatges (opcional)', type: 'object', group: 'content',
      fields: [
        defineField({ name: 'mainImage', title: 'Imatge principal', type: 'image',
          options: { hotspot: true }, fields: imageFields,
          validation: (Rule) => Rule.assetRequired().error('Cal afegir la imatge o eliminar el camp.') }),
        defineField({ name: 'images', title: 'Galeria', type: 'array',
          of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: imageFields,
            validation: (Rule) => Rule.required().assetRequired().error('Cal afegir la imatge o eliminar l’entrada.') })],
          validation: (Rule) => Rule.unique().max(10).custom((images) => {
            const refs = images?.map((image) =>
              (image as { asset?: { _ref?: string } }).asset?._ref).filter(Boolean) ?? [];
            return new Set(refs).size === refs.length || 'No repeteixis la mateixa imatge a la galeria.';
          }).error('La galeria admet fins a deu imatges diferents.'),
        }),
      ],
    }),
    defineField({
      name: 'metadata', title: 'Cancel·lació (opcional)', type: 'object', group: 'cancellation',
      hidden: ({ document }) => document?.status !== 'cancelled',
      fields: [
        defineField({ name: 'cancelledAt', title: 'Data de cancel·lació', type: 'datetime' }),
        defineField({ name: 'cancellationReason', title: 'Motiu', type: 'text' }),
      ],
    }),
  ],
  orderings: [
    { title: 'Inici (més pròxima)', name: 'startAsc', by: [{ field: 'schedule.startDate', direction: 'asc' }] },
    { title: 'Inici (més recent)', name: 'startDesc', by: [{ field: 'schedule.startDate', direction: 'desc' }] },
    { title: 'Títol', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', start: 'schedule.startDate', status: 'status', type: 'type.name', media: 'content.mainImage' },
    prepare({ title, start, status, type, media }) {
      const date = start && Number.isFinite(Date.parse(start))
        ? new Date(start).toLocaleString('ca-ES', { timeZone: 'Europe/Madrid', dateStyle: 'short', timeStyle: 'short' }) : undefined;
      return { title, media, subtitle: [date, statuses.find((item) => item.value === status)?.title, type].filter(Boolean).join(' · ') };
    },
  },
});
