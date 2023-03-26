function createBuildingFormOld(building = {}) {
  const itemSelect = document.createElement("select");
  itemSelect.setAttribute("id", "item-select");

  const recipeSelect = document.createElement("select");
  recipeSelect.setAttribute("id", "recipe-select");

  const buildingCountInput = document.createElement("input");
  buildingCountInput.setAttribute("id", "building-count");
  buildingCountInput.setAttribute("type", "number");
  buildingCountInput.setAttribute("min", "1");
  buildingCountInput.setAttribute("value", building.buildingCount || 1);

  const clockSpeedInput = document.createElement("input");
  clockSpeedInput.setAttribute("id", "clock-speed");
  clockSpeedInput.setAttribute("type", "number");
  clockSpeedInput.setAttribute("step", "0.01");
  clockSpeedInput.setAttribute("min", "0.01");
  clockSpeedInput.setAttribute("value", building.clockSpeed || 1);

  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "btn btn-danger");
  removeButton.textContent = "Remove";

  const form = document.createElement("form");
  form.setAttribute("class", "building-form mb-3");
  form.appendChild(itemSelect);
  form.appendChild(recipeSelect);
  form.appendChild(buildingCountInput);
  form.appendChild(clockSpeedInput);
  form.appendChild(removeButton);

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

  removeButton.addEventListener("click", function() {
    form.remove();
  });

  return form;
}