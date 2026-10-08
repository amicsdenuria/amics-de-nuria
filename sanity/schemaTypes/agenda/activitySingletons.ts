import { defineField, defineType } from 'sanity';
import { AGENDA_SINGLETON_IDS } from '@/sanity/agenda.constants';
import { apiVersion } from '@/sanity/env';

export const featuredActivity = defineType({
  name: 'featuredActivity', title: 'Activitat destacada', type: 'document',
  validation: (Rule) => Rule.custom((value) =>
    value?._id?.replace(/^drafts\./, '') === AGENDA_SINGLETON_IDS.featuredActivity || 'Utilitza el selector de l’Agenda.'),
  fields: [defineField({
    name: 'featuredActivity', title: 'Activitat', type: 'reference',
    to: [{ type: 'activity' }], weak: false, options: { disableNew: true },
    validation: (Rule) => Rule.required().error('Cal seleccionar una activitat.'),
  })],
  preview: { select: { title: 'featuredActivity.title', subtitle: 'featuredActivity.slug.current', media: 'featuredActivity.content.mainImage' } },
});

export const currentSpiritActivity = defineType({
  name: 'currentSpiritActivity', title: 'Sortida amb l’Esperit actual', type: 'document',
  validation: (Rule) => Rule.custom((value) =>
    value?._id?.replace(/^drafts\./, '') === AGENDA_SINGLETON_IDS.currentSpiritActivity || 'Utilitza el selector de l’Agenda.'),
  fields: [defineField({
    name: 'currentSpiritActivity', title: 'Sortida seleccionada', type: 'reference',
    to: [{ type: 'activity' }], weak: false,
    description: 'Tria l’edició que s’ha de mostrar a Rutes i itineraris. Les altres edicions continuen publicades a l’Agenda.',
    options: { disableNew: true, filter: 'isSpiritActivity == true' },
    validation: (Rule) => Rule.required().custom(async (value, context) => {
      if (!value?._ref) return 'Cal seleccionar una sortida amb l’Esperit.';
      const id = value._ref.replace(/^drafts\./, '');
      const marked = await context.getClient({ apiVersion }).withConfig({ perspective: 'raw' }).fetch<boolean | null>(
        'coalesce(*[_id == $draftId][0], *[_id == $id][0]).isSpiritActivity',
        { id, draftId: `drafts.${id}` },
      );
      return marked === true || 'L’activitat seleccionada ha d’estar marcada com a Sortida amb l’Esperit.';
    }),
  })],
  preview: { select: { title: 'currentSpiritActivity.title', subtitle: 'currentSpiritActivity.slug.current', media: 'currentSpiritActivity.content.mainImage' } },
});
