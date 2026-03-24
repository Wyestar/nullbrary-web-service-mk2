import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";

import { getLMByGameIdOptions, lmSinglePost } from "../api/largeMonsters";

export const Route = createFileRoute("/largeMonsters/$largeMonsterName")({
  loader: async ({ params: { largeMonsterName }, context }) => {
    // const lm_game_id_num = parseInt(largeMonsterGameId);
    // console.info("lm page param: ", params);
    console.info("lm page lmname: ", largeMonsterName);

    const data = {
      lm_name: largeMonsterName,
    };
    await context.queryClient.ensureQueryData(getLMByGameIdOptions(data));
  },

  component: LargeMonsterGameIdComponent,
});

// export function PostErrorComponent({ error }: ErrorComponentProps) {
//   return <ErrorComponent error={error} />;
// }

// post req with. need to convert string to number
// {
//     "lm_game_id": 1547364608
// }

function LargeMonsterGameIdComponent() {
  console.info("lm single comp start");

  const { largeMonsterName } = Route.useParams();
  console.info("lm single comp params name");
  console.info(largeMonsterName);
  // const lm_game_id_num = parseInt(largeMonsterGameId);

  const data = {
    lm_name: largeMonsterName,
  };
  // mar 24
  // http://localhost:3001/largeMonsters/Rey%20Dau
  // firefox decodes url spaces automatically

  const { data: lmByGameId } = useSuspenseQuery(getLMByGameIdOptions(data));
  console.info("lm single comp");
  console.info(lmByGameId);
  const { lm_list } = lmByGameId;
  // match param (largeMonsterName) to lm_list[0].lm_name_in_user_lang

  let lm = null;
  if (lm_list.length > 0) {
    if (largeMonsterName === lm_list[0].lm_name_in_user_lang.toLowerCase()) {
      lm = lm_list[0];
    }
  }

  return (
    <div>
      <div>
        <p>Monster name:</p>
        <p>{lm?.lm_name_in_user_lang}</p>
      </div>
      <div>
        <p>Monster species:</p>
        <p>{lm?.lm_species}</p>
      </div>
      <div>
        <p>Monster base health:</p>
        <p>{lm?.lm_base_health}</p>
      </div>
    </div>
  );
}
