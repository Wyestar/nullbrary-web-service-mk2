import * as z from "zod";

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
  lm_names: z.nullable(
    z.object({
      en: z.string(),
      ja: z.string(),
    }),
  ),
  lm_name_in_user_lang: z.string(),
  lm_species: z.string(),
});

export const LargeMonsterListType = z.array(LargeMonsterType);
