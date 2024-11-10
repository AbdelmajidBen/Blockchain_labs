// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MiniSocial {
    struct Post {
        string message;
        address author;
        uint likeCount;
    }

    Post[] public posts;
    mapping(address => uint) public userPostCount;
    mapping(uint => mapping(address => bool)) public likedByUser;

    event PostPublished(uint postId, address indexed author, string message);
    event PostUpdated(uint postId, address indexed author, string newMessage);
    event PostDeleted(uint postId, address indexed author);
    event PostLiked(uint postId, address indexed liker);

    function publishPost(string memory _message) public {
        posts.push(Post(_message, msg.sender, 0));
        userPostCount[msg.sender]++;
        emit PostPublished(posts.length - 1, msg.sender, _message);
    }

    function getPost(uint index) public view returns (string memory, address, uint) {
        require(index < posts.length, "Index out of bounds");
        Post memory post = posts[index];
        return (post.message, post.author, post.likeCount);
    }

    function getTotalPosts() public view returns (uint) {
        return posts.length;
    }

    function deletePost(uint index) public {
        require(index < posts.length, "Index out of bounds");
        require(posts[index].author == msg.sender, "Only author can delete the post");

        delete posts[index];
        userPostCount[msg.sender]--;
        emit PostDeleted(index, msg.sender);
    }
    function updatePost(uint index, string memory _newMessage) public {
        require(index < posts.length, "Index out of bounds");
        require(posts[index].author == msg.sender, "Only author can update the post");

        posts[index].message = _newMessage;
        emit PostUpdated(index, msg.sender, _newMessage);
    }

    function likePost(uint index) public {
        require(index < posts.length, "Index out of bounds");
        require(posts[index].author != msg.sender, "Author cannot like their own post");
        require(!likedByUser[index][msg.sender], "User has already liked this post");

        posts[index].likeCount++;
        likedByUser[index][msg.sender] = true;
        emit PostLiked(index, msg.sender);
    }

    function getUserPostCount(address user) public view returns (uint) {
        return userPostCount[user];
    }
}
