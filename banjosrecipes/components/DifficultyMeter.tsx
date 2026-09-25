import type { Recipe } from "@/data/recipes"

const levels = {
  1: { label: "Easy", description: "Simple preparation and straightforward steps." },
  2: { label: "Medium", description: "More preparation, multiple stages or careful cooking." },
  3: { label: "Hard", description: "More involved techniques and precise timing." },
}

export function DifficultyMeter({ level, explain = false }: { level: Recipe["difficulty"]; explain?: boolean }) {
  const { label, description } = levels[level]
  const meter = <span className="difficultyMeter" aria-label={`Effort: ${label}, ${level} of 3`}>
    <span className="difficultyBars" aria-hidden="true">{[1, 2, 3].map(bar => <i key={bar} className={bar <= level ? "filled" : undefined} />)}</span>
    <span>{label}</span><span className="difficultyLevel" aria-hidden="true">{level}/3</span>
  </span>
  return explain ? <div className="detailDifficulty">{meter}<p className="difficultyExplanation">{description} Rated for hands-on effort, not waiting time.</p></div> : meter
}
