const crypto = require("crypto");

// Helper function to create a SHA-256 hash
function hash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Helper function to create a random block of data
function createBlockData(nonce) {
  return `Block-${nonce}-${Math.random()}`;
}

// Proof of Work function with adjustable difficulty
function proofOfWork(difficulty) {
  let nonce = 0;
  let hashValue;
  const startTime = Date.now();
  const target = "0".repeat(difficulty);  // Target pattern based on difficulty

  // Mine until the hash meets the target difficulty
  while (true) {
    const data = createBlockData(nonce);
    hashValue = hash(data);

    if (hashValue.startsWith(target)) {
      break;
    }
    nonce++;
  }
  const endTime = Date.now();

  return {
    time: endTime - startTime,
    nonce: nonce,
    hash: hashValue,
    difficulty: difficulty
  };
}

// Proof of Stake function simulating weighted validator selection
function proofOfStake(validators) {
  const stakes = validators.map(v => v.stake);
  const totalStake = stakes.reduce((acc, stake) => acc + stake, 0);

  // Random weighted selection based on stakes
  let randomStake = Math.random() * totalStake;
  let selectedValidator = null;

  for (let validator of validators) {
    if (randomStake <= validator.stake) {
      selectedValidator = validator.name;
      break;
    }
    randomStake -= validator.stake;
  }
  return selectedValidator;
}

// Simulation settings
const validators = [
  { name: "Validator1", stake: 100 },
  { name: "Validator2", stake: 300 },
  { name: "Validator3", stake: 200 },
  { name: "Validator4", stake: 400 }
];

// Run PoW benchmark with increasing difficulty
console.log("=== Proof of Work Benchmark ===");
for (let difficulty = 3; difficulty <= 5; difficulty++) {
  const result = proofOfWork(difficulty);
  console.log(`Difficulty: ${result.difficulty}`);
  console.log(`Time taken: ${result.time} ms`);
  console.log(`Nonce: ${result.nonce}`);
  console.log(`Hash: ${result.hash}`);
  console.log("\n");
}

// Run PoS benchmark
console.log("=== Proof of Stake Benchmark ===");
const posStartTime = Date.now();
for (let i = 0; i < 10; i++) {  // Multiple rounds to simulate PoS validation rounds
  const selected = proofOfStake(validators);
  console.log(`Selected Validator: ${selected}`);
}
const posEndTime = Date.now();
console.log(`Total time for 10 PoS rounds: ${posEndTime - posStartTime} ms`);
