// Local
import { routeById } from '@/content/pelegrinatges/data/actions/route/routeById';

// Sanity
// import { routeById } from '@/sanity/lib/pelegrinatges/route/routeById';

interface GetRouteByIdParams {
  routeId: string;
}

export const getRouteById = async ({ routeId }: GetRouteByIdParams) => {
  return await routeById({ routeId });
};
