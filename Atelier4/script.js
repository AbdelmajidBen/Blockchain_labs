
let contract;
const contractAddress = '0x057ef64E23666F000b34aE31332854aCBd1c8544';  // Replace with your contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "deletePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "likePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "author",
				"type": "address"
			}
		],
		"name": "PostDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "liker",
				"type": "address"
			}
		],
		"name": "PostLiked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "PostPublished",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "PostUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "publishPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_newMessage",
				"type": "string"
			}
		],
		"name": "updatePost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getPost",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPosts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserPostCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "likedByUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "postLikes",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "posts",
		"outputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "likeCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userPostCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
;

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        alert('Please install MetaMask!');
    }
}

async function loadContract() {
    contract = new window.web3.eth.Contract(contractABI, contractAddress);
}

function updateStatus(message) {
    document.getElementById('status').innerText = message;
    console.log(message);
}

// Toast function
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 4000);
}

async function publishPost() {
    const message = document.getElementById('postMessage').value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.publishPost(message).send({ from: accounts[0] });
    showToast('Post published successfully.');
    loadPosts(); // Reload posts after publishing
}

async function getPost() {
    const postId = document.getElementById('postId').value;
    try {
        const post = await contract.methods.getPost(postId).call();

        // Update UI with the fetched post data
        document.getElementById('message').innerText = post[0];
        document.getElementById('author').innerText = post[1];
        document.getElementById('likes').innerText = post[2];

        // Show the post details container
        document.getElementById('postDetailsContainer').style.display = 'block';
    } catch (error) {
        console.error('Error fetching post:', error);
        // If there's an error, display a message
        document.getElementById('postDetailsContainer').style.display = 'none';
        alert('Failed to fetch post. Please check the post ID or try again later.');
    }
}

async function likePost(postId) {
    try {
        console.log("Liking post with ID:", postId);

        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Increase gas limit and gas price
        const gasLimit = 2000000; // Increase gas limit
        const gasPrice = web3.utils.toWei('20', 'gwei'); // Increase gas price if needed

        // Send the transaction
        const transaction = await contract.methods.likePost(postId).send({
            from: accounts[0],
            gas: gasLimit,
            gasPrice: gasPrice
        });

        console.log("Transaction receipt:", transaction);

        const post = await contract.methods.getPost(postId).call();
        console.log("Post liked successfully, new like count:", post.likeCount);

        loadPosts();  // Re-fetch the posts to reflect the updated like counts
    } catch (error) {
        console.error("Error liking the post:", error);
        showToast("Error liking the post: " + error.message);
    }
}



async function updatePost(postId) {
    const newMessage = prompt("Enter the new message for the post:");
    if (!newMessage) {
        alert("Please provide a new message.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.updatePost(postId, newMessage).send({ from: accounts[0] });
        showToast('Post updated successfully.');
        loadPosts(); // Reload posts after update
    } catch (error) {
        console.error("Error updating the post:", error);
        showToast("Error updating the post: " + error.message);
    }
}

async function deletePost(postId) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) {
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await contract.methods.deletePost(postId).send({ from: accounts[0] });
        showToast('Post deleted successfully.');

        // Remove the post from the UI by removing its post container
        const postDiv = document.querySelector(`#post-${postId}`);
        if (postDiv) {
            postDiv.remove();
        }

        loadPosts(); // Reload posts after delete
    } catch (error) {
        console.error("Error deleting the post:", error);
        showToast("Error deleting the post: " + error.message);
    }
}

async function loadPosts() {
    const postCount = await contract.methods.getTotalPosts().call();
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = ''; // Clear the existing posts

    for (let i = 0; i < postCount; i++) {
        const post = await contract.methods.getPost(i).call();

        // Format the date properly
        const postDate = new Date(post[2]);
        const formattedDate = postDate.toLocaleString(); // You can adjust this format if needed

        // Create a post container
        const postDiv = document.createElement('div');
        postDiv.classList.add('post-item', 'border-b', 'border-gray-200', 'py-4', 'px-4', 'mb-4', 'rounded-lg', 'shadow-md');
        postDiv.innerHTML = `
        <div class="post-id mb-2 text-sm text-gray-400" style="color: #999;">
                <span>Post ID: ${i}</span>
            </div>
            <div class="post-header mb-2">
                <span class="text-lg" style="color:#666">${post[1]}</span>
                <span class="text-sm text-gray-500">${formattedDate}</span>
            </div>
            <div class="post-content flex justify-center mb-4">
                <p class="text-gray-700 max-w-lg text-center" style="text-align: center; color: #007BFF;">${post[0]}</p>
            </div>
            
            <div class="post-actions flex items-center space-x-4 mt-2">
                <span class="icon-like text-xl cursor-pointer hover:text-blue-500" onclick="likePost(${i})">👍</span>
                <span class="icon-update text-xl cursor-pointer hover:text-yellow-500" onclick="updatePost(${i})">✏️</span>
                <span class="icon-delete text-xl cursor-pointer hover:text-red-500" onclick="deletePost(${i})">🗑️</span>
                <span class="icon-dislike text-xl cursor-pointer hover:text-blue-500" onclick="deletePost(${i})">👎</span>
                <input type="text" placeholder="Write a comment..." class="ml-4 p-2 border border-gray-300 rounded-md w-48 text-sm">
            </div>
        `;

        postsList.appendChild(postDiv);
    }
}
window.onload = async () => {
    await loadWeb3();
    await loadContract();
    await loadPosts();
}
