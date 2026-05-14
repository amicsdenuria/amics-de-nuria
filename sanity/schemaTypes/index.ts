import { type SchemaTypeDefinition } from 'sanity';
import { subscriber } from './subscriber';
import { subscription } from './subscription';
import { stage } from './rutes-itineraris/stage';
import { region } from './rutes-itineraris/region';
import { poi } from './rutes-itineraris/poi';
import { route } from './rutes-itineraris/route';
import { currentRoute } from './rutes-itineraris/currentRoute';
import { stageInternalTag } from './rutes-itineraris/stageInternalTag';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    subscriber,
    subscription,
    route,
    stage,
    region,
    poi,
    currentRoute,
    stageInternalTag,
  ],
};
