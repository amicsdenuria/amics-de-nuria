interface RouteByIdParams {
  routeId: string;
}

export const routeById = async ({ routeId }: RouteByIdParams) => {
  console.log(routeId);
  return await {};
};
