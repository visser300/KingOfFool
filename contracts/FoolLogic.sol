pragma solidity ^0.8.0;

import "@openzeppelin/contracts4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts4.7.3/utils/math/SafeMath.sol";
import "@openzeppelin/contracts4.7.3/security/Pausable.sol";
import "@openzeppelin/contracts4.7.3/security/ReentrancyGuard.sol";
import "./FoolVault.sol";

interface IERC20 {
    function transfer(address _to, uint256 _value) external returns (bool);
}

contract FoolLogic is Ownable, Pausable, ReentrancyGuard {

  using SafeMath for uint256;
  address eternalStorage;

  constructor(address _eternalStorage) {
    eternalStorage = _eternalStorage;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function recordLastFool(address _lastFool, uint256 _lastDeposit) external onlyOwner whenNotPaused() nonReentrant() {
    IERC20 usdt = IERC20(address(0xdAC17F958D2ee523a2206206994597C13D831ec7));
    FoolVault vault = FoolVault(eternalStorage);

    uint256 internalDeposit = vault.getLastDeposit();
    address internalFool = vault.getLastFool();
    require(_lastDeposit >= internalDeposit * 2, "deposit is too small");
  
    vault.setLastDeposit(_lastDeposit);
    vault.setLastFool(_lastFool);

    if (internalDeposit > 0) {

      usdt.transfer(internalFool, internalDeposit);
    }
  }
}