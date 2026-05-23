// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FocusTracker {
    mapping(address => uint256) public userFocusMinutes;

    function logSession() public {
        userFocusMinutes[msg.sender] += 25;
    }
}
