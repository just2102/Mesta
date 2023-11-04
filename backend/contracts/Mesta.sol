// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract MestaCollection is ERC721, ERC721URIStorage, Ownable {
    string public _baseTokenURI;
    uint256 private _nextTokenId = 1; // all tokens start from 1
    string public description;
    string public coverDirectURI;
    uint256 public max_supply;

    constructor
    (
        string memory name_, 
        string memory description_,
        string memory symbol_, 
        uint256 max_supply_,
        string memory baseTokenURI_, 
        string memory coverDirectURI_
    ) 
    ERC721(name_, symbol_) Ownable(msg.sender) 
    {
        _baseTokenURI = baseTokenURI_;
        description = description_;
        coverDirectURI = coverDirectURI_;
        max_supply = max_supply_;
    }

    function safeMint(address to) public onlyOwner returns (uint256) {
        require(_nextTokenId <= max_supply, "Max supply reached");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        string memory uri = string(abi.encodePacked(Strings.toString(tokenId), ".json"));
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

contract Mesta is Ownable {
    mapping(string => address) public collections;
    address public currentCollection;

    constructor() Ownable(msg.sender) {}

    event NewCollectionCreated(address collectionAddress);
    event NewTokenMinted(address collectionAddress, address to, uint256 tokenId);

    function deployNewCollection
    (
        string memory name, 
        string memory description,
        string memory symbol,
        uint256 max_supply,
        string memory baseTokenURI,
        string memory coverDirectURI
    ) 
        public onlyOwner returns (address) {
        require(collections[name] == address(0), "Collection already exists");
        
        MestaCollection newCollection = new MestaCollection(
            name, description, symbol, 
            max_supply, baseTokenURI, coverDirectURI
        );

        collections[name] = address(newCollection);
        currentCollection = address(newCollection);

        emit NewCollectionCreated(address(newCollection));
        return address(newCollection);
    }

    function mintToken(string memory collectionName, address to) public {
        require(collections[collectionName] != address(0), "Collection does not exist");
        MestaCollection collection = MestaCollection(collections[collectionName]);
        
        uint256 mintedTokenId = collection.safeMint(to);
        
        emit NewTokenMinted(collections[collectionName], to, mintedTokenId);
    }
}
