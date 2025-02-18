import {} from "./ReBo/devTools";
import { afterEvents, namespace as ns } from "./ReBo/constants";
import { addVectors } from "./ReBo/utils";

import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { Vector3 } from "./ReBo/classes";

afterEvents.itemUse.subscribe((e) => {
  const { itemStack, source: player } = e;

  if (itemStack.typeId === "minecraft:apple") {
    showActionForm(player);
  }
});

function showActionForm(player) {
  const form = new ActionFormData();
  form.title({ translate: `form.${ns}.storage_plus.title` });
  form.button({ translate: `form.${ns}.storage_plus.stack_to_nearby_chests` });
  form.button({ translate: `form.${ns}.storage_plus.restock_from_nearby_chests` });
  form.button({ translate: `form.${ns}.storage_plus.sort_nearby_chests` });
  form.show(player).then(({ selection }) => {
    const chests = getNearbyChests(player);

    switch (selection) {
      case 0:
        for (const chest of chests) {
          const playerInvItemsMap = player.getItems().inventory;
          const chestInvItemsMap = chest.getItems();

          const isTransferrable = new Map();

          compareMapProperties(playerInvItemsMap, chestInvItemsMap, "typeId", async (obj1, obj2) => {
            const playerItem = obj1.value;
            const chestItem = obj2.value;
            if (playerItem.isStackable && chestItem.isStackable) {
              if ((chestItem.amount < chestItem.maxAmount || chest.inventory.emptySlotsCount > 0) && !isTransferrable.has(obj1.key)) {
                isTransferrable.set(obj1.key, true);
                const transferFailed = player.inventory.transferItem(obj1.key, chest.inventory);

                // There's this bug after transfering the items the item visuals were still in the player inventory.
                const isHotbar = obj1.key < 9;
                const command = `replaceitem entity @s slot.${isHotbar ? "hotbar" : "inventory"} ${isHotbar ? obj1.key : obj1.key - 9} air`;
                if (!transferFailed) {
                  player.runCommandAsync(command);
                  player.playSound("random.chestopen");
                }
              }
            }
          });
        }
        break;
      case 1:
        for (const chest of chests) {
          const playerInvItemsMap = player.getItems().inventory;
          const chestInvItemsMap = chest.getItems();

          compareMapProperties(playerInvItemsMap, chestInvItemsMap, "typeId", async (obj1, obj2) => {
            const playerItem = obj1.value;
            let chestItem = obj2.value;
            let isTransferring = false;
            if (playerItem.isStackable && chestItem.isStackable) {
              while (playerItem.amount < playerItem.maxAmount && chestItem) {
                if (chestItem && chestItem.amount > 1) chestItem.amount--;
                else chestItem = null;

                playerItem.amount++;
                isTransferring = true;
              }
              if (isTransferring) {
                player.playSound("random.chestclosed");

                player.inventory.setItem(obj1.key, playerItem);
                chest.inventory.setItem(obj2.key, chestItem);
              }
            }
          });
        }
        break;
      case 2:
        showModalForm(player);
        break;
      default:
        break;
    }
  });
}

function showModalForm(player) {
  const form = new ModalFormData();
  form.title({ translate: `form.${ns}.storage_plus.title` });
  form.dropdown({ translate: `form.${ns}.storage_plus.sort.dropdown` }, [
    { translate: `form.${ns}.storage_plus.dropdown.sort_by_name` },
    { translate: `form.${ns}.storage_plus.dropdown.sort_by_id` },
    { translate: `form.${ns}.storage_plus.dropdown.sort_by_amount` },
  ]);
  form.show(player).then(({ formValues }) => {
    const chests = getNearbyChests(player);
    player.playSound("random.chestopen");

    for (const chest of chests) {
      switch (formValues[0]) {
        case 0:
          chest.inventory.sort((a, b) => a.typeId.split(":")[1].localeCompare(b.typeId.split(":")[1]));
          break;
        case 1:
          chest.inventory.sort((a, b) => a.typeId.localeCompare(b.typeId));
          break;
        case 2:
          chest.inventory.sort((a, b) => a.amount + b.amount);
          break;

        default:
          break;
      }
    }
  });
}

function getNearbyChests(player, radius = 5) {
  const chests = [];

  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      for (let z = -radius; z <= radius; z++) {
        try {
          const block = player.dimension.getBlock(addVectors(player.location, new Vector3(x, y, z)));

          if (block && block.typeId === "minecraft:chest") {
            chests.push(block);
          }
        } catch (e) {
          continue;
        }
      }
    }
  }
  return chests;
}

function compareMapProperties(map1, map2, property, cb) {
  for (const [k1, v1] of map1.entries()) {
    for (const [k2, v2] of map2.entries()) {
      if (v1[property] === v2[property]) {
        cb({ key: k1, value: v1 }, { key: k2, value: v2 });
      }
    }
  }
}
