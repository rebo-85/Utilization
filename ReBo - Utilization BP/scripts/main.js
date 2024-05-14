import { Vector3, overworld, test } from "./Minecraft";
// import {} from "./DeathDropLoot";
import { ScoreboardDB } from "./ScoreboardDB";

const db = new ScoreboardDB("rebo:database");
const vec = new Vector3(1, 2, 3);
const vec2 = new Vector3(2, 3, 4);
const qwe = 23;

db.save("test", vec);
db.save("asd", vec2);
db.save("qwe", qwe);

const asd = db.get("qwe");
test(asd);
