// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Crud { 
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId = 1;

    function create(string memory name) public {
        users.push(User(nextId, name));
        nextId++;
    }

    function read(uint id) view public returns (uint, string memory) {
        uint user = find(id);
        return (users[user].id, users[user].name);
    }

    function update(uint id, string memory name) public {
        uint user = find(id);
        users[user].name = name;
    }

    function del(uint id) public {
        uint user = find(id);
        delete users[user];
    }

    function find(uint id) view internal returns(uint) {
    for (uint i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return i;
      }
    }
    revert('User does not exist');
  } 
}