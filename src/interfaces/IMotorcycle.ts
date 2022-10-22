import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const zodMotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().gt(0).lte(2500),
});

export type IMotorcycle = z.infer<typeof zodMotorcycleSchema> & IVehicle;