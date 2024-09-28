// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./verifier.sol"; // Import the ZoKrates-generated Verifier.sol

contract ZkVoting {
    Verifier private verifier;

    struct Vote {
        bool hasVoted;
    }

    mapping(address => Vote) public votes;

    constructor(address verifierAddress) {
        verifier = Verifier(verifierAddress); // Initialize the Verifier contract
    }

    // Function to submit a vote
    function vote(Verifier.Proof memory proof, uint[2] memory input) public {
        require(!votes[msg.sender].hasVoted, "You have already voted");

        // Verify zk-SNARK proof using the verifier
        require(verifier.verifyTx(proof, input), "Invalid zk-SNARK proof");

        // Record that the user has voted (we don't store their vote choice to preserve privacy)
        votes[msg.sender] = Vote(true);
    }
}
