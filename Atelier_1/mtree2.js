const crypto = require('crypto');

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
        this.root = this.buildTree(this.leaves);
        this.visualTree = []; // To store the tree structure
    }

    hashLeaf(leaf) {
        return crypto.createHash('sha256').update(leaf).digest('hex');
    }

    buildTree(nodes) {
        if (nodes.length === 1) {
            return nodes[0]; // Root hash
        }

        const newLevel = [];
        for (let i = 0; i < nodes.length; i += 2) {
            const left = nodes[i];
            const right = (i + 1 < nodes.length) ? nodes[i + 1] : left;
            const combinedHash = this.hashNode(left, right);
            const parentNode = new MerkleNode(left, right, combinedHash);
            newLevel.push(parentNode);
        }

        // Build next level
        return this.buildTree(newLevel);
    }

    hashNode(left, right) {
        return crypto.createHash('sha256').update(left + right).digest('hex');
    }

    visualizeTree() {
        console.log(this.printNode(this.root, "", true));
    }

    printNode(node, prefix, isTail) {
        let result = "";
        if (typeof node === 'string') {
            result += prefix + (isTail ? "└── " : "├── ") + node + "\n";
        } else {
            result += prefix + (isTail ? "└── " : "├── ") + node.hash + "\n";
            const children = [node.left, node.right];
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                result += this.printNode(child, prefix + (isTail ? "    " : "│   "), i === children.length - 1);
            }
        }
        return result;
    }

    getRoot() {
        return this.root.hash;
    }
}

// Test with different data sets
function testMerkleTree() {
    const leaves1 = ['data1', 'data2', 'data3', 'data4'];
    const merkleTree1 = new MerkleTree(leaves1);
    console.log("Root Hash:", merkleTree1.getRoot());
    merkleTree1.visualizeTree();

    const leaves2 = ['apple', 'banana', 'cherry', 'date', 'fig'];
    const merkleTree2 = new MerkleTree(leaves2);
    console.log("Root Hash:", merkleTree2.getRoot());
    merkleTree2.visualizeTree();
}

testMerkleTree();
