pragma solidity ^0.8.0;

contract FoolVault {

  address owner = msg.sender;
  address latestVersion;
  address lastFool;
  uint256 lastDeposit;

  modifier onlyLatestVersion() {
    require(msg.sender == latestVersion);
    _;
  }

  function upgradeVersion(address _newVersion) public {
    require(msg.sender == owner);
    latestVersion = _newVersion;
  }

  // *** Getter Methods ***
  function getLastDeposit() external view returns(uint256) {
    return lastDeposit;
  }

  function getLastFool() external view returns(address) {
    return lastFool;
  }

    // *** Setter Methods ***
  function setLastDeposit(uint256 _value) onlyLatestVersion external {
    lastDeposit = _value;
  }

  function setLastFool(address _value) onlyLatestVersion external {
    lastFool = _value;
  }
}