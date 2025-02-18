import GET from './GET.js';

// Интенсивность запрсоов (RPS / RPM / RPH задаётся далее в timeUnit)
const GET_startRate = 100;

// еденица измерения RPS / RPM / RPH
const timeUnit = '1s';

// Длительность теста
const stageTime = '3m';

// Время за которое поднимаемся на новый шаг
const loadTime = '0s';

// кол-во VU на старте
const preAllocatedVus = 1;

// максимальное кол-во VU
const maxVUs = 1000;

// время на опускание VU после теста
const gracefulStop = '10s';

const getStages = (target) => {
  return [
    { target: target, duration: loadTime },
    { target: target, duration: stageTime },
    { target: target * 2, duration: loadTime },
    { target: target * 2, duration: stageTime },
    { target: target * 3, duration: loadTime },
    { target: target * 3, duration: stageTime },    
  ]
}

const getOptions = (startRate, exec) => {
  return {
    executor: 'ramping-arrival-rate',
    preAllocatedVus,
    maxVUs,
    timeUnit,
    startRate,
    gracefulStop,
    stages: getStages(startRate),
    exec
  }
}

export const options = {
  insecureSkipTlsVerify: true,
  noVUConnectionReuse: true,
  // tlsAuth: [
  //   {
  //     cert: open('../cert.pem'),
  //     key: open('../key.pem')
  //   }
  // ],
  scenarios: {
    GET_startRate: getOptions(GET_startRate, 'GET_exec'),
  }
}

export function GET_exec() {
  GET();
}

