import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

const viewerToken = process.env.SANITY_VIEWER_API_TOKEN;
const adminToken = process.env.SANITY_ADMIN_API_TOKEN;

if (!viewerToken || !adminToken) {
  throw new Error('Missing SANITY_VIEWER_API_TOKEN or SANITY_ADMIN_API_TOKEN');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: viewerToken,
});

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: adminToken,
});
