import { createFormHookContexts, createFormHook } from "@tanstack/react-form";

import {
  LargeMonsterNameField,
  LargeMonsterNameSubmit,
} from "./sidebarFormInputs.tsx";

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    LargeMonsterNameField,
  },
  formComponents: {
    LargeMonsterNameSubmit,
  },
});
