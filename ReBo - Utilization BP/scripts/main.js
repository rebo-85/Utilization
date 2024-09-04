import { world } from "@minecraft/server";
import {} from "./ReBo/server";
import { overworld } from "./ReBo/constants";
import { display } from "./ReBo/utils";

// Example usage:
async function name() {
  const asd = overworld.getEntities({ type: "minecraft:player" })[0];
  display(asd);
}

name();
