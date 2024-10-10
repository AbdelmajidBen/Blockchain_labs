const crypto = require('crypto');
const Table = require('cli-table');

class MerkleNode {
    constructor(left, right, hash) {
        this.left = left;
        this.right = right;
        this.hash = hash;
    }
}

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves.map(leaf => this.hashLeaf(leaf));
        this.treeStructure = []; // Assurez-vous que treeStructure est initialisé ici
        this.root = this.buildTree(this.leaves);
    }

    hashLeaf(leaf) {
        return crypto.createHash('sha256').update(leaf).digest('hex');
    }

    buildTree(nodes) {
        if (nodes.length === 1) {
            return nodes[0];
        }

        const newLevel = [];
        for (let i = 0; i < nodes.length; i += 2) {
            const left = nodes[i];
            const right = (i + 1 < nodes.length) ? nodes[i + 1] : left; // dupliquer si nombre impair
            const combinedHash = this.hashNode(left, right);
            const parentNode = new MerkleNode(left, right, combinedHash);
            newLevel.push(parentNode);
            this.treeStructure.push({ left, right, hash: combinedHash }); // Ajoutez le nœud à la structure de l'arbre
        }

        return this.buildTree(newLevel);
    }

    hashNode(left, right) {
        return crypto.createHash('sha256').update(left + right).digest('hex');
    }

    getRoot() {
        return this.root.hash;
    }

    visualize() {
        const table = new Table({
            head: ['Left', 'Right', 'Hash'],
            colWidths: [70, 70, 70]
        });

        this.treeStructure.forEach(node => {
            table.push([node.left, node.right, node.hash]);
        });

        console.log(table.toString());
    }
}

// Test de l'arbre de Merkle
function testMerkleTree() {
    console.log("\n--- Test 1 ---");
    const leaves1 = ['data1', 'data2', 'data3', 'data4'];
    const merkleTree1 = new MerkleTree(leaves1);
    console.log("Root Hash:", merkleTree1.getRoot());
    merkleTree1.visualize();

    console.log("\n--- Test 2 ---");
    const leaves2 = ['apple', 'banana', 'cherry', 'date', 'fig'];
    const merkleTree2 = new MerkleTree(leaves2);
    console.log("Root Hash:", merkleTree2.getRoot());
    merkleTree2.visualize();

    console.log("\n--- Test 3 ---");
    const leaves3 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const merkleTree3 = new MerkleTree(leaves3);
    console.log("Root Hash:", merkleTree3.getRoot());
    merkleTree3.visualize();
}

// Exécutez les tests
testMerkleTree();