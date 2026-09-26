import type { Metadata } from "next"
import DinnerPlanner from "./DinnerPlanner"
export const metadata: Metadata = {
  title: "Dinner Timeline | Danjo Recipes",
  description: "Plan several recipes around one serving time, with live countdowns for when to start each dish.",
}
export default function DinnerPage() { return <DinnerPlanner /> }
