import { scriptEvent, overworld, afterEvents } from "./ReBo/Constants";
import {
  addScore,
  addScoreboard,
  getScriptEventSource,
  removeAllParticipant,
  getScore,
  test,
  runTimeout,
  runInterval,
} from "./ReBo/Utils";
import {} from "./ReBo/Server";
import { Vector3 } from "./ReBo/Classes";

const oneBlockLoc = new Vector3(0, 0, 0);
const oneBlockOffsetLoc = new Vector3(oneBlockLoc.x, oneBlockLoc.y + 1, oneBlockLoc.z);

addScoreboard("blocks", "Blocks");

const blockTiers = [
  { score: 0, blocks: ["dirt", "stone"] },
  {
    score: 10,
    blocks: [
      "monster_egg",
      "coral",
      "coral_block",
      "coral_block",
      "coral_fan",
      "coral_fan_dead",
      "bamboo_sapling",
      "acacia_leaves",
      "acacia_log",
      "acacia_sapling",
      "acacia_wood",
      "allium",
      "amethyst_cluster",
      "ancient_debris",
      "andesite",
      "azalea",
      "azalea_leaves",
      "azalea_leaves_flowered",
      "azure_bluet",
      "bamboo",
      "barrel",
      "basalt",
      "bee_nest",
      "beetroot",
      "big_dripleaf",
      "birch_leaves",
      "birch_log",
      "birch_sapling",
      "birch_wood",
      "blackstone",
      "blue_ice",
      "blue_orchid",
      "bone_block",
      "budding_amethyst",
      "cactus",
      "calcite",
      "calibrated_sculk_sensor",
      "carrots",
      "carved_pumpkin",
      "cauldron",
      "cave_vines",
      "cherry_leaves",
      "cherry_log",
      "cherry_sapling",
      "cherry_wood",
      "chorus_flower",
      "chorus_plant",
      "clay",
      "coal_ore",
      "cobbled_deepslate",
      "cobblestone",
      "web",
      "cocoa",
      "conduit",
      "copper_ore",
      "cornflower",
      "crimson_fungus",
      "crimson_hyphae",
      "crimson_nylium",
      "crimson_roots",
      "crimson_stem",
      "crying_obsidian",
      "yellow_flower",
      "dark_oak_leaves",
      "dark_oak_log",
      "dark_oak_sapling",
      "dark_oak_wood",
      "prismarine",
      "deadbush",
      "deepslate",
      "deepslate_bricks",
      "deepslate_coal_ore",
      "deepslate_copper_ore",
      "deepslate_diamond_ore",
      "deepslate_emerald_ore",
      "deepslate_gold_ore",
      "deepslate_iron_ore",
      "deepslate_lapis_ore",
      "deepslate_redstone_ore",
      "deepslate_tiles",
      "diamond_ore",
      "diorite",
      "dirt",
      "dripstone_block",
      "emerald_ore",
      "end_rod",
      "end_stone",
      "tallgrass",
      "flowering_azalea",
      "flower_pot",
      "frosted_ice",
      "furnace",
      "gilded_blackstone",
      "glow_lichen",
      "glowstone",
      "gold_ore",
      "granite",
      "grass",
      "gravel",
      "hanging_roots",
      "honeycomb_block",
      "ice",
      "water",
      "lava",
      "iron_ore",
      "lit_pumpkin",
      "jungle_leaves",
      "jungle_log",
      "jungle_sapling",
      "cobblestone_wall",
      "jungle_wood",
      "kelp",
      "lapis_ore",
      "large_amethyst_bud",
      "double_plant",
      "waterlily",
      "lodestone",
      "magma",
      "medium_amethyst_bud",
      "melon_block",
      "melon_stem",
      "moss_block",
      "mycelium",
      "netherrack",
      "nether_brick",
      "quartz_ore",
      "oak_leaves",
      "oak_log",
      "oak_sapling",
      "oak_wood",
      "obsidian",
      "oxeye_daisy",
      "packed_ice",
      "podzol",
      "poppy",
      "powder_snow",
      "pumpkin",
      "purpur_block",
      "quartz_block",
      "quartz_bricks",
      "red_mushroom",
      "red_mushroom_block",
      "brown_mushroom",
      "brown_mushroom_block",
      "red_sandstone",
      "red_tulip",
      "red_flower",
      "sand",
      "sandstone",
      "sculk_sensor",
      "seagrass",
      "sea_lantern",
      "sea_pickle",
      "shroomlight",
      "small_amethyst_bud",
      "snow",
      "soul_sand",
      "soul_soil",
      "sponge",
      "spore_blossom",
      "spruce_leaves",
      "spruce_log",
      "spruce_sapling",
      "spruce_wood",
      "stone",
      "sweet_berry_bush",
      "tnt",
      "tuff",
      "turtle_egg",
      "twisting_vines",
      "vine",
      "warped_fungus",
      "warped_hyphae",
      "warped_nylium",
      "warped_roots",
      "warped_stem",
      "warped_wart_block",
      "web",
      "weeping_vines",
      "wheat",
      "white_tulip",
      "wither_rose",
    ],
  },
  {
    score: 20,
    blocks: [],
  },
  {
    score: 30,
    blocks: [],
  },
  {
    score: 40,
    blocks: [],
  },
];

afterEvents.playerBreakBlock.subscribe(async (event) => {
  const block = event.block;

  if (block.x == oneBlockLoc.x && block.y == oneBlockLoc.y && block.z == oneBlockLoc.z) {
    const player = event.player;
    addScore("blocks", player, 1);
    const playerScore = getScore("blocks", player);

    const block = await respawnBlock(oneBlockLoc, playerScore);

    const spawnChance = 0.03;
    spawnRandomMob(oneBlockOffsetLoc, spawnChance);
  }
});

scriptEvent.subscribe((event) => {
  const source = getScriptEventSource(event);

  if (source?.typeId != "minecraft:player") return;

  const id = event.id;
  switch (id) {
    case "one_block:reset":
      reset();
      break;
    case "one_block:init":
      init();
      break;
    default:
      return;
  }
});

function init() {
  test();
  overworld.commandRunAsync(
    `setworldspawn ${oneBlockOffsetLoc.toString()}`,
    `spawnpoint @a ${oneBlockOffsetLoc.toString()}`,
    `teleport @a ${oneBlockOffsetLoc.toString()}`
  );
  reset();
}

function reset() {
  const initialBlock = "grass";
  overworld.commandRunAsync(`setblock ${oneBlockLoc.toString()} ${initialBlock}`);

  removeAllParticipant("blocks");
}

async function respawnBlock(location, playerScore) {
  function getRespawnBlock(score) {
    let availableBlocks = [];

    // Include all blocks from lower tiers that the player has unlocked
    for (let i = 0; i < blockTiers.length; i++) {
      if (score >= blockTiers[i].score) {
        availableBlocks.push(...blockTiers[i].blocks);
      }
    }

    // Select a random block from the available blocks
    return availableBlocks[Math.floor(Math.random() * availableBlocks.length)] || "grass"; // Default block
  }

  function fetchBlock() {
    return new Promise((resolve) => {
      const respawnBlock = getRespawnBlock(playerScore);
      overworld.commandRunAsync(`setblock ${oneBlockLoc.toString()} ${respawnBlock}`);
      const blockFetcher = runInterval(() => {
        const block = overworld.getBlock(oneBlockLoc);
        const perm = block.permutation;
        if (perm.matches(respawnBlock)) {
          resolve(block);
          blockFetcher.dispose();
        }
      });
    });
  }

  return new Promise(async (resolve, reject) => {
    resolve(await fetchBlock());
  });
}

function spawnRandomMob(location, chance) {
  if (Math.random() < chance) {
    const passiveMobs = [
      "axolotl",
      "bat",
      "cat",
      "chicken",
      "cod",
      "cow",
      "donkey",
      "fox",
      "frog",
      "glow_squid",
      "horse",
      "mooshroom",
      "mule",
      "ocelot",
      "parrot",
      "pig",
      "pufferfish",
      "rabbit",
      "salmon",
      "sheep",
      "skeleton_horse",
      "snow_golem",
      "squid",
      "strider",
      "tadpole",
      "tropical_fish",
      "turtle",
      "villager",
      "wandering_trader",
    ];
    const neutralMobs = [
      "bee",
      "cave_spider",
      "dolphin",
      "enderman",
      "goat",
      "iron_golem",
      "llama",
      "panda",
      "piglin",
      "polar_bear",
      "spider",
      "trader_llama",
      "wolf",
      "zombified_piglin",
    ];

    const hostileMobs = [
      "blaze",
      "creeper",
      "drowned",
      "endermite",
      "evoker",
      "ghast",
      "guardian",
      "hoglin",
      "husk",
      "magma_cube",
      "phantom",
      "piglin_brute",
      "pillager",
      "ravager",
      "shulker",
      "silverfish",
      "skeleton",
      "slime",
      "stray",
      "vex",
      "vindicator",
      "witch",
      "wither_skeleton",
      "zoglin",
      "zombie",
      "zombie_villager",
    ];
    const bossMobs = ["elder_guardian", "ender_dragon", "warden", "wither"];
    const mobs = [...passiveMobs, ...neutralMobs, ...hostileMobs];
    const randomMob = mobs[Math.floor(Math.random() * mobs.length)];

    overworld.commandRunAsync(`summon ${randomMob} ${location.x} ${location.y} ${location.z}`);
  }
}
