import hashlib
import time
import random
import matplotlib.pyplot as plt

class Block:
    def __init__(self, index, previous_hash, timestamp, data, nonce=0):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.nonce = nonce
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        value = f"{self.index}{self.previous_hash}{self.timestamp}{self.data}{self.nonce}".encode()
        return hashlib.sha256(value).hexdigest()

    def __repr__(self):
        return f"Block(Index: {self.index}, Hash: {self.hash}, Previous Hash: {self.previous_hash})"


class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, "0", int(time.time()), "Genesis Block")
        self.chain.append(genesis_block)

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, block):
        self.chain.append(block)

    def proof_of_work(self, block, difficulty):
        print(f"\nMining Block {block.index} with difficulty {difficulty}...")
        start_time = time.time()
        while block.hash[:difficulty] != "0" * difficulty:
            block.nonce += 1
            block.hash = block.calculate_hash()
        elapsed_time = time.time() - start_time
        print(f"Block mined: {block.hash}")
        print(f"Time taken to mine block: {elapsed_time:.2f} seconds")
        return elapsed_time


def test_proof_of_work():
    blockchain = Blockchain()

    # List to hold the time taken for each difficulty
    times = []
    difficulties = [1, 2, 3, 4, 5]
    
    for difficulty in difficulties:
        # Create a new block with random data
        data = f"Block data {random.randint(1, 100)}"
        new_block = Block(len(blockchain.chain), blockchain.get_latest_block().hash, int(time.time()), data)
        elapsed_time = blockchain.proof_of_work(new_block, difficulty)
        blockchain.add_block(new_block)
        times.append(elapsed_time)
        print(new_block)

    # Visualisation des temps de minage
    plt.figure(figsize=(10, 5))
    plt.plot(difficulties, times, marker='o')
    plt.title('Temps de minage en fonction de la difficulté')
    plt.xlabel('Difficulté')
    plt.ylabel('Temps (secondes)')
    plt.xticks(difficulties)
    plt.grid()
    plt.show()


# Run the proof of work test
if __name__ == "__main__":
    test_proof_of_work()