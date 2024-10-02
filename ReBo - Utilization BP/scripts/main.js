import { world } from "./ReBo/constants";
import {} from "./ReBo/server";
import { CountDownTimer } from "./ReBo/modules/countDownTimer";
import { display } from "./ReBo/utils";
const player = world.getAllPlayers()[0];

const onTick = (min, sec) => {
  player.runCommandAsync(`say ${min}:${sec}`);
};
const onEnd = () => {
  player.runCommandAsync(`say finished`);
};
const timer = new CountDownTimer(60, onTick, onEnd);

timer.start();
