import { display } from "./ReBo/utils";
import { afterEvents } from "./ReBo/constants";

afterEvents.playerPlaceBlock.subscribe((event) => {
  const block = event.block;
  const asd = block.permutation.getAllStates();

  display(asd);
});
