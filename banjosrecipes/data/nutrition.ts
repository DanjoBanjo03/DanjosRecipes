// Approximate whole-batch macros for the recipe's baseServings, not laboratory analysis.
// Carbohydrate includes fibre. Calories use the general 4/4/9 estimate.
export type NutritionEstimate = { carbs: number; fat: number; protein: number; assumptions: string }
export const nutrition: Record<string, NutritionEstimate> = {
 "shrimp-marinade": {carbs:8,fat:30,protein:94,assumptions:"Assumes 1 lb raw peeled shrimp and all the marinade oil is eaten. No sides included."},
 "chipotle-southwest-sauce": {carbs:8,fat:82,protein:1,assumptions:"Uses regular full-fat mayonnaise. A serving is one-eighth of the sauce batch, roughly a tablespoon."},
 "chili": {carbs:296,fat:74,protein:184,assumptions:"Uses two cups of dry beans and 85% lean beef, with no fat drained. Includes optional pepper and celery; excludes rice, cheese and other toppings."},
 "tiramisu": {carbs:240,fat:205,protein:44,assumptions:"Uses full-fat mascarpone, heavy cream and 200 g ladyfingers. Excludes the alternative cream-cheese mixture and optional alcohol; includes a light cocoa dusting."},
 "guacamole": {carbs:73,fat:89,protein:15,assumptions:"Assumes four medium avocados with about 600 g edible flesh total, bell pepper and lime juice. Excludes chips."},
 "salsa": {carbs:27,fat:15,protein:6,assumptions:"Assumes six medium Roma tomatoes, one lemon and all the listed olive oil. Excludes chips."},
 "pico-de-gallo": {carbs:28,fat:1,protein:6,assumptions:"Assumes six medium Roma tomatoes and half a medium red onion. Excludes chips and other sides."},
 "miso-soup": {carbs:35,fat:8,protein:20,assumptions:"Uses vegetable broth, 3½ tbsp miso, firm tofu and the optional nori. Brands of broth and miso vary."},
 "sweet-and-sour-chicken": {carbs:200,fat:65,protein:120,assumptions:"Includes the full batter and sauce, plus an estimated 3 tbsp absorbed frying oil per base batch. Excludes rice and optional garnish."},
 "cream-puffs": {carbs:430,fat:344,protein:105,assumptions:"Includes all custard, pastry, chocolate topping and egg wash; uses whole milk and heavy cream. One person gets one-twelfth of the batch, not necessarily one puff."},
 "green-salad-dressing": {carbs:52,fat:74,protein:4,assumptions:"Uses sugar rather than honey and 1½ tbsp soy sauce. Includes all the oil; excludes the salad itself."},
 "ramen": {carbs:155,fat:65,protein:125,assumptions:"Assumes 400 g raw skin-on boneless chicken total and plain dried noodles, not fried instant noodles. Includes eggs, broth and oils; excludes optional chilli."},
 "pizza": {carbs:230,fat:85,protein:60,assumptions:"Uses about 270 g flour, the optional cup of mozzarella and the entire sauce batch. Excludes dusting flour. Leaving sauce unused reduces the actual total."},
 "mongolian-beef": {carbs:71,fat:58,protein:106,assumptions:"Includes the marinade oil plus an estimated 2 tbsp cooking oil per base batch. Assumes medium onions; excludes rice."},
 "korean-popcorn-chicken": {carbs:122,fat:117,protein:146,assumptions:"Uses skinless chicken thighs and all the listed coating and sauce, plus an estimated 3 tbsp absorbed frying oil per base batch. Excludes rice."}
}
export function macroValues(slug: string, baseServings: number, people: number, total: boolean) {
 const estimate=nutrition[slug]
 if(!estimate)return null
 const factor=total?people/baseServings:1/baseServings
 return {carbs:estimate.carbs*factor,fat:estimate.fat*factor,protein:estimate.protein*factor,calories:(4*(estimate.carbs+estimate.protein)+9*estimate.fat)*factor}
}
