// contracts/PingCounter.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PingCounter {
    uint256 public totalping;
    mapping(address => uint256) public userping;

    function ping() public {
        userping[msg.sender] +=1;
        totalping +=1;

    }

    function getpingcount() public view returns (uint256){
        return userping[msg.sender];
    }

    function gettotalping() public view returns (uint256) {
        return totalping;
    }
}