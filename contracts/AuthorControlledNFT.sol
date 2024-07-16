// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";

struct NFTItem {
    uint createTime; //timestamp
    bool sold;
    uint256 price;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    string name;  
}



contract AuthorControlledNFT is Initializable, ERC721Upgradeable, OwnableUpgradeable,ERC721URIStorageUpgradeable {
    // 映射从tokenId到作者地址
    mapping(uint256 => address) private tokenAuthors;
    // 映射从作者地址到其铸币权限
    mapping(address => bool) public authorizedAuthors;
    // 
    mapping(uint256 => uint256) private nftPrices;
    uint256 private _nextTokenId;

    constructor(){

    }
    
    modifier onlyAuthor (){
        require(authorizedAuthors[msg.sender], "You are not authorized to mint");
        _;
    }

    function initialize(address initialOwner) public initializer {
        __ERC721_init("AuthorControlledNFT", "ACNFT");
        __ERC721URIStorage_init();
        __Ownable_init(initialOwner);
    }

    // 仅合约所有者可调用，添加或移除作者的铸币权限
    function setAuthorPermission(address author, bool hasPermission) public onlyOwner {
        authorizedAuthors[author] = hasPermission;
    }

    // 作者自己铸币的功能
    function authorMint(string memory uri,uint256 price) public onlyOwner onlyAuthor {
        require(price > 0, "The price must be greater than 0 ");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        tokenAuthors[tokenId] = msg.sender;
        nftPrices[tokenId] = price;      
    }
    
    
    function getPrice(uint256 tokenId) public view onlyAuthor returns(uint256){
        require(_ownerOf(tokenId) != address(0),"it is not owner of nft");
        return nftPrices[tokenId];
    }

    
    
    // 检索NFT的作者
    function getTokenAuthor(uint256 tokenId) public view returns (address) {
        return tokenAuthors[tokenId];
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
}