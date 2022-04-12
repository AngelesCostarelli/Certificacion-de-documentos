// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Documents{
    
    struct Record {
        uint256 timestamp;
        address user;
        bool exists;
        bytes32 kec;
        uint block_num;
    }
        
    mapping(bytes32 => Record) records;
    
    function setDocument( string memory _sha256 ) public {
        bytes32 hash_document = keccak256(abi.encodePacked( _sha256));
        require(records[hash_document].timestamp == 0 ,"This document has already been recorded");
           records[hash_document].timestamp = block.timestamp;
           records[hash_document].user = msg.sender;
           records[hash_document].exists = true;
           records[hash_document].kec = hash_document;
           records[hash_document].block_num =  block.number;
       }

    function getDocument(string memory _sha256) public view returns(uint256 timestamp, address user, bool exists, bytes32 kec, uint block_num) {
        bytes32 hash_document = keccak256(abi.encodePacked( _sha256)); 
        timestamp = records[hash_document].timestamp;
        user = records[hash_document].user;
        exists = records[hash_document].exists; 
        kec = records[hash_document].kec; 
        block_num = records[hash_document].block_num;
       }

    function verifier(string memory _sha256) public view returns(bool){
        bytes32 hash_document = keccak256(abi.encodePacked( _sha256));
        return records[hash_document].exists;
    }
            

}