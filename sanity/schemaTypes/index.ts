import { type SchemaTypeDefinition } from 'sanity';
import { subscriber } from './subscriber';
import { subscription } from './subscription';
import { stage } from './pelegrinatges/stage';
import { region } from './pelegrinatges/region';
import { poi } from './pelegrinatges/poi';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [subscriber, subscription, stage, region, poi],
};
