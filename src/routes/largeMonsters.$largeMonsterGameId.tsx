import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";

import { getLMByGameId, lmSinglePost } from "../api/largeMonsters";

export const Route = createFileRoute("/largeMonsters/$largeMonsterGameId")({
  loader: async ({ params: { largeMonsterGameId }, context }) => {
    const lm_game_id_num = parseInt(largeMonsterGameId);
    const data = {
      lm_game_id: lm_game_id_num,
    };
    await context.queryClient.ensureQueryData(getLMByGameId(data));
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

  const { largeMonsterGameId } = Route.useParams();
  console.info("lm single comp params id");
  console.info(largeMonsterGameId);
  const lm_game_id_num = parseInt(largeMonsterGameId);

  const data = {
    lm_game_id: lm_game_id_num,
  };

  const { data: lmByGameId } = useSuspenseQuery(getLMByGameId(data));
  console.info("lm single comp");
  console.info(lmByGameId);
  return (
    <div>
      <div>
        <p>Monster name:</p>
        <p>{lmByGameId.lm_name_in_user_lang}</p>
      </div>
      <div>
        <p>Monster species:</p>
        <p>{lmByGameId.lm_species}</p>
      </div>
      <div>
        <p>Monster base health:</p>
        <p>{lmByGameId.lm_base_health}</p>
      </div>
    </div>
  );
}
