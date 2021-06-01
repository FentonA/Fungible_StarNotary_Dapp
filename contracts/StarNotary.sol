pragma solidity >=0.4.21 <0.7.0;

contract StarNotary {
    string public starName;
    address public starOwner;
    
    event starClaimed(address owner);
    event starNamed(address);
    
    constructor() public {
        starName = "Alf's Star";
    }
    
    function claimStar() public{
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }

    function nameStar(string memory _name) public{
        starName = _name;
    }
}