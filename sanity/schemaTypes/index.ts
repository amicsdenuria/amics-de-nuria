import { type SchemaTypeDefinition } from 'sanity';
import { subscriber } from './subscriber';
import { subscription } from './subscription';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [subscriber, subscription],
};
