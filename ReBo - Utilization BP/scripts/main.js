// import {} from "./DeathDropLoot";
// import { ScoreboardDB } from "./ReBo/ScoreboardDB";
import { overworld } from "./ReBo/Constants";
import { test } from "./ReBo/Utils";
import { WorldDB } from "./ReBo/WorldDB";

const db = new WorldDB("qwe");
db.set("asdasd", overworld.fetchEntities("@a")[0]);

WorldDB.displayAllProperties();
