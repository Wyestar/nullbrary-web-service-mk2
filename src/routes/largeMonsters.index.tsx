import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/largeMonsters/")({
  component: LargeMonstersIndexComponent,
});

function LargeMonstersIndexComponent() {
  return <div>lm index</div>;
}
