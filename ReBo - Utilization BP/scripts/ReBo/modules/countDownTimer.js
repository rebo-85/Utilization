import { runInterval } from "../utils";

export class CountDownTimer {
  #timer;

  constructor(durationInSeconds, cbPerSecond, cbOnEnd) {
    this.duration = durationInSeconds;
    this.cbps = cbPerSecond;
    this.cboe = cbOnEnd;
    this.minutes = Math.floor(durationInSeconds / 60);
    this.seconds = durationInSeconds % 60;
  }

  start() {
    this.#timer = runInterval(() => {
      this.cbps(this.minutes, this.seconds);
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.end();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 20);
  }

  dispose() {
    this.#timer.dispose();
  }

  end() {
    this.dispose();
    this.cboe();
  }
}
