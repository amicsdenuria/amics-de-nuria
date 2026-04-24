import { routes } from '../../routes';

interface RouteByIdParams {
  routeId: string;
}

export const routeById = async ({ routeId }: RouteByIdParams) => {
  return routes.find((route) => route.id === routeId);
};
