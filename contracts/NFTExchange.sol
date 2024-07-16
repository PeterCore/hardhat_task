  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "./AuthorControlledNFT.sol";
contract NFTExchange is Initializable, ERC721Upgradeable, OwnableUpgradeable,ERC721URIStorageUpgradeable{
   // address payable owner;
 
    constructor(){
        _disableInitializers();
    }
     function initialize(address initialOwner) initializer public {
        __ERC721URIStorage_init();
        __Ownable_init(initialOwner);
    }
    
     function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
     {
        return super.tokenURI(tokenId);
     }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    function nftApprove(uint256 tokenId) public {
        AuthorControlledNFT authorController = new AuthorControlledNFT();
        address currentAuthor  = authorController.getTokenAuthor(tokenId);
        address _address = msg.sender;
        require(currentAuthor == _address, "");
        _approve(address(this), tokenId, _address);
        
    }

    function list(uint256 tokenId) public payable onlyOwner {
        require(_getApproved(tokenId) == address(this),"Need Approval"); 
        AuthorControlledNFT authorController = new AuthorControlledNFT();
        uint256 price = authorController.getPrice(tokenId);
        require(price > 0,"The price must be greater than 0 "); // 价格大于0
      } 
   
}
  
 