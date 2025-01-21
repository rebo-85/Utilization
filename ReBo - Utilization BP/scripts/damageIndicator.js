import { runInterval } from "./ReBo/utils";
import { afterEvents } from "./ReBo/constants";
import { world } from "@minecraft/server";
import { idTranslate } from "./ReBo/utils";

const capped = true; // if values are capped base from the max health of the entities
afterEvents.entityHealthChanged.subscribe((e) => {
  const { entity, oldValue, newValue } = e;

  if (newValue < oldValue) {
    let damage = oldValue - newValue;
    if (capped && oldValue < damage) damage = oldValue;
  } else {
    let heal = newValue - oldValue;
    const missingHealth = entity.maxHealth - oldValue;
    if (capped && missingHealth < heal) heal = missingHealth;
  }
});
