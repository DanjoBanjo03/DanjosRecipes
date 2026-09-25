export type Ingredient = { name: string; amount?: number; maximum?: number; unit?: string; heading?: boolean }
export type Recipe = { prepMinutes: number; cookMinutes: number; restMinutes: number; restLabel: string; timeNote: string; slug: string; title: string; category: string; ingredients: Ingredient[]; steps: string[]; note: string | null; source: string | null; number: number; baseServings: number; servingNote: string; mealPrep?: boolean;  references: {title: string; url: string}[] }
export const recipes: Recipe[] = [
  {
    "slug": "shrimp-marinade",
    "title": "Shrimp",
    "category": "Mains",
    "ingredients": [
      {
        "name": "peeled, deveined shrimp",
        "unit": "lb",
        "amount": 1.0
      },
      {
        "name": "red pepper flakes",
        "unit": "tsp",
        "amount": 0.5
      },
      {
        "name": "salt, then adjust to taste",
        "unit": "tsp",
        "amount": 0.5
      },
      {
        "name": "dried oregano",
        "unit": "tsp",
        "amount": 1.0
      },
      {
        "name": "garlic cloves, minced",
        "unit": "",
        "amount": 3.0
      },
      {
        "name": "olive oil",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "lemon juice",
        "unit": "tbsp",
        "amount": 1.0
      }
    ],
    "note": "Suggested quantities and cooking method added for a four-person main course.",
    "source": null,
    "number": 1,
    "baseServings": 4,
    "servingNote": "Estimated main-course portions.",
    "steps": [
      "Toss the shrimp with the olive oil, garlic, oregano, pepper flakes, salt, and lemon juice. Marinate in the refrigerator for 10–15 minutes.",
      "Heat a wide skillet over medium-high heat. Cook shrimp in a single layer, in batches if needed, for about 2–3 minutes per side, until the flesh is pearly and opaque.",
      "Taste and adjust the seasoning. Serve promptly."
    ],
    "references": [
      {
        "title": "Cooking temperature guide",
        "url": "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
      }
    ],
    "prepMinutes": 10,
    "cookMinutes": 6,
    "restMinutes": 15,
    "restLabel": "Marinating",
    "timeNote": "Allows 15 minutes to marinate; cook shrimp in a single layer."
  },
  {
    "slug": "chipotle-southwest-sauce",
    "title": "Chipotle Southwest",
    "category": "Sauces & sides",
    "ingredients": [
      {
        "name": "mayonnaise",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "lime juice",
        "amount": 2.0,
        "unit": "tsp"
      },
      {
        "name": "sugar",
        "amount": 1.0,
        "unit": "tsp"
      },
      {
        "name": "minced fresh cilantro",
        "amount": 1.0,
        "unit": "tsp"
      },
      {
        "name": "paprika",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "white vinegar",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "water",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "salt",
        "amount": 0.25,
        "unit": "tsp"
      },
      {
        "name": "garlic powder",
        "amount": 0.25,
        "unit": "tsp"
      },
      {
        "name": "ground chipotle Chile",
        "amount": 0.25,
        "unit": "tsp"
      },
      {
        "name": "dried thyme",
        "amount": 1.0,
        "unit": "pinch"
      },
      {
        "name": "ground cumin",
        "amount": 1.0,
        "unit": "pinch"
      }
    ],
    "note": "Suggested mixing and chilling instructions added; servings assume condiment-sized portions.",
    "source": null,
    "number": 2,
    "baseServings": 8,
    "servingNote": "Estimated small side / condiment portions.",
    "steps": [
      "Stir all ingredients together until smooth.",
      "Cover and refrigerate for 30 minutes to let the flavours blend. Taste and adjust the lime, salt, or chipotle as desired."
    ],
    "references": [],
    "prepMinutes": 5,
    "cookMinutes": 0,
    "restMinutes": 30,
    "restLabel": "Chilling",
    "timeNote": "Includes 30 minutes for the flavours to blend."
  },
  {
    "slug": "chili",
    "title": "Chili",
    "category": "Mains",
    "ingredients": [
      {
        "name": "dried black beans",
        "unit": "cup",
        "amount": 1.0
      },
      {
        "name": "dried kidney beans",
        "unit": "cup",
        "amount": 1.0
      },
      {
        "name": "Water, enough to soak and cover the beans",
        "unit": ""
      },
      {
        "name": "salt, then adjust to taste",
        "unit": "tsp",
        "amount": 1.0
      },
      {
        "name": "bay leaves",
        "unit": "",
        "amount": 2.0
      },
      {
        "name": "ground beef",
        "unit": "lb",
        "amount": 1.0
      },
      {
        "name": "ground cumin",
        "unit": "tsp",
        "amount": 2.0
      },
      {
        "name": "paprika",
        "unit": "tsp",
        "amount": 2.0
      },
      {
        "name": "chilli powder, or minced canned chipotle to taste",
        "unit": "tbsp",
        "amount": 1.0
      },
      {
        "name": "garlic cloves, chopped",
        "unit": "",
        "amount": 3.0
      },
      {
        "name": "white onion, diced",
        "unit": "",
        "amount": 1.0
      },
      {
        "name": "fresh tomatoes, diced",
        "unit": "",
        "amount": 2.0
      },
      {
        "name": "canned diced tomatoes, with their juice",
        "unit": "g",
        "amount": 400.0
      },
      {
        "name": "green bell pepper, diced (optional)",
        "unit": "",
        "amount": 1.0
      },
      {
        "name": "celery stalks, diced (optional)",
        "unit": "",
        "amount": 2.0
      },
      {
        "name": "chopped fresh cilantro",
        "unit": "cup",
        "amount": 0.25
      }
    ],
    "note": "Suggested quantities added. The bean method includes a full boil before simmering.",
    "source": null,
    "number": 3,
    "baseServings": 6,
    "servingNote": "Estimated main-course portions.",
    "steps": [
      "Soak the dried beans in plenty of water for at least 5 hours or overnight. Drain and rinse.",
      "Cover with fresh water, bring to a vigorous boil, and boil for 30 minutes. Add bay leaves, then simmer until tender, usually another 45–90 minutes. Keep some bean cooking liquid.",
      "In a frying pan, cook ground beef with salt, a good amount of cumin, paprika, and chilli if you like it spicy (the notes suggest canned chipotle peppers).",
      "Add chopped garlic when the beef is almost cooked.",
      "Fry diced white onions separately, then add to the beef.",
      "Add diced fresh tomatoes and canned tomatoes.",
      "Add diced green peppers and celery, optionally.",
      "Mix everything with the tender beans. Add reserved bean liquid as needed and simmer for at least one hour, stirring occasionally.",
      "At the end, add chopped fresh cilantro."
    ],
    "references": [
      {
        "title": "Dried bean preparation guide",
        "url": "https://www.fda.gov/food/chemical-contaminants-pesticides/natural-toxins-food"
      }
    ],
    "prepMinutes": 25,
    "cookMinutes": 150,
    "restMinutes": 480,
    "restLabel": "Soaking",
    "timeNote": "Includes an 8-hour overnight soak, about 90 minutes for the beans and a 1-hour simmer. Bean age can change cooking time."
  },
  {
    "slug": "tiramisu",
    "title": "Tiramisu",
    "category": "Desserts",
    "ingredients": [
      {
        "name": "heavy whipping cream",
        "unit": "cup",
        "amount": 1.0
      },
      {
        "name": "mascarpone, room temperature",
        "unit": "g",
        "amount": 225.0
      },
      {
        "name": "sugar",
        "unit": "cup",
        "amount": 0.3333333333333333
      },
      {
        "name": "vanilla extract",
        "unit": "tsp",
        "amount": 1.0
      },
      {
        "name": "Amaretto or brandy (optional)",
        "unit": "tbsp",
        "amount": 1.0
      },
      {
        "name": "strong coffee or espresso, cooled (dip as needed)",
        "unit": "cups",
        "amount": 2.0
      },
      {
        "name": "ladyfingers",
        "unit": "g",
        "amount": 200.0
      },
      {
        "name": "Cocoa powder, for dusting",
        "unit": ""
      },
      {
        "name": "Mascarpone substitute (use instead)",
        "heading": true
      },
      {
        "name": "softened cream cheese",
        "unit": "oz",
        "amount": 6.0
      },
      {
        "name": "sour cream",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "heavy cream",
        "unit": "tbsp",
        "amount": 3.0
      }
    ],
    "note": "Suggested assembly method and a 200 g ladyfinger pack added. Use the substitute only instead of mascarpone.",
    "source": null,
    "number": 4,
    "baseServings": 8,
    "servingNote": "Estimated dessert portions.",
    "steps": [
      "If using the mascarpone substitute, beat its three ingredients together until smooth and use it in place of the mascarpone.",
      "Whip the main cream with the sugar and vanilla until it holds soft peaks. Fold in the mascarpone and optional liquor gently, just until combined.",
      "Quickly dip ladyfingers in cooled coffee and arrange a layer in a dish. Spread with half the cream mixture, then repeat. Use a dish that fits two layers without forcing in extra biscuits or coffee.",
      "Cover and chill for at least 4 hours, preferably overnight. Dust with cocoa just before serving."
    ],
    "references": [
      {
        "title": "Tiramisu method reference",
        "url": "https://www.biggerbolderbaking.com/easy-10-minute-tiramisu/"
      }
    ],
    "prepMinutes": 20,
    "cookMinutes": 0,
    "restMinutes": 240,
    "restLabel": "Chilling",
    "timeNote": "Includes a minimum 4-hour chill. Chilling overnight is also an option."
  },
  {
    "slug": "guacamole",
    "title": "Guacamole",
    "category": "Sauces & sides",
    "ingredients": [
      {
        "name": "avocados",
        "unit": "",
        "amount": 4.0
      },
      {
        "name": "onion",
        "unit": "",
        "amount": 0.25
      },
      {
        "name": "garlic clove",
        "unit": "",
        "amount": 1.0
      },
      {
        "name": "bell pepper",
        "unit": "",
        "amount": 0.5
      },
      {
        "name": "jalapeños, seeds removed for less heat",
        "unit": "",
        "amount": 2.0
      },
      {
        "name": "lemons or limes, juiced; add gradually to taste",
        "unit": "",
        "amount": 1.5
      },
      {
        "name": "coriander",
        "unit": "bunch",
        "amount": 1.0
      },
      {
        "name": "salt, then adjust to taste",
        "unit": "tsp",
        "amount": 0.5
      },
      {
        "name": "Water, a splash only if needed to blend",
        "unit": ""
      }
    ],
    "note": "Bell pepper and a starting salt quantity are suggested interpretations of the original notes.",
    "source": null,
    "number": 5,
    "baseServings": 8,
    "servingNote": "Estimated small side / condiment portions.",
    "steps": [
      "Mix everything in a blender.",
      "If the guacamole starts turning black, add a bit of lemon juice."
    ],
    "references": [],
    "prepMinutes": 10,
    "cookMinutes": 0,
    "restMinutes": 0,
    "restLabel": "",
    "timeNote": "Ready after blending; no cooking needed."
  },
  {
    "slug": "salsa",
    "title": "Salsa",
    "category": "Sauces & sides",
    "ingredients": [
      {
        "name": "Roma tomatoes, roughly chopped",
        "unit": "",
        "amount": 6.0
      },
      {
        "name": "lemon, juiced; add gradually to taste",
        "unit": "",
        "amount": 1.0
      },
      {
        "name": "jalapeño, seeded for less heat",
        "unit": "",
        "amount": 1.0
      },
      {
        "name": "salt, then adjust to taste",
        "unit": "tsp",
        "amount": 0.5
      },
      {
        "name": "ground black pepper",
        "unit": "tsp",
        "amount": 0.25
      },
      {
        "name": "olive oil",
        "unit": "tbsp",
        "amount": 1.0
      },
      {
        "name": "fresh coriander",
        "unit": "cup",
        "amount": 0.25
      }
    ],
    "note": "Suggested quantities and preparation added.",
    "source": null,
    "number": 6,
    "baseServings": 6,
    "servingNote": "Estimated small side / condiment portions.",
    "steps": [
      "Pulse the tomatoes, jalapeño, and coriander until coarsely chopped.",
      "Stir in olive oil, salt, pepper, and lemon juice gradually. Taste and adjust; briefly blend further if you prefer a smoother salsa.",
      "Refrigerate for 20–30 minutes before serving."
    ],
    "references": [],
    "prepMinutes": 10,
    "cookMinutes": 0,
    "restMinutes": 25,
    "restLabel": "Chilling",
    "timeNote": "Includes 25 minutes of chilling before serving."
  },
  {
    "slug": "pico-de-gallo",
    "title": "Pico De Gallo",
    "category": "Sauces & sides",
    "ingredients": [
      {
        "name": "Roma (plum) tomatoes, diced",
        "amount": 6.0,
        "unit": ""
      },
      {
        "name": "red onion, minced",
        "amount": 0.5,
        "unit": ""
      },
      {
        "name": "chopped fresh cilantro",
        "amount": 3.0,
        "unit": "tbsp"
      },
      {
        "name": "jalapeño pepper, seeded and minced",
        "amount": 0.5,
        "unit": ""
      },
      {
        "name": "lime, juiced",
        "amount": 0.5,
        "unit": ""
      },
      {
        "name": "clove garlic, minced",
        "amount": 1.0,
        "unit": ""
      },
      {
        "name": "garlic powder",
        "amount": 1.0,
        "unit": "pinch"
      },
      {
        "name": "ground cumin, or to taste",
        "amount": 1.0,
        "unit": "pinch"
      },
      {
        "name": "salt and ground black pepper to taste"
      }
    ],
    "note": null,
    "source": null,
    "number": 7,
    "baseServings": 6,
    "servingNote": "Estimated small side / condiment portions.",
    "steps": [
      "Stir the tomatoes, onion, cilantro, jalapeño pepper, lime juice, garlic, garlic powder, cumin, salt, and pepper together in a bowl.",
      "Refrigerate at least 3 hours before serving"
    ],
    "references": [],
    "prepMinutes": 15,
    "cookMinutes": 0,
    "restMinutes": 180,
    "restLabel": "Chilling",
    "timeNote": "Includes the 3-hour refrigeration time from the method."
  },
  {
    "slug": "miso-soup",
    "title": "Miso Soup",
    "category": "Soups",
    "ingredients": [
      {
        "name": "vegetable broth or dashi",
        "amount": 4.0,
        "unit": "cups"
      },
      {
        "name": "nori, cut into rectangles (optional)",
        "amount": 1.0,
        "unit": "sheet"
      },
      {
        "name": "white or yellow miso paste (fermented soy bean or chickpea paste) with or without bonito (fish flavour, though bonito makes it non vegan-vegetarian-friendly)",
        "amount": 3.0,
        "unit": "tbsp",
        "maximum": 4.0
      },
      {
        "name": "chopped green chard or other sturdy green",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "chopped green onion",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "firm tofu (cubed // use silken tofu for more traditional miso soup)",
        "amount": 0.25,
        "unit": "cup"
      }
    ],
    "note": null,
    "source": null,
    "number": 8,
    "baseServings": 4,
    "servingNote": "Estimated soup portions.",
    "steps": [
      "Place vegetable broth in a medium sauce pan and bring to a low simmer.",
      "In the meantime, place miso (starting with lesser end of range) into a small bowl, add a little hot water and whisk until smooth.",
      "This will ensure it doesn’t clump when added to the soup later.",
      "Set aside.",
      "To the broth add chard (or other greens of choice), green onion, and tofu (if using silken, add at the end of cooking) and cook for 5 minutes.",
      "Then add nori and stir.",
      "Remove from heat, add miso mixture, and stir to combine.",
      "Taste and add more miso or a pinch of sea salt if desired.",
      "Serve warm.",
      "Best when fresh."
    ],
    "references": [],
    "prepMinutes": 5,
    "cookMinutes": 10,
    "restMinutes": 0,
    "restLabel": "",
    "timeNote": "Includes bringing the broth to a simmer and cooking the greens."
  },
  {
    "slug": "sweet-and-sour-chicken",
    "title": "Sweet and Sour Chicken",
    "category": "Mains",
    "ingredients": [
      {
        "name": "boneless, skinless chicken breast",
        "amount": 1.0,
        "unit": "lb"
      },
      {
        "name": "salt, to taste"
      },
      {
        "name": "pepper, to taste"
      },
      {
        "name": "cornstarch",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "eggs, beaten",
        "amount": 2.0,
        "unit": ""
      },
      {
        "name": "oil, to fry"
      },
      {
        "name": "Sauce",
        "heading": true
      },
      {
        "name": "oil",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "garlic, minced",
        "amount": 0.5,
        "unit": "tbsp"
      },
      {
        "name": "bell pepper, diced",
        "amount": 1.0,
        "unit": ""
      },
      {
        "name": "cider vinegar",
        "amount": 0.75,
        "unit": "cup"
      },
      {
        "name": "soy sauce",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "ketchup",
        "amount": 0.25,
        "unit": "cup"
      },
      {
        "name": "sugar",
        "amount": 0.5,
        "unit": "cup"
      }
    ],
    "note": null,
    "source": null,
    "number": 9,
    "baseServings": 4,
    "servingNote": "Estimated main-course portions.",
    "steps": [
      "Season chicken with salt and pepper.",
      "Coat with cornstarch, dip in beaten egg.",
      "Fry until golden and crisp, with chicken reaching 165°F (74°C) in the centre.",
      "Set aside.",
      "Dab with paper towel if greasy.",
      "In a large pan, heat oil and fry garlic until fragrant.",
      "Add the bell pepper, cider vinegar, soy sauce, ketchup and sugar.",
      "Bring to a boil.",
      "When the sauce has thickened, add the fried chicken.",
      "Toss to coat.",
      "Garnish with chopped scallions and sesame seeds.",
      "Serve with rice."
    ],
    "references": [
      {
        "title": "Cooking temperature guide",
        "url": "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
      }
    ],
    "prepMinutes": 15,
    "cookMinutes": 20,
    "restMinutes": 0,
    "restLabel": "",
    "timeNote": "Allows time for frying and thickening the sauce; additional batches may take longer."
  },
  {
    "slug": "cream-puffs",
    "title": "Cream Puffs (Profiteroles)",
    "category": "Desserts",
    "ingredients": [
      {
        "name": "Custard Filling",
        "heading": true
      },
      {
        "name": "large egg",
        "amount": 1.0,
        "unit": ""
      },
      {
        "name": "large egg yolks",
        "amount": 4.0,
        "unit": ""
      },
      {
        "name": "milk (low-fat or whole, but not fat-free)",
        "amount": 3.0,
        "unit": "cups"
      },
      {
        "name": "sugar",
        "amount": 0.6666666666666666,
        "unit": "cup"
      },
      {
        "name": "all-purpose flour",
        "amount": 0.6666666666666666,
        "unit": "cup"
      },
      {
        "name": "salt",
        "amount": 0.25,
        "unit": "tsp"
      },
      {
        "name": "unsalted butter",
        "amount": 3.0,
        "unit": "tbsp"
      },
      {
        "name": "pure vanilla extract",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "heavy cream",
        "amount": 1.0,
        "unit": "cup"
      },
      {
        "name": "Choux Batter",
        "heading": true
      },
      {
        "name": "water",
        "amount": 1.0,
        "unit": "cup"
      },
      {
        "name": "unsalted butter",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "sugar",
        "amount": 2.0,
        "unit": "tsp"
      },
      {
        "name": "salt",
        "amount": 0.25,
        "unit": "tsp"
      },
      {
        "name": "all-purpose flour",
        "amount": 1.0,
        "unit": "cup"
      },
      {
        "name": "large eggs",
        "amount": 5.0,
        "unit": ""
      },
      {
        "name": "large egg, for egg wash",
        "amount": 1.0,
        "unit": ""
      },
      {
        "name": "water, for egg wash",
        "amount": 1,
        "unit": "tbsp"
      },
      {
        "name": "Chocolate Topping",
        "heading": true
      },
      {
        "name": "good quality semisweet chocolate chips",
        "amount": 0.6666666666666666,
        "unit": "cup"
      },
      {
        "name": "unsalted butter",
        "amount": 2.0,
        "unit": "tbsp"
      },
      {
        "name": "milk (low-fat or whole, but not fat-free)",
        "amount": 1.0,
        "unit": "tbsp",
        "maximum": 2.0
      }
    ],
    "note": null,
    "source": null,
    "number": 10,
    "baseServings": 12,
    "servingNote": "Estimated dessert portions.",
    "steps": [
      "For the Custard Filling: Whisk together the egg and egg yolks in a medium bowl and set aside.",
      "Whisk together the milk, sugar, flour, and salt in a medium saucepan; bring to a simmer over medium heat, stirring occasionally.",
      "Turn off the heat and very slowly ladle the hot milk mixture into the egg mixture while whisking, adding just a drop at a time at first.",
      "Transfer the custard back to the saucepan and bring it to a boil over medium heat; boil 2 minutes, whisking constantly.",
      "Turn the heat off and whisk in the butter and vanilla.",
      "Strain the custard through a fine mesh sieve to remove any lumps.",
      "Place a piece of plastic wrap directly on top of the custard (to prevent a skin from forming).",
      "Cool to room temperature, and then refrigerate to chill.",
      "Before filling the pastries, beat the custard until smooth with a handheld electric mixer.",
      "In a separate bowl, whip the cream to stiff peaks.",
      "Gently fold the whipped cream into the custard, adding ⅓ of the cream at a time.",
      "Pipe this mixture into the center of each pastry (see below for more detailed instructions on filling the pastries).",
      "For the Choux Batter: Preheat the oven to 400F and line enough large baking sheets with parchment paper.",
      "Bring the water, butter, sugar, and salt up to a boil in a medium saucepan over medium-high heat.",
      "Remove from heat, pour in all the flour, and beat vigorously with a wooden spoon to blend thoroughly.",
      "Put the saucepan back on the heat and continue to stir until the mixture thickens and forms a ball, and starts to film on the bottom of the pan, about 1 to 2 minutes.",
      "Turn the heat off and let the dough cool slightly, about 3 to 5 minutes, then make a well in the center of the dough, break an egg into it, and beat vigorously until the egg is absorbed; continue this way until all the dough eggs are incorporated.",
      "While the dough is still warm, use a 1½ tablespoon ice cream scoop to scoop out it out onto the prepared baking sheets, leaving about 2 inches between each pastry.",
      "Lightly dip a pastry brush into the egg wash and very gently brush the top of each puff, being careful not to let the egg wash drip down the puff onto the baking sheet (this will prevent the puffs from rising).",
      "Bake for 20 minutes (rotating the pans once halfway through), then turn heat down to 350F and bake until the puffs are golden brown and firm to the touch, about 5 to 15 minutes more, checking them every few minutes.",
      "Remove the puffs from the oven and immediately pierce the side of each with a sharp paring knife (so the steam can escape).",
      "Turn the oven off, put the pastries back into the oven, and let them sit in there for 10 minutes with the door ajar.",
      "After this, transfer them to a wire rack to finish cooling.",
      "To Fill the Puffs: Fit a pastry bag with a basic small-medium tip (I like to use a 3/16-inch tip); fill the bag with the custard filling.",
      "Once the puffs are completely cooled, insert the tip of the pastry bag into the puff through the slit that you cut to let the steam vent; gently squeeze the custard into the puff and continue this way until all the puffs are filled.",
      "For the Chocolate Topping: Melt the chocolate and butter together in a microwave or double boiler, then stir in enough milk to make it smooth.",
      "Spoon a little over each filled pastry and let the chocolate set before serving.",
      "Store any leftovers in the fridge."
    ],
    "references": [],
    "prepMinutes": 45,
    "cookMinutes": 45,
    "restMinutes": 120,
    "restLabel": "Cooling & chilling",
    "timeNote": "Allows cooling the custard, chilling the filling and cooling the pastry. Baking multiple trays may take longer."
  },
  {
    "slug": "green-salad-dressing",
    "title": "Green Salad Dressing",
    "category": "Sauces & sides",
    "ingredients": [
      {
        "name": "carrots roughly chopped",
        "amount": 1.0,
        "unit": "cup"
      },
      {
        "name": "onion peeled and roughly chopped",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "celery roughly chopped",
        "amount": 0.25,
        "unit": "cup"
      },
      {
        "name": "rice vinegar",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "canola oil",
        "amount": 0.3333333333333333,
        "unit": "cup"
      },
      {
        "name": "fresh grated ginger",
        "amount": 3.0,
        "unit": "tbsp"
      },
      {
        "name": "granulated sugar or honey",
        "amount": 2.0,
        "unit": "tbsp"
      },
      {
        "name": "soy sauce (I always buy GF and low sodium.)",
        "amount": 1.0,
        "unit": "tbsp",
        "maximum": 2.0
      },
      {
        "name": "small garlic clove",
        "amount": 1.0,
        "unit": ""
      }
    ],
    "note": null,
    "source": null,
    "number": 11,
    "baseServings": 12,
    "servingNote": "Estimated small side / condiment portions.",
    "steps": [
      "Roughly chop all the produce.",
      "Place in the blender.",
      "Add all other ingredients to the blender.",
      "If you are sensitive to sodium, start with the lower soy sauce amount.",
      "You can always add more if needed.",
      "Cover the blender and turn on high.",
      "Puree until smooth.",
      "Taste, then add more soy sauce if desired.",
      "Refrigerate until ready to serve."
    ],
    "references": [],
    "prepMinutes": 10,
    "cookMinutes": 0,
    "restMinutes": 0,
    "restLabel": "",
    "timeNote": "Ready after blending; refrigerate until serving."
  },
  {
    "slug": "ramen",
    "title": "Ramen",
    "category": "Soups",
    "ingredients": [
      {
        "name": "chicken breasts (boneless, skin-on)",
        "amount": 2.0,
        "unit": ""
      },
      {
        "name": "kosher salt and freshly-ground black pepper, to season"
      },
      {
        "name": "unsalted butter",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "sesame or vegetable oil",
        "amount": 2.0,
        "unit": "tsp"
      },
      {
        "name": "fresh ginger, minced",
        "amount": 2.0,
        "unit": "tsp"
      },
      {
        "name": "fresh garlic, minced",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "low-sodium soy sauce",
        "amount": 3.0,
        "unit": "tbsp"
      },
      {
        "name": "mirin",
        "amount": 2.0,
        "unit": "tbsp"
      },
      {
        "name": "rich chicken stock",
        "amount": 4.0,
        "unit": "cups"
      },
      {
        "name": "dried shiitake mushrooms",
        "amount": 1.0,
        "unit": "oz"
      },
      {
        "name": "sea salt, to taste",
        "amount": 1.0,
        "unit": "tsp",
        "maximum": 2.0
      },
      {
        "name": "large eggs",
        "amount": 2.0,
        "unit": ""
      },
      {
        "name": "scallions, sliced",
        "amount": 0.5,
        "unit": "cup"
      },
      {
        "name": "dried ramen noodles",
        "amount": 6.0,
        "unit": "oz"
      },
      {
        "name": "optional: fresh jalapeño or chili slices, for serving"
      }
    ],
    "note": null,
    "source": null,
    "number": 12,
    "baseServings": 2,
    "servingNote": "Estimated soup portions.",
    "steps": [
      "Cook the chicken*: Preheat the oven to 375℉.",
      "Season the chicken generously with salt and pepper.",
      "Melt the butter in a large oven-safe skillet over medium heat.",
      "Add the chicken, skin-side down, and cook until the skin is golden brown and releases easily from the pan, about 5-7 minutes.",
      "Flip the chicken over and cook for another 4-5 minutes, until golden.",
      "Transfer the skillet to the oven and roast for 15-20 minutes, until the chicken reaches 165°F (74°C).",
      "Remove from the oven, transfer the chicken to a plate and cover with foil until ready to serve.",
      "Make the ramen broth: Heat the oil in a large pot over medium heat, until shimmering.",
      "Add the garlic and ginger, and cook for a few minutes until softened.",
      "Add the soy sauce and mirin, and stir to combine.",
      "Cook for another minute.",
      "Add the stock, cover, and bring to boil.",
      "Remove the lid, and let simmer uncovered for 5 minutes, then add the dried mushrooms.",
      "Simmer gently for another 10 minutes, and season with salt, to taste.",
      "Make the soft-boiled eggs: Fill a pot with enough water to cover the eggs, and bring to a boil.",
      "Gently lower the eggs (still cold from the fridge) into the boiling water, and let simmer for 7 minutes (for a slightly-runny yoke) or 8 minutes (for a soft, but set-up yoke).",
      "Meanwhile, fill a large bowl with ice water.",
      "When the timer finishes, transfer the eggs to the ice bath to stop the cooking process.",
      "Wait at least 5 minutes, or until cool enough to handle, then carefully peel away the shell and slice in half, lengthwise.",
      "Set aside until ready to serve.",
      "Assemble the ramen bowls: Meanwhile, chop the scallions and jalapeño (if using).",
      "Slice the chicken into thin pieces.",
      "Set aside.",
      "When the eggs finish cooking, add the ramen noodles to the boiling water.",
      "Cook for 2-3 minutes, until soft, then divide the noodles into serving bowls.",
      "Add the sliced chicken and the ramen broth.",
      "Top with the fresh scallions, jalapeño and the soft boiled egg.",
      "Serve immediately."
    ],
    "references": [
      {
        "title": "Cooking temperature guide",
        "url": "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
      }
    ],
    "prepMinutes": 15,
    "cookMinutes": 30,
    "restMinutes": 0,
    "restLabel": "",
    "timeNote": "Assumes the broth and eggs are prepared while the chicken cooks."
  },
  {
    "slug": "pizza",
    "title": "Pizza",
    "category": "Mains",
    "ingredients": [
      {
        "name": "Dough",
        "heading": true
      },
      {
        "name": "all-purpose flour, add gradually",
        "unit": "cups",
        "amount": 2.0,
        "maximum": 2.3333333333333335
      },
      {
        "name": "instant yeast",
        "unit": "tsp",
        "amount": 2.25
      },
      {
        "name": "sugar",
        "unit": "tsp",
        "amount": 1.5
      },
      {
        "name": "salt",
        "unit": "tsp",
        "amount": 0.75
      },
      {
        "name": "garlic powder",
        "unit": "tsp",
        "amount": 0.25
      },
      {
        "name": "olive oil",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "warm water",
        "unit": "cup",
        "amount": 0.75
      },
      {
        "name": "Extra flour, only as needed for dusting",
        "unit": ""
      },
      {
        "name": "Sauce (there may be leftovers)",
        "heading": true
      },
      {
        "name": "Italian peeled tomatoes",
        "unit": "g",
        "amount": 400.0
      },
      {
        "name": "garlic cloves",
        "unit": "",
        "amount": 2.0
      },
      {
        "name": "olive oil",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "Salt, to taste",
        "unit": ""
      },
      {
        "name": "sugar",
        "unit": "pinch",
        "amount": 1.0
      },
      {
        "name": "Optional topping",
        "heading": true
      },
      {
        "name": "shredded mozzarella",
        "unit": "cup",
        "amount": 1.0
      }
    ],
    "note": "The missing ingredient is interpreted as instant yeast, matching the dough reference. Garlic powder is set to ¼ tsp; extra flour is for dusting only. A 400 g tomato can and optional cheese are suggested.",
    "source": null,
    "number": 13,
    "baseServings": 3,
    "servingNote": "Estimated main-course portions.",
    "steps": [
      "Mix the flour, yeast, sugar, salt, and garlic powder, starting with the lower flour quantity. Stir in warm water and oil; knead until soft and workable, adding the remaining flour only if sticky.",
      "Cover in an oiled bowl and let rise in a warm spot until doubled, about 30–60 minutes. Preheat the oven to 425°F (220°C).",
      "Crush the tomatoes. Gently cook the garlic in the sauce oil for 30 seconds, add tomatoes, salt, and sugar, and simmer for 15–20 minutes.",
      "Shape the dough into roughly 12-inch pizzas, using one pizza per three people. Spread a thin layer of sauce on each, saving any extra. Add optional mozzarella.",
      "Bake on a lightly oiled pizza pan for about 13–18 minutes, until the crust is golden and cooked through. Make extra pizzas in batches rather than one unusually thick pizza."
    ],
    "references": [
      {
        "title": "Pizza dough reference",
        "url": "https://sugarspunrun.com/the-best-pizza-dough-recipe/"
      }
    ],
    "prepMinutes": 20,
    "cookMinutes": 20,
    "restMinutes": 45,
    "restLabel": "Rising",
    "timeNote": "Assumes the sauce simmers while the dough rises. Allows 45 minutes for rising and about 15–20 minutes to bake."
  },
  {
    "slug": "mongolian-beef",
    "title": "Mongolian Beef",
    "category": "Mains",
    "ingredients": [
      {
        "name": "beef flank steak thinly sliced (between .125 to .25 inch thick)",
        "amount": 1.0,
        "unit": "lb"
      },
      {
        "name": "water",
        "amount": 2.0,
        "unit": "tbsp"
      },
      {
        "name": "Shaoxing cooking wine",
        "amount": 2.0,
        "unit": "tsp"
      },
      {
        "name": "Kosher salt (a little less if using fine salt)",
        "amount": 0.5,
        "unit": "tsp"
      },
      {
        "name": "baking soda",
        "amount": 0.25,
        "unit": "tsp"
      },
      {
        "name": "cornstarch",
        "amount": 2.0,
        "unit": "tbsp"
      },
      {
        "name": "oil, any neutral oil",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "For The Sauce",
        "heading": true
      },
      {
        "name": "cracked black pepper, more or less to taste",
        "amount": 1.0,
        "unit": "tsp"
      },
      {
        "name": "Shaoxing cooking wine",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "granulated sugar",
        "amount": 3.0,
        "unit": "tbsp"
      },
      {
        "name": "regular soy sauce",
        "amount": 2.0,
        "unit": "tbsp"
      },
      {
        "name": "For The Rest Of The Dish",
        "heading": true
      },
      {
        "name": "garlic, minced",
        "amount": 1.0,
        "unit": "tbsp"
      },
      {
        "name": "large yellow onion, sliced",
        "amount": 0.5,
        "unit": ""
      },
      {
        "name": "green onion cut into 2 inch pieces (separate the white and green parts)",
        "amount": 1.0,
        "unit": "bunch"
      },
      {
        "name": "Oil as needed for cooking"
      }
    ],
    "note": null,
    "source": null,
    "number": 14,
    "baseServings": 4,
    "servingNote": "Estimated main-course portions.",
    "steps": [
      "Marinate the beef: In a mixing bowl, combine the thinly sliced flank steak, water, Shaoxing cooking wine, salt, and baking soda.",
      "Mix vigorously until the beef absorb most of the liquid.",
      "Once most of the liquid has been absorbed, add the cornstarch and mix until the beef is well coated.",
      "Following, add the oil and mix until evenly distributed.",
      "Set the beef aside to marinate for about 10 to 15 minutes as you prepared the rest of the ingredients, or let the beef marinate in the fridge overnight.",
      "Make the Mongolian beef: In a wok or sauté pan, add enough oil to generously coat the bottom of the pan.",
      "Heat the oil on medium to medium high heat.",
      "Once the oil is hot, add the marinated beef and sear on both sides until just cooked and golden brown.",
      "Make sure to separate the beef slices so that they cook evenly.",
      "Cook in batches if necessary.",
      "Remove and set aside.",
      "Into the same wok or sauté pan over medium high heat, keep about 1 to 2 tablespoons of oil.",
      "Add the garlic and stir fry until fragrant, about 15 to 30 seconds.",
      "Next, add the sliced onions and the white parts of the green onions.",
      "Stir fry until the onions are just starting to turn translucent.",
      "Add the beef back into the pan, along with the black pepper.",
      "Stir fry briefly, then drizzle the Shaoxing cooking wine around the pan.",
      "Stir fry for 30 seconds to 1 minute, until fragrant and the rice wine is cooked off.",
      "Add the sugar and soy sauce and stir fry until the beef is well coated and the Mongolian beef is just starting to smell a little charred/caramelized.",
      "Finish the Mongolian beef by adding the green parts of the green onions.",
      "Sauté briefly to combine.",
      "Serve the mongolian beef over the prepared rice.",
      "Enjoy!"
    ],
    "references": [],
    "prepMinutes": 15,
    "cookMinutes": 15,
    "restMinutes": 15,
    "restLabel": "Marinating",
    "timeNote": "Includes a 15-minute marinade; excludes cooking rice."
  },
  {
    "slug": "korean-popcorn-chicken",
    "title": "Korean Popcorn Chicken",
    "category": "Mains",
    "ingredients": [
      {
        "name": "boneless chicken thighs, cut into 1-inch pieces",
        "unit": "lb",
        "amount": 1.5
      },
      {
        "name": "soy sauce, for the marinade",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "large egg",
        "unit": "",
        "amount": 1.0
      },
      {
        "name": "salt",
        "unit": "tsp",
        "amount": 0.5
      },
      {
        "name": "black pepper",
        "unit": "tsp",
        "amount": 0.25
      },
      {
        "name": "garlic powder",
        "unit": "tsp",
        "amount": 1.0
      },
      {
        "name": "potato starch, plus more if needed to coat",
        "unit": "cup",
        "amount": 0.5
      },
      {
        "name": "Neutral oil, enough for frying",
        "unit": ""
      },
      {
        "name": "Sauce",
        "heading": true
      },
      {
        "name": "soy sauce",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "gochujang",
        "unit": "cup",
        "amount": 0.25
      },
      {
        "name": "brown sugar",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "honey",
        "unit": "tbsp",
        "amount": 2.0
      },
      {
        "name": "rice vinegar",
        "unit": "tbsp",
        "amount": 1.0
      },
      {
        "name": "ketchup",
        "unit": "tbsp",
        "amount": 1.0
      },
      {
        "name": "sesame oil",
        "unit": "tbsp",
        "amount": 1.0
      },
      {
        "name": "garlic cloves, minced",
        "unit": "",
        "amount": 5.0
      },
      {
        "name": "water, plus a splash if needed to loosen",
        "unit": "tbsp",
        "amount": 1.0
      }
    ],
    "note": "Suggested chicken thighs and cooking method added. Soy sauce is divided between marinade and sauce; the unnamed tablespoon is interpreted as water, not recovered from the source.",
    "source": "https://vt.tiktok.com/ZSqMpWkBX/",
    "number": 15,
    "baseServings": 4,
    "servingNote": "Estimated main-course portions.",
    "steps": [
      "Mix chicken with the marinade soy sauce, egg, salt, pepper, and garlic powder. Rest in the refrigerator for 15 minutes.",
      "Coat the chicken in potato starch, adding a little more only where wet patches remain.",
      "Heat frying oil in a deep, heavy pan to 350°F (175°C). Fry small batches for about 4–6 minutes, turning as needed, until crisp and the centre reaches 165°F (74°C). Drain on a rack.",
      "In a separate pan, gently heat the sesame oil and garlic for 30 seconds. Stir in the remaining sauce ingredients; simmer gently for 1–2 minutes. Add a little extra water if too thick.",
      "Toss the cooked chicken in the sauce just before serving to keep it crisp."
    ],
    "references": [
      {
        "title": "Cooking temperature guide",
        "url": "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
      }
    ],
    "prepMinutes": 15,
    "cookMinutes": 20,
    "restMinutes": 15,
    "restLabel": "Marinating",
    "timeNote": "Includes a 15-minute marinade and frying in small batches; excludes cooking rice."
  }
]
