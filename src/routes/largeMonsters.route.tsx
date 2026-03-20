import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import {
  getLMAllSimple,
  fetchLargeMonsterAllSimpleServer,
} from "../api/largeMonsters";

export const Route = createFileRoute("/largeMonsters")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getLMAllSimple());
  },
  // staleTime: 10_000,
  component: LargeMonsterComponent,
});

function LargeMonsterComponent() {
  console.info("lm comp start");

  // const lmAllSimpleData = useSuspenseQuery(getLMAllSimple());
  // console.info("lm comp");
  // console.info(lmAllSimpleData);

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
      <div>lm page list</div>
    </div>
  );
}
