pragma solidity ^0.6.0;
contract TracksDapp {
    address payable public owner;
    struct Track{
        address payable ownerAddress;
        mapping(address=>bool) advertisers;
        uint256 value;//value for 1 advertisement
    }
    mapping (string=>Track) Tracks;
    constructor ()public {
        owner=msg.sender;
    }
    
    function addTrack(uint256  _value,string memory _name)public {
        
        Tracks[_name].ownerAddress=msg.sender;
        Tracks[_name].value=_value;
    }
    function buyAdvertisement ( string memory trackName) public payable {
        Track memory track=Tracks[trackName];
        address payable trackOwner=track.ownerAddress;
        trackOwner.transfer(msg.value);
        Tracks[trackName].advertisers[msg.sender]=true;
    } 
    
    function getTrack(string memory _name)public view returns(address,uint256){
        Track memory track=Tracks[_name];
        return (track.ownerAddress,track.value);
    }
    
   
    
    function redeemAdvertise(string memory _name) public returns(bool){
        require(Tracks[_name].advertisers[msg.sender] == true,"You can't advertise, you should buy first");
        Tracks[_name].advertisers[msg.sender] = false;
        return true;
    }
}



