const { expect } = require('chai')
const { ethers } = require('hardhat')
const { groth16 } = require('snarkjs')

let ageVerifier, owner

describe('AgeVerifier', () => {
  before(async () => {
    const Verifier = await ethers.getContractFactory('Verifier')
    const AgeVerifier = await ethers.getContractFactory('AgeVerifier')

    const accounts = await ethers.getSigners()
    owner = accounts[0]

    const verifier = await Verifier.deploy()
    ageVerifier = await AgeVerifier.deploy(verifier.address)
  })

  it('Should verify if age is above 18', async () => {
    const wasmFilePath = './build/snark/age_verifier.wasm'
    const finalZkeyPath = './build/snark/age_verifier_final.zkey'
    const witness = {
      age: 21
    }

    const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)

    const solidityProof = [
      proof.pi_a[0],
      proof.pi_a[1],
      proof.pi_b[0][1],
      proof.pi_b[0][0],
      proof.pi_b[1][1],
      proof.pi_b[1][0],
      proof.pi_c[0],
      proof.pi_c[1]
    ]

    const transaction = ageVerifier.verifyAge(solidityProof, publicSignals)
    await expect(transaction)
      .to.emit(ageVerifier, 'AgeVerified')
      .withArgs(owner.address)
  })
})
