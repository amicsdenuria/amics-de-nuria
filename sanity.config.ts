'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from './sanity/env';

import StudioNavbar from './sanity/components/StudioNavbar';
import { apiVersion } from './sanity/env';
import { caESLocale } from '@sanity/locale-ca-es';
import { defineConfig } from 'sanity';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure/structure';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { AGENDA_SINGLETON_IDS } from './sanity/agenda.constants';

export const singletonTypes = ['currentRoute', ...Object.keys(AGENDA_SINGLETON_IDS)];
export const notEditableTypes = ['subscriber', 'subscription'];

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    templates: (prev) => prev.filter((template) => !singletonTypes.includes(template.schemaType)),
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    caESLocale(),
  ],
  studio: {
    components: {
      toolMenu: StudioNavbar,
    },
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const options = prev.filter((template) => !singletonTypes.includes(template.templateId));
      // Oculta singletons y notEditable del botón "+" global
      if (creationContext.type === 'global') {
        return options.filter(
          (template) =>
            !singletonTypes.includes(template.templateId) &&
            !notEditableTypes.includes(template.templateId),
        );
      }

      // Oculta el "+" dentro de panes de tipos notEditable
      if (
        creationContext.type === 'structure' &&
        creationContext.schemaType &&
        notEditableTypes.includes(creationContext.schemaType)
      ) {
        return [];
      }

      return options;
    },

    // Oculta "duplicate" de singletons
    actions: (prev, { schemaType }) => {
      if (singletonTypes.includes(schemaType)) {
        return prev.filter(
          (action) =>
            action.action !== 'duplicate' && action.action !== 'delete',
        );
      }

      return prev;
    },
  },
});
