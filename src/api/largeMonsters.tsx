import { queryOptions, useMutation } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  LargeMonsterType,
  LargeMonsterListType,
  LargeMonsterReq,
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

// get = server func, usually get
// fetch = client func, get or post
// 'server' at end to indicate it is a createServerFn func
// get all lm. for main /lm page
export const getLargeMonsterAllSimpleServer = createServerFn({
  method: "GET",
})
  .inputValidator(() => {})
  .handler(async () => {
    const lmAllSimple = await axios
      .get("http://localhost:8001/api/nb/largemonster/all/simple")
      .then((res) => {
        const validatedRes = LargeMonsterListType.parse(res.data);
        return validatedRes;
      })
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });
    return lmAllSimple ?? null;
  });

// user driven reqs are usualy posts
// server loaders/prefetch are usually gets

// this runs in createFileRoute loader AND useSuspenseQuery in component
// this is queryOptions func, this needs to be passed to a query function!
// can this be used in form mutatoin?
export const getLMAllSimple = () => {
  return queryOptions({
    queryKey: ["largeMonsterAllSimpleServer"],
    queryFn: () => getLargeMonsterAllSimpleServer(),
  });
};

// export const getSOMETHINGServer = createServerFn({
//   method: "POST",
// })
//   .inputValidator(() => {})
//   .handler(async (data) => {
//     const lm = await axios
//       .post("http://localhost:8001/api/nb/", data)
//       .then((res) => {
//         const validatedRes = _Type.parse(res.data);
//         return validatedRes;
//       })
//       .catch((err) => {
//         console.error(err);
//         if (err.status === 404) {
//           throw notFound();
//         }
//         throw err;
//       });
//     return lm;
//   });

export const getLMByGameId = (data) => {
  console.info("fetching lm by game id: ", data);

  return queryOptions({
    queryKey: ["largeMonsterByGameIdServer"],
    queryFn: () => getLMByGameIdPost(data),
  });
};

export const getLMByGameIdPost = async (data) => {
  const lm = await axios
    .post("http://localhost:8001/api/nb/largemonster", data)
    .then((res) => {
      const validatedRes = LargeMonsterType.parse(res.data);
      return validatedRes;
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 404) {
        throw notFound();
      }
      throw err;
    });

  return lm;
};

// this is used in search form
export const getLMByName = (data) => {
  console.info("fetching lm by name: ", data);

  return queryOptions({
    queryKey: ["largeMonsterByNameServer"],
    queryFn: () => getLMByNamePost(data),
  });
};

export const getLMByNamePost = async (data) => {
  const lm = await axios
    .post("http://localhost:8001/api/nb/largemonster", data)
    .then((res) => {
      const validatedRes = LargeMonsterType.parse(res.data);
      console.info("validated res of post req", validatedRes);
      return validatedRes;
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 404) {
        throw notFound();
      }
      throw err;
    });

  return lm;
};
