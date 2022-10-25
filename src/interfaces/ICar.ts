import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().int().gte(2).lt(4),
  seatsQty: z.number().int().gte(2).lt(7),
});

export type ICar = z.infer<typeof CarZodSchema>;
