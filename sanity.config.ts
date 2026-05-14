'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from './sanity/env';

import StudioNavbar from './sanity/components/StudioNavbar';
// import { apiVersion } from './sanity/env';
import { caESLocale } from '@sanity/locale-ca-es';
import { defineConfig } from 'sanity';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { structureTool } from 'sanity/structure';

// import { visionTool } from '@sanity/vision';

const singletonTypes = ['currentRoute'];

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    // visionTool({ defaultApiVersion: apiVersion }),
    caESLocale(),
  ],
  studio: {
    components: {
      toolMenu: StudioNavbar,
    },
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !singletonTypes.includes(templateItem.templateId),
        );
      }

      return prev;
    },
  },
});
