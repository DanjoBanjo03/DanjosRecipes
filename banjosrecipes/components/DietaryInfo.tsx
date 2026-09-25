import { dietary } from "@/data/dietary"

export function DietaryTags({ slug }: { slug: string }) {
  const info = dietary[slug]
  if (!info?.tags.length) return null
  return <div className="dietaryTags">{info.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
}

export function DietaryInfo({ slug }: { slug: string }) {
  const info = dietary[slug]
  return <section className="dietaryPanel" aria-labelledby="dietary-title">
    <h2 id="dietary-title">Dietary &amp; allergen notes</h2>
    <DietaryTags slug={slug}/>
    {info ? <>
      <p><strong>Listed allergens: </strong>{info.contains.length ? info.contains.join(" · ") : "None identified in the core ingredients; see checks below."}</p>
      <ul>{info.checks.map(note => <li key={note}>{note}</li>)}</ul>
      {!!info.adaptations?.length && <><h3>With ingredient changes or label checks</h3><ul>{info.adaptations.map(note => <li key={note}>{note}</li>)}</ul></>}
    </> : <p>This recipe’s dietary information has not been reviewed yet.</p>}
    <p className="dietaryCaution">Based on the written recipe, not an allergy-safe guarantee. Check every product label and avoid cross-contact. Swaps and toppings can change these flags. <a href="https://foodallergycanada.org/living-with-allergies/day-to-day-management/kitchen-tips-and-recipes/" target="_blank" rel="noreferrer">Allergy-aware cooking guidance</a></p>
  </section>
}
