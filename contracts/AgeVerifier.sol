pragma solidity 0.8.17;

import {IVerifier} from "./interfaces/IVerifier.sol";

error NotOfAge();

contract AgeVerifier {
    address public immutable verifier;

    event AgeVerified(address user);

    constructor(address _verifier) {
        verifier = _verifier;
    }

    function verifyAge(uint256[8] calldata _proof, uint256[1] calldata _input) external {
        if (
            !IVerifier(verifier).verifyProof(
                [_proof[0], _proof[1]],
                [[_proof[2], _proof[3]], [_proof[4], _proof[5]]],
                [_proof[6], _proof[7]],
                _input
            )
        ) revert NotOfAge();

        emit AgeVerified(msg.sender);
    }
}
