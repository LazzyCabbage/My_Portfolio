// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VisitorCounter {
    uint256 public count;
    event Visited(address indexed visitor, uint256 newCount);

    function visit() external {
        count++;
        emit Visited(msg.sender, count);
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}
