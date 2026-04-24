// Local
import { allRoutes } from '@/content/pelegrinatges/data/actions/route/allRoutes';

// Sanity
// import { allRoutes } from "@/sanity/lib/pelegrinatges/route/allRoutes"

export const getAllRoutes = async () => {
  return await allRoutes();
};
