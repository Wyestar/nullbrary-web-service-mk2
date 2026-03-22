import * as z from "zod";

import { WeaknessResistance } from "./WeaknessResistanceSchema";

export const LargeMonsterReq = z.object({
  lm_game_id: z.number().nullable(),
  lm_name: z.string().nullable(),
});

// primitive types
// z.string();
// z.number();
// z.bigint();
// z.boolean();
// z.symbol();
// z.undefined();
// z.null();
// z.object({})
// .optional()
// .strictObject({}) does not allow unknown keys
// .looseObject({}) allows unknown keys
// const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
export const LargeMonsterType = z.object({
  lm_base_health: z.number(),
  lm_game_id: z.number(),
  lm_names: z
    .object({
      en: z.string(),
      ja: z.string(),
    })
    .nullable(),
  lm_name_in_user_lang: z.string(),
  lm_species: z.string(),
  lm_weaknesses: z.array(WeaknessResistance).nullable(),
  lm_resistances: z.array(WeaknessResistance).nullable(),
});

export const LargeMonsterListType = z.object({
  lm_list: z.array(LargeMonsterType),
});
