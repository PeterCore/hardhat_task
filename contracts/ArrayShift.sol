// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
contract ArrayShift {
     uint[] public arr;

    constructor(){
        arr = [1,2,3,4,5,5];
    }

    function removeElement(uint _index) public {
        uint length = arr.length;
        require(length > 0,"Array is empty");
        require(_index < length, "index out of bound");
        for (uint i = _index; i < length-1; i++) {
            arr[i] = arr[i+1];
        }
        arr.pop();
    }

    function getArray() public view returns(uint[] memory){
        return arr;
    }

    function lowerGasRemove(uint _index) public  {
        uint length = arr.length;
        require(length > 0,"Array is empty");
        require(_index < length, "index out of bound");
        arr[_index] = arr[length - 1];
        arr.pop();
        
    }
}