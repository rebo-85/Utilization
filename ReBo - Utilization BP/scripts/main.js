// import {} from "./OneBlock";
import { overworld } from "./ReBo/constants";
import { display } from "./ReBo/utils";

const result = overworld.commandRun(`say hi`, `say ho`, `testfor @e[type=pig]`);
display(result);
