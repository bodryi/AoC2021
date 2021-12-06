const { inputData } = require('./input');
const {
  LanternFish,
  lanternFishSchoolTick,
  TIMER,
  FIRST_CYCLE_DELAY,
} = require('./helper');
const DAYS_TO_RESULT = 80;

const lanternFishTimers = inputData.split(',').map((n) => +n);
const initialLanternFishCount = lanternFishTimers.length;

const lanternFishSchool = lanternFishTimers.map(
  (t) => new LanternFish(t, false),
);

const dailyGrowth = [0];
for (let i = 0; i < TIMER + FIRST_CYCLE_DELAY; i++) {
  const prevLength = lanternFishSchool.length;
  lanternFishSchoolTick(lanternFishSchool);
  dailyGrowth.push(lanternFishSchool.length - prevLength);
}

for (let i = 0; i < DAYS_TO_RESULT - (TIMER + FIRST_CYCLE_DELAY); i++) {
  dailyGrowth.push(dailyGrowth[i] + dailyGrowth[i + 2]);
}

console.log(
  'Result:',
  dailyGrowth.reduce((sum, g) => sum + g, initialLanternFishCount),
);
