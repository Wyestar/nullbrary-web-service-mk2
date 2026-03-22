import * as z from "zod";

export const WeaknessResistance = z.object({
  kind: z.enum(["ELEMENT", "STATUS", "EFFECT"]).nullable(),

  element: z
    .enum(["DRAGON", "FIRE", "WATER", "THUNDER", "ICE", "RAW"])
    .nullable(),

  status: z.enum(["POISON", "PARALYSIS", "SLEEP", "BLASTBLIGHT"]).nullable(),

  effect: z.enum(["FLASH", "NOISE", "STUN", "EXHAUST"]).nullable(),

  level: z.enum(["NO_EFFECT", "ONE", "TWO", "THREE"]).nullable(),

  condition: z.enum(["FALLOW", "INCLEMENCY", "PLENTY", "NONE"]).nullable(),
});
