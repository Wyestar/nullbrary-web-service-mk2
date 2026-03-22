import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";

import { useAppForm } from "../forms/sidebarFormHooks.tsx";
import { getLMByName } from "../api/largeMonsters.tsx";

export function SidebarForm({ children }: { children?: any }) {
  const mutation = useMutation({
    mutationFn: async (value) => {
      await getLMByName(value);
    },
  });

  const form = useAppForm({
    defaultValue: {
      largeMonsterName: "enter monster name",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return (
    <div className="space-y-2 p-2">
      <Link
        to="/largeMonsters"
        className="bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm"
      >
        See all large monsters.
      </Link>
      <div className="text-gray-600 dark:text-gray-400">
        Search by large monster name:
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="largeMonsterName"
          children={(field) => (
            <field.LargeMonsterNameField label="LM name: " />
          )}
        />
        <form.AppForm>
          <form.LargeMonsterNameSubmit />
        </form.AppForm>
      </form>

      {mutation.isSuccess && <p>lm by name post req success!</p>}
    </div>
  );
}
