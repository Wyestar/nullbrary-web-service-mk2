import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";

import { getLMByGameIdOptions, lmSinglePost } from "../api/largeMonsters";

export const Route = createFileRoute("/largeMonsters/$largeMonsterName")({
  loader: async ({ params: { largeMonsterName }, context }) => {
    const data = {
      lm_name: largeMonsterName,
    };
    await context.queryClient.ensureQueryData(getLMByNameOptions(data));
    // return in loader if need to use in other prop of Route, like head
  },
  errorComponent: LargeMonsterErrorComponent,
  component: LargeMonsterGameIdComponent,
});

export function LargeMonsterErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function LargeMonsterGameIdComponent() {
  const { largeMonsterName } = Route.useParams();
  const data = {
    lm_name: largeMonsterName,
  };

  const { data: lmByName } = useSuspenseQuery(getLMByNameOptions(data));
  console.info("lm single comp");
  console.info(lmByGameId);
  const { lm_list } = lmByGameId;

  let lm = null;
  if (lm_list.length > 0) {
    lm = lm_list[0];
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
