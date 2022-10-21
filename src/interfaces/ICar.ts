import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const zodCarSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});
