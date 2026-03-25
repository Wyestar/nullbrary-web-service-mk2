import { queryOptions, useQuery, useMutation } from "@tanstack/react-query";
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

// get all lm. for main /lm page
export const getLMAllSimpleServer = createServerFn({
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

export const getLMAllSimpleOptions = () => {
  return queryOptions({
    queryKey: ["lmAllSimpleServer"],
    queryFn: () => getLMAllSimpleServer(),
  });
};

// getLMAllAdvanced

// =============================================

export const getLMByNameOptions = (data) => {
  console.info("options lm by name: ", data);

  // options are good for using set cache keys
  // and known possible options
  // if from server query will have 'Server' at end of key
  return queryOptions({
    queryKey: ["lmByName", data],
    queryFn: () => getLMByNameReq(data),
  });
};

export const getLMByNameReq = async (data) => {
  const lm = await axios
    .get("http://localhost:8001/api/nb/", { params: data })
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

  return lm;
};

// API notes
// 1. Options; takes arg, return queryOptions object
// 2. Query; useQuery for use in components. when called takes options
// 3. Req; client side req, direct axios usage
// 4. Server; server side with createServerFn

// useQuery(optionsFunc(arg))

// strict-origin-when-cross-origin
// Access-Control-Allow-Origin

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

// =========================================================
// internal admin api
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
