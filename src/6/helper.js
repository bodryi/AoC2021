const TIMER = 6;
const FIRST_CYCLE_DELAY = 2;

class LanternFish {
  timer;
  firstCycle;

  constructor(timer = TIMER + FIRST_CYCLE_DELAY, firstCycle = true) {
    this.timer = timer;
    this.firstCycle = firstCycle;
  }

  tick() {
    if (!this.timer) {
      this.timer = TIMER;
      if (this.firstCycle) {
        this.firstCycle = false;
      }
      return;
    }
    this.timer--;
  }
}

function lanternFishSchoolTick(school) {
  school.forEach((l) => l.tick());
  const readyToCreate = school.filter(
    (l) => l.timer === TIMER && !l.firstCycle,
  );
  school.push(
    ...new Array(readyToCreate.length).fill(null).map(() => new LanternFish()),
  );
}

module.exports = {
  LanternFish,
  lanternFishSchoolTick,
  TIMER,
  FIRST_CYCLE_DELAY,
};
