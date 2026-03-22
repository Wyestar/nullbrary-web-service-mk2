import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from "@tanstack/react-router";
import {
  getLMAllSimple,
  fetchLargeMonsterAllSimpleServer,
} from "../api/largeMonsters";

export const Route = createFileRoute("/largeMonsters")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getLMAllSimple());
  },
  // staleTime: 10_000,
  component: LargeMonstersComponent,
});

function LargeMonstersComponent() {
  // console.info("lm list comp start");

  const { data: lmAllSimpleData } = useSuspenseQuery(getLMAllSimple());
  // console.info("lm list comp");
  // console.info(lmAllSimpleData);
  // console.info([...lmAllSimpleData.lm_list]);

  // const { largeMonsterGameId } = Route.useParams();
  // console.info("lm list comp param");
  // console.info(largeMonsterGameId);

  const location = useLocation();
  if (location.pathname === "/largeMonsters") {
    return (
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Homepage link
        </Link>
        <div>
          <div>lm page list</div>
          {[...lmAllSimpleData.lm_list].map((lm) => {
            const lm_game_id_string = lm.lm_game_id.toString();
            // console.info(lm_game_id_string);
            return (
              <li key={lm_game_id_string}>
                <>
                  <Link
                    to="/largeMonsters/$largeMonsterGameId"
                    params={{
                      largeMonsterGameId: lm_game_id_string,
                    }}
                    className="block py-1 text-blue-800 hover:text-blue-600"
                    activeProps={{ className: "text-black font-bold" }}
                  >
                    <div>{lm.lm_name_in_user_lang}</div>
                  </Link>
                  {lm.lm_species}
                </>
              </li>
            );
          })}
        </div>
      </div>
    );
  }

  return <Outlet />;
}
