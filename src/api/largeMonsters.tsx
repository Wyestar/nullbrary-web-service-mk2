import { queryOptions, useMutation } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  LargeMonsterType,
  LargeMonsterListType,
} from "../schemas/LargeMonstersSchema";
import axios from "redaxios";

// createServerFn; for use on server. can be used in mutations
// .handler is server side
// const funcFromServer = createServerFn()
// ==
// in new function that returns queryOptions, can have args
// pass queryKey: ["string id"]
// queryFn: () => funcFromServer(args)

// Mutation 1, client side func
// const mutation = useMutation({
//   mutationFn: funcFromClient
// })
// calls any async func that makes api call

// Mutation 2, server side func
// ie: const $funcFromServer = useServerFn(funcFromServer);
// const mutation = useMutation({
//   mutationFn: $funcFromServer
// })
// mutation.mutate (can breakout and alias)
// useAppForm.onSubmit: mutation.mutate(form data)
// mutation.mutateAsync

// all funcs that 'retrieve' data, be it get or post, use the word 'fetch' in beginning,
// 'server' at end to indicate it is a createServerFn func
// get all lm. for main /lm page
export const fetchLargeMonsterAllSimpleServer = createServerFn({
  method: "GET",
})
  .inputValidator(() => {})
  .handler(async () => {
    console.info("fetching all lm simple info 1.");
    const lmAllSimple = await axios
      .get("http://localhost:8001/api/nb/largemonster/all/simple")
      .then((res) => {
        console.info("fetching all lm simple info 2.");

        const validatedRes = LargeMonsterType.parse(res.data.lm_list[0]);
        console.info("validated res getLMAll", validatedRes);
        return validatedRes;
      })
      .catch((err) => {
        console.info("get error");

        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });
    // ?? null or undefined
    // || falsiness
    return lmAllSimple ?? null;
  });

// this runs in createFileRoute loader AND useSuspenseQuery in component
// this is queryOptions func, this needs to be passed to a query function!
// can this be used in form mutatoin?
export const getLMAllSimple = () => {
  console.info("fetching all lm simple info 0.");

  return queryOptions({
    queryKey: ["largeMonsterAllSimpleServer"],
    queryFn: () => fetchLargeMonsterAllSimpleServer(),
  });
};

// get single lm by id/name
// this should be server and client func.
