// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.7;

interface IERC20 {
    function transfer(address _to, uint256 _value) external returns (bool);
    function approval(address owner, address spender, uint256 _value) external returns (bool);
}

contract KingOfFool {
    address private lastEthOwner;
    uint256 private lastEthAmount;
    address private lastUsdcOwner;
    uint256 private lastUsdcAmount;

    event ReceivedUSDC(address, uint);
    event ReceivedETH(address, uint);

    function depositUSDC(uint256 _amount) external {

        if (lastUsdcAmount > 0) {
            require((lastUsdcAmount * 3) >= (_amount * 2), "amount is too small !");
        }

        IERC20 usdc = IERC20(address(0x07865c6E87B9F70255377e024ace6630C1Eaa37F));
        usdc.transfer(msg.sender, _amount);

        if (lastEthOwner != address(0)) {
            usdc.transfer(lastUsdcOwner, lastUsdcAmount);
        }

        lastUsdcOwner = msg.sender;
        lastUsdcAmount = _amount;

        emit ReceivedUSDC(msg.sender, _amount);
    }

    function depositEth() public payable {

        if (lastEthAmount > 0) {
            require((msg.value * 3) >= (lastEthAmount * 2), "amount is too small !");
        }

        if (lastEthOwner != address(0)) {
            (bool sent,) = lastEthOwner.call{value: msg.value}("");
            require(sent, "Failed to send Ether");
        }

        lastEthOwner = msg.sender;
        lastEthAmount = msg.value;

        emit ReceivedETH(msg.sender, msg.value);
    }
}