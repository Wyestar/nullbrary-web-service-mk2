import * as z from "zod";
import { useFieldContext } from "./sidebarFormHooks.tsx";

export function LargeMonsterNameField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <label>
      <span>{label}</span>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}

export function LargeMonsterNameSubmit() {
  return (
    <button style={{ cursor: "pointer " }} type="submit">
      lm name submit btn
    </button>
  );
}
