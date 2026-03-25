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
    await context.queryClient.ensureQueryData(getLMAllSimpleOptions());
  },
  // staleTime: 10_000,
  component: LargeMonstersComponent,
});

function LargeMonstersComponent() {
  const { data: lmAllSimpleData } = useSuspenseQuery(getLMAllSimpleOptions());

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
            const { lm_name_in_user_lang, lm_species } = lm;
            const lm_name = lm_name_in_user_lang.toLowerCase();
            return (
              <li key={lm_name}>
                <>
                  <Link
                    to="/largeMonsters/$largeMonsterName"
                    params={{
                      largeMonsterName: lm_name,
                    }}
                    className="block py-1 text-blue-800 hover:text-blue-600"
                    activeProps={{ className: "text-black font-bold" }}
                  >
                    <div>{lm_name}</div>
                  </Link>
                  {lm_species}
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
