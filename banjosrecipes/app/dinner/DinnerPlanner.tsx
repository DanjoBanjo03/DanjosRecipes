"use client"
import Link from "next/link"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { recipes } from "@/data/recipes"
import { countdown, dinnerTimeline, recipeMinutes } from "@/lib/dinner-timeline"
import { parsePlan, readPlan, savePlan, subscribePlan } from "@/lib/dinner-plan"

function localInput(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
function clockTime(time: number) {
  return new Date(time).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}
export default function DinnerPlanner() {
  const raw = useSyncExternalStore(subscribePlan, readPlan, () => "")
  const plan = useMemo(() => parsePlan(raw), [raw])
  const [slugs, setSlugs] = useState<string[]>([])
  const [finish, setFinish] = useState("")
  const [error, setError] = useState("")
  const [now, setNow] = useState(0)
  useEffect(() => {
    const tick = () => setNow(Date.now())
    const timer = window.setInterval(tick, 1000)
    window.addEventListener("focus", tick)
    return () => { clearInterval(timer); window.removeEventListener("focus", tick) }
  }, [])
  const selected = recipes.filter(r => slugs.includes(r.slug))
  const planned = plan ? recipes.filter(r => plan.slugs.includes(r.slug)) : []
  const timeline = plan ? dinnerTimeline(planned, plan.finishAt) : []
  function soonest() {
    if (!selected.length) { setError("Choose at least one recipe first."); return }
    setFinish(localInput(new Date(Math.ceil(Date.now() / 60_000) * 60_000 + Math.max(...selected.map(recipeMinutes)) * 60_000)))
    setError("")
  }
  function start(event: React.FormEvent) {
    event.preventDefault()
    const finishAt = new Date(finish).getTime()
    if (!selected.length) { setError("Choose at least one recipe."); return }
    if (!Number.isFinite(finishAt) || finishAt <= Date.now()) { setError("Choose a serving time in the future."); return }
    if (dinnerTimeline(selected, finishAt)[0].startAt < Date.now() - 60_000) {
      setError("There isn’t enough time for the longest recipe. Choose a later serving time or use Earliest serving time."); return
    }
    setNow(Date.now())
    savePlan({ slugs, finishAt, started: [], done: [] })
    setError("")
  }
  function mark(slug: string, field: "started" | "done") {
    const current = parsePlan(readPlan())
    if (!current) return
    const list = current[field]
    savePlan({ ...current, [field]: list.includes(slug) ? list.filter(s => s !== slug) : [...list, slug] })
  }
  function edit() {
    if (plan) { setSlugs(plan.slugs); setFinish(localInput(new Date(plan.finishAt))) }
    savePlan(null)
    setError("")
  }
  const due = now && plan ? timeline.filter(item => item.startAt <= now && !plan.started.includes(item.recipe.slug) && !plan.done.includes(item.recipe.slug)) : []
  return <main className="container dinnerPlanner">
    <Link className="back" href="/recipes">← Back to the collection</Link>
    <p className="eyebrow">EVERYTHING AT THE TABLE, TOGETHER</p>
    <h1>Dinner timeline</h1>
    <p className="intro">Choose your dishes and when you want to eat. We’ll count down to each start time.</p>
    <p className="dinnerNote">Uses the base recipe’s estimated prep, cook and resting times. Allow extra time for bigger batches or shared pans, burners and oven space. A countdown is a planning guide, not a doneness check.</p>
    {!plan ? <form onSubmit={start}>
      <fieldset className="dinnerChoices"><legend>1. Choose your dishes</legend>
        {recipes.map(recipe => <label key={recipe.slug}><input type="checkbox" checked={slugs.includes(recipe.slug)} onChange={() => setSlugs(current => current.includes(recipe.slug) ? current.filter(s => s !== recipe.slug) : [...current, recipe.slug])}/><span><strong>{recipe.title}</strong><small>{recipeMinutes(recipe)} min total · base recipe for {recipe.baseServings}</small></span></label>)}
      </fieldset>
      <div className="dinnerSetup"><label htmlFor="serve-at">2. Serving time (your local time)</label><input id="serve-at" type="datetime-local" required value={finish} onChange={event => setFinish(event.target.value)}/><button type="button" onClick={soonest}>Earliest serving time</button><button className="primary" type="submit">Start timeline</button></div>
      {error && <p className="dinnerError" role="alert">{error}</p>}
    </form> : <>
      <section className="dinnerCountdown" aria-label="Serving countdown">
        <p>Serve at {clockTime(plan.finishAt)}</p>
        <strong>{!now ? "Loading countdown…" : now < plan.finishAt ? countdown(plan.finishAt - now) : "Serving time reached"}</strong>
        <p>{plan.done.length === plan.slugs.length ? "All dishes marked ready." : "Mark each dish as started, then ready when it’s done."}</p>
      </section>
      <p className="dinnerNotice" role="status">{due.length ? `Time to start: ${due.map(item => item.recipe.title).join(", ")}.` : "Your next start time will be highlighted here."}</p>
      {planned.length !== plan.slugs.length && <p role="alert">A recipe in this saved plan is no longer available. Edit the plan to update it.</p>}
      <ol className="dinnerTimeline">{timeline.map(({ recipe, startAt }) => {
        const done = plan.done.includes(recipe.slug)
        const started = plan.started.includes(recipe.slug)
        const isDue = !!now && now >= startAt && !started && !done
        return <li key={recipe.slug} className={isDue ? "dishDue" : ""}>
          <div><h2>{recipe.title}</h2><p>Start {clockTime(startAt)} · {recipeMinutes(recipe)} min total</p>
            <p className="dishStatus">{done ? "Ready" : started ? "In progress" : !now ? "Loading…" : isDue ? `Start now · ${countdown(now - startAt)} past planned start` : `Start in ${countdown(startAt - now)}`}</p>
            {isDue && now - startAt >= 60_000 && <p className="dinnerNote">Starting late may push this dish past serving time.</p>}
            {recipe.restMinutes > 0 && <p className="dinnerNote">Includes {recipe.restMinutes} min {recipe.restLabel.toLowerCase() || "resting"}. Follow the recipe for the order of steps.</p>}
          </div>
          <div className="dishActions"><button type="button" aria-pressed={started} onClick={() => mark(recipe.slug, "started")} disabled={done}>{started ? "Started" : "Mark started"}</button><button type="button" aria-pressed={done} onClick={() => mark(recipe.slug, "done")}>{done ? "Ready ✓" : "Mark ready"}</button><Link href={`/recipes/${recipe.slug}`} target="_blank" rel="noreferrer">Open recipe ↗</Link></div>
        </li>
      })}</ol>
      <button className="dinnerEdit" type="button" onClick={edit}>Edit / start a new plan</button>
      <p className="dinnerNote">Saved in this browser. Reloading keeps your plan; keep this page open to see start reminders. No background notifications or alarms.</p>
    </>}
  </main>
}
