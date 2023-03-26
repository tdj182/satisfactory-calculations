/**
 * Apply Select 2 to selects that have been loaded from local storage
 */
$(document).ready(function() {
  $('select').select2();
});

const baseMaterialsDiv = document.getElementById("base-materials");
const itemsDiv = document.getElementById("items");
const buildingsDiv = document.getElementById("building-list");
const buildingsContainer = document.getElementById('buildings-container');
let buildingCount = 0;  

/**
 * Apply select2 to dynamically created elements.
 * this should only be used AFTER the element has been appended to the DOM
 * @param {selectElement} selectElement 
 */
function applySelect2Dynamically(selectElement) {
  $(selectElement).select2();
}

/**
 * get the elements (produced/used/remaining) based off of key id
 * update the elements text with the item value from data.js
 * @param {*} itemKey 
 * @param {*} item 
 */
function updateItemCard(itemKey, item) {
  const producedValue = document.getElementById('produced-' + itemKey);
  const usedValue = document.getElementById('used-' + itemKey);
  const remainingValue = document.getElementById('remaining-' + itemKey);

  producedValue.textContent = "Produced: " + item.produced;
  usedValue.textContent = "Used: " + item.used;
  remainingValue.textContent = "Remaining: " + item.remaining;
}

/**
 * Call this method to update the UI elements with the data in data.js
 */
function updateUICards() {
  for (const key in items) {
    if (Object.hasOwnProperty.call(items, key)) {
      const item = items[key];
      updateItemCard(key, item);
    }
  }

  for (const key in baseMaterial) {
    if (Object.hasOwnProperty.call(baseMaterial, key)) {
      const item = baseMaterial[key];
      updateItemCard(key, item);
    }
  }
}

/**
 * Get all the ingredients from both item and baseMaterial objects in data.js
 * @param {*} ingredients 
 * @returns 
 */
function getIngredients(ingredients) {
  const allIngredients = {};

  for (const ingredientKey in ingredients) {
    const ingredientAmount = ingredients[ingredientKey];
    const item = items[ingredientKey];
    if (item) {
      // Ingredient is an item
      allIngredients[ingredientKey] = {
        name: item.name,
        amount: ingredientAmount,
      };
    } else {
      // Ingredient is a base material
      const item = baseMaterial[ingredientKey];
      allIngredients[ingredientKey] = {
        name: item.name,
        amount: ingredientAmount,
      };
    }
  }
  return allIngredients;
}


function showRecipe(selectedItem, selectedRecipe, ingredientsList) {
  ingredientsList.innerHTML = '';
  if (selectedItem && selectedRecipe) {
    const foundRecipe = items[selectedItem].recipes.find(recipe => recipe.recipeName === selectedRecipe);
    const selectedIngredients = items[selectedItem].recipes.find(recipe => recipe.recipeName === selectedRecipe).ingredients;
    const allIngredients = getIngredients(selectedIngredients);

    const li = document.createElement('li');
    li.textContent = `Output Amount: ${foundRecipe.outputQuantity}`;
    li.classList.add("output-amount");
    ingredientsList.appendChild(li);
    for (const ingredientKey in allIngredients) {
      const ingredient = allIngredients[ingredientKey];

      const li = document.createElement('li');
      li.textContent = `${ingredient.name}: ${ingredient.amount}`;
      ingredientsList.appendChild(li);
    }
  }
}


function createForm() {
  buildingCount++;

  const form = document.createElement('form');
  form.id = `building-form-${buildingCount}`;
  form.className = 'mt-4 p-3 border border-primary';

  const itemGroup = document.createElement('div');
  itemGroup.className = 'form-group';

  const itemLabel = document.createElement('label');
  itemLabel.textContent = 'Item:';
  itemLabel.htmlFor = `item-select-${buildingCount}`;
  itemGroup.appendChild(itemLabel);

  const itemSelect = document.createElement('select');
  itemSelect.id = `item-select-${buildingCount}`;
  itemSelect.className = 'form-select';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select an item';
  itemSelect.appendChild(defaultOption);

  // Add options for items
  for (const item in items) {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = items[item].name;
    itemSelect.appendChild(option);
  }

  itemGroup.appendChild(itemSelect);
  form.appendChild(itemGroup);

  const recipeGroup = document.createElement('div');
  recipeGroup.className = 'form-group';

  const recipeLabel = document.createElement('label');
  recipeLabel.textContent = 'Recipe:';
  recipeLabel.htmlFor = `recipe-select-${buildingCount}`;
  recipeGroup.appendChild(recipeLabel);

  const recipeSelect = document.createElement('select');
  recipeSelect.id = `recipe-select-${buildingCount}`;
  recipeSelect.className = 'form-select';
  const recipeDefaultOption = document.createElement('option');
  recipeDefaultOption.value = '';
  recipeDefaultOption.textContent = 'Select a recipe';
  recipeSelect.appendChild(recipeDefaultOption);
  recipeGroup.appendChild(recipeSelect);
  form.appendChild(recipeGroup);

  /**
   *  Event listener for Recipe select. 
   *  It display the ingredients when the recipe is changed
   */
  recipeSelect.addEventListener('change', function() {
    showRecipe(itemSelect.value, this.value, ingredientsList);
  });

  // Event listener for item select dropdown
  itemSelect.addEventListener('change', function() {
    const selectedItem = this.value;
    recipeSelect.innerHTML = '';

    if (selectedItem) {
      const selectedRecipes = items[selectedItem].recipes;

      // Add options for recipes
      for (const recipe of selectedRecipes) {
        const option = document.createElement('option');
        option.value = recipe.recipeName;
        option.textContent = recipe.recipeName;
        recipeSelect.appendChild(option);
      }
    }
  });

  const buildingCountGroup = document.createElement('div');
  buildingCountGroup.className = 'form-group';

  const buildingCountLabel = document.createElement('label');
  buildingCountLabel.textContent = 'Building Count:';
  buildingCountLabel.htmlFor = `building-count-${buildingCount}`;
  buildingCountGroup.appendChild(buildingCountLabel);

  const buildingCountInput = document.createElement('input');
  buildingCountInput.type = 'number';
  buildingCountInput.min = 1;
  buildingCountInput.id = `building-count-${buildingCount}`;
  buildingCountInput.className = 'form-control';
  buildingCountGroup.appendChild(buildingCountInput);

  form.appendChild(buildingCountGroup);

  const clockSpeedGroup = document.createElement('div');
  clockSpeedGroup.className = 'form-group';

  const clockSpeedLabel = document.createElement('label');
  clockSpeedLabel.textContent = 'Clock Speed:';
  clockSpeedLabel.htmlFor = `clock-speed-${buildingCount}`;
  clockSpeedGroup.appendChild(clockSpeedLabel);

  const clockSpeedInput = document.createElement('input');
  clockSpeedInput.type = 'number';
  clockSpeedInput.min = 0;
  clockSpeedInput.max = 2.5;
  clockSpeedInput.step = 0.1;
  clockSpeedInput.id = `clock-speed-${buildingCount}`;
  clockSpeedInput.className = 'form-control';
  clockSpeedGroup.appendChild(clockSpeedInput);

  form.appendChild(clockSpeedGroup);

  // Add ingredients section
  const ingredientSection = document.createElement("div");
  const listHeader = document.createElement("span");
  listHeader.innerText = "per machine";
  const ingredientsList = document.createElement("ul");
  ingredientsList.id = `ingredients-${buildingCount}`;
  ingredientSection.appendChild(listHeader);
  ingredientSection.appendChild(ingredientsList);
  form.appendChild(ingredientSection);

  // Add Remove button
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'btn btn-danger mt-3 ml-2 btn-remove';
  removeButton.textContent = 'Remove';
  form.appendChild(removeButton);

  // Event listener for Remove button
  removeButton.addEventListener('click', function() {
    form.remove();
  });

  buildingsContainer.appendChild(form);
  applySelect2Dynamically(itemSelect);
  applySelect2Dynamically(recipeSelect);
}

function resetItems() {
  for (const key in items) {
    if (Object.hasOwnProperty.call(items, key)) {
      const item = items[key];
      item.produced = 0;
      item.used = 0;
      item.remaining = 0;
    }
  }
  for (const key in baseMaterial) {
    if (Object.hasOwnProperty.call(baseMaterial, key)) {
      const item = baseMaterial[key];
      item.used = 0;
      item.remaining = item.produced;
    }
  }
}

function calculate() {
  buildings.length = 0; // Clear out the buildings array
  resetItems();

  const forms = document.querySelectorAll('form');

  forms.forEach(function(form) {
    const itemSelect = form.querySelector('select[id^="item-select"]');
    const recipeSelect = form.querySelector('select[id^="recipe-select"]');
    const buildingCountInput = form.querySelector('input[id^="building-count"]');
    const clockSpeedInput = form.querySelector('input[id^="clock-speed"]');

    const itemValue = itemSelect.value;
    const recipeValue = recipeSelect.value;
    const buildingCountValue = parseInt(buildingCountInput.value);
    const clockSpeedValue = parseFloat(clockSpeedInput.value);

    if (itemValue && recipeValue && buildingCountValue && clockSpeedValue) {
      const building = {
        itemKey: itemValue,
        recipeName: recipeValue,
        clockSpeed: clockSpeedValue,
        buildingCount: buildingCountValue
      };

      buildings.push(building);
    }
  });

  // Save the buildings variable in local storage
  localStorage.setItem('buildings', JSON.stringify(buildings));

  buildings.forEach(function(building) {
    const item = items[building.itemKey];
    const recipe = item.recipes.find(function(recipe) {
      return recipe.recipeName === building.recipeName;
    });

    if (recipe) {
      item.produced += recipe.outputQuantity * building.buildingCount * building.clockSpeed;

      for (const ingredientKey in recipe.ingredients) {
        if (recipe.ingredients.hasOwnProperty(ingredientKey)) {
          if (items.hasOwnProperty(ingredientKey)) {
            items[ingredientKey].used += recipe.ingredients[ingredientKey] * building.buildingCount * building.clockSpeed;
            items[ingredientKey].remaining = items[ingredientKey].produced - items[ingredientKey].used;
          } else if (baseMaterial.hasOwnProperty(ingredientKey)) {
            baseMaterial[ingredientKey].used += recipe.ingredients[ingredientKey] * building.buildingCount * building.clockSpeed;
            baseMaterial[ingredientKey].remaining = baseMaterial[ingredientKey].produced - baseMaterial[ingredientKey].used;
          }
        }
      }
    }
  });
  updateUICards();
}


document.getElementById('add-building-button').addEventListener('click', function() {
  createForm();
});


document.getElementById('calculate-button').addEventListener('click', function() {
  calculate();
});

/**
 * This method will create a form based on the local storage buildings. 
 * @param {*} building 
 * @returns 
 */
function createBuildingForm(building = {}) {
  buildingCount++;

  const form = document.createElement('form');
  form.id = `building-form-${buildingCount}`;
  form.className = 'mt-4 p-3 border border-primary';

  const itemGroup = document.createElement('div');
  itemGroup.className = 'form-group';

  const itemLabel = document.createElement('label');
  itemLabel.textContent = 'Item:';
  itemLabel.htmlFor = `item-select-${buildingCount}`;
  itemGroup.appendChild(itemLabel);

  const itemSelect = document.createElement('select');
  itemSelect.id = `item-select-${buildingCount}`;
  itemSelect.className = 'form-select';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select an item';
  itemSelect.appendChild(defaultOption);

  // Add options for items
  for (const item in items) {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = items[item].name;
    itemSelect.appendChild(option);
  }

  itemGroup.appendChild(itemSelect);
  form.appendChild(itemGroup);

  const recipeGroup = document.createElement('div');
  recipeGroup.className = 'form-group';

  const recipeLabel = document.createElement('label');
  recipeLabel.textContent = 'Recipe:';
  recipeLabel.htmlFor = `recipe-select-${buildingCount}`;
  recipeGroup.appendChild(recipeLabel);

  const recipeSelect = document.createElement('select');
  recipeSelect.id = `recipe-select-${buildingCount}`;
  recipeSelect.className = 'form-select';
  const recipeDefaultOption = document.createElement('option');
  recipeDefaultOption.value = '';
  recipeDefaultOption.textContent = 'Select a recipe';
  recipeSelect.appendChild(recipeDefaultOption);
  recipeGroup.appendChild(recipeSelect);
  form.appendChild(recipeGroup);

/**
 *  Event listener for Recipe select. 
 *  It display the ingredients when the recipe is changed
 */
  recipeSelect.addEventListener('change', function() {
    showRecipe(itemSelect.value, this.value, ingredientsList);
  });

  // Event listener for item select dropdown
  itemSelect.addEventListener('change', function() {
    const selectedItem = this.value;
    recipeSelect.innerHTML = '';

    if (selectedItem) {
      const selectedRecipes = items[selectedItem].recipes;

      // Add options for recipes
      for (const recipe of selectedRecipes) {
        const option = document.createElement('option');
        option.value = recipe.recipeName;
        option.textContent = recipe.recipeName;
        recipeSelect.appendChild(option);
      }
    }
  });

  const buildingCountGroup = document.createElement('div');
  buildingCountGroup.className = 'form-group';

  const buildingCountLabel = document.createElement('label');
  buildingCountLabel.textContent = 'Building Count:';
  buildingCountLabel.htmlFor = `building-count-${buildingCount}`;
  buildingCountGroup.appendChild(buildingCountLabel);

  const buildingCountInput = document.createElement('input');
  buildingCountInput.type = 'number';
  buildingCountInput.min = 1;
  buildingCountInput.value = building.buildingCount
  buildingCountInput.id = `building-count-${buildingCount}`;
  buildingCountInput.className = 'form-control';
  buildingCountGroup.appendChild(buildingCountInput);

  form.appendChild(buildingCountGroup);

  const clockSpeedGroup = document.createElement('div');
  clockSpeedGroup.className = 'form-group';

  const clockSpeedLabel = document.createElement('label');
  clockSpeedLabel.textContent = 'Clock Speed:';
  clockSpeedLabel.htmlFor = `clock-speed-${buildingCount}`;
  clockSpeedGroup.appendChild(clockSpeedLabel);

  const clockSpeedInput = document.createElement('input');
  clockSpeedInput.type = 'number';
  clockSpeedInput.min = 0;
  clockSpeedInput.max = 2.5;
  clockSpeedInput.value = building.clockSpeed;
  clockSpeedInput.step = 0.1;
  clockSpeedInput.id = `clock-speed-${buildingCount}`;
  clockSpeedInput.className = 'form-control';
  clockSpeedGroup.appendChild(clockSpeedInput);

  form.appendChild(clockSpeedGroup);

  // Add ingredients section
  const ingredientSection = document.createElement("div");
  const listHeader = document.createElement("span");
  listHeader.innerText = "per machine";
  const ingredientsList = document.createElement("ul");
  ingredientsList.id = `ingredients-${buildingCount}`;
  ingredientSection.appendChild(listHeader);
  ingredientSection.appendChild(ingredientsList);
  form.appendChild(ingredientSection);

  // Add Remove button
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'btn btn-danger mt-3 ml-2 btn-remove';
  removeButton.textContent = 'Remove';
  form.appendChild(removeButton);

  // Event listener for Remove button
  removeButton.addEventListener('click', function() {
    form.remove();
  });
  
  // Populate item select options
  for (const itemKey in items) {
    const itemOption = document.createElement("option");
    itemOption.setAttribute("value", itemKey);
    itemOption.textContent = items[itemKey].name;
    itemSelect.appendChild(itemOption);
  }

  // Populate recipe select options for selected item
  itemSelect.addEventListener("change", function() {
    const itemKey = this.value;
    recipeSelect.innerHTML = ""; // Clear existing options
    const itemRecipes = items[itemKey].recipes;
    itemRecipes.forEach(function(recipe) {
      const recipeOption = document.createElement("option");
      recipeOption.setAttribute("value", recipe.recipeName);
      recipeOption.textContent = recipe.recipeName;
      recipeSelect.appendChild(recipeOption);
    });
  });

  // Set initial item and recipe values
  if (building.itemKey) {
    itemSelect.value = building.itemKey;
    itemSelect.dispatchEvent(new Event("change")); // Trigger recipe select population
    recipeSelect.value = building.recipeName;
  } else {
    const firstItemKey = Object.keys(items)[0];
    itemSelect.value = firstItemKey;
    itemSelect.dispatchEvent(new Event("change")); // Trigger recipe select population
    recipeSelect.value = items[firstItemKey].recipes[0].recipeName;
  }

  showRecipe(itemSelect.value, recipeSelect.value, ingredientsList);
  return form;
}

/**
 * This method will loop through baseMaterials/items and display their data
 */
function buildCards() {
  for (const key in baseMaterial) {
    if (baseMaterial.hasOwnProperty(key)) {
      const { name } = baseMaterial[key];
      let produced = localStorage.getItem(`produced-${key}`) || 0;
      if (produced > 0) {
        baseMaterial[key].produced = produced;
        baseMaterial[key].remaining = produced;
      }
  
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.id = "card-" + key; // Add unique ID to card
  
      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.id = "header-" + key; // Add unique ID to header
      cardHeader.textContent = name;
  
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.id = "body-" + key; // Add unique ID to body
  
      const producedGroup = document.createElement("div");
      producedGroup.className = "form-group";
  
      const producedLabel = document.createElement("label");
      producedLabel.textContent = "Produced:";
      producedLabel.htmlFor = `produced-${key}`;
      producedGroup.appendChild(producedLabel);
  
      const producedInput = document.createElement("input");
      
      producedInput.type = "number";
      producedInput.min = 0;
      producedInput.id = `produced-${key}`;
      producedInput.className = "form-control produced-input";
      producedInput.name = `${key}-produced`;
      producedInput.value = localStorage.getItem(`produced-${key}`) || 0;
      producedInput.addEventListener("change", function() {
        const newValue = parseInt(this.value);
        if (!isNaN(newValue) && newValue >= 0) {
          remaining = newValue - baseMaterial[key].used; // Update remaining value
          
          // Update object properties
          baseMaterial[key].produced = newValue;
          baseMaterial[key].remaining = remaining;
  
          localStorage.setItem(`produced-${key}`, newValue);
          updateItemCard(key, baseMaterial[key]);
          console.log(`${name} produced: ${newValue}`); // Log new produced value
        } else {
          this.value = produced; // Reset input value to original produced value
        }
      });
      producedGroup.appendChild(producedInput);
  
      const usedP = document.createElement("p");
      usedP.id = "used-" + key;
      usedP.textContent = "Used: " + 0;
  
      const remainingP = document.createElement("p");
      remainingP.id = "remaining-" + key;
      remainingP.textContent = "Remaining: " + produced;
  
      cardBody.appendChild(producedGroup);
      cardBody.appendChild(usedP);
      cardBody.appendChild(remainingP);
  
      cardDiv.appendChild(cardHeader);
      cardDiv.appendChild(cardBody);
  
      baseMaterialsDiv.appendChild(cardDiv);
    }
  }
  
  for (const key in items) {
    if (items.hasOwnProperty(key)) {
      const {name, produced, used, remaining, recipes} = items[key];
      
      const cardDiv = document.createElement("div");
      cardDiv.className = "card mb-3";
      cardDiv.id = "card-" + key; // Add unique ID to card
      
      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.id = "header-" + key; // Add unique ID to header
      cardHeader.textContent = name;
      
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.id = "body-" + key; // Add unique ID to body
      
      const producedP = document.createElement("p");
      producedP.id = "produced-" + key
      producedP.textContent = "Produced: " + produced;
      
      const usedP = document.createElement("p");
      usedP.id = "used-" + key
      usedP.textContent = "Used: " + used;
      
      const remainingP = document.createElement("p");
      remainingP.id = "remaining-" + key
      remainingP.textContent = "Remaining: " + remaining;
      
      cardBody.appendChild(producedP);
      cardBody.appendChild(usedP);
      cardBody.appendChild(remainingP);
      
      cardDiv.appendChild(cardHeader);
      cardDiv.appendChild(cardBody);
      
      itemsDiv.appendChild(cardDiv);
    }
  }
}

function onStart() {
  
  buildCards();
  // Retrieve buildings from local storage if available
  const storedBuildings = JSON.parse(localStorage.getItem("buildings"));
  if (storedBuildings) {
    buildings = storedBuildings;
    // Create form objects for each building in the buildings array
    buildings.forEach(function(building) {
      const form = createBuildingForm(building);
      buildingsContainer.append(form);
    });
  }

  calculate();
}

onStart();