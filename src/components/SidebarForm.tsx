import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useAppForm } from "../forms/sidebarFormHooks.tsx";
import {
  getLMByNameOptions,
  getLMByNameQuery,
  getLMByNameGet,
} from "../api/largeMonsters.tsx";

export function SidebarForm({ children }: { children?: any }) {
  // const mutation = useMutation({
  //   mutationFn: async (value) => {
  //     await getLMByNameGet(value);
  //   },
  // });
  const navigate = useNavigate();
  const form = useAppForm({
    defaultValue: {
      largeMonsterName: "enter monster name default",
    },
    onSubmit: async ({ value }) => {
      // form onsubmit has 'navigation' property
      const lmNameLowercase = value.largeMonsterName.toLowerCase();
      navigate({
        to: "/largeMonsters/$largeMonsterName",
        params: { largeMonsterName: lmNameLowercase },
      });

      // const params = {
      //   "lm-name": value.largeMonsterName,
      //   "lm-species": "asdf",
      // };
      // await useQuery(getLMByNameOptions(params));
      // Mar 23; how to avoid declaring all req vars before
      // want to use queryOptions
      // don't want to call axios funcs directly in comps
      // how to use mutate with get/post mix

      // await mutation.mutate(value);
    },
  });

  return (
    <div className="space-y-2 p-2">
      <Link
        to="/largeMonsters"
        className="bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm"
      >
        Link to see all large monsters.
      </Link>
      <div className="text-gray-600 dark:text-gray-400">
        Search by large monster name:
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="largeMonsterName"
          children={(field) => (
            <field.LargeMonsterNameField label="LM label: " />
          )}
        />
        <form.AppForm>
          <form.LargeMonsterNameSubmit />
        </form.AppForm>
      </form>
      <p>lm by name request info:</p>
      {/*{mutation.isSuccess && <p>lm by name post req success</p>}*/}
    </div>
  );
}
