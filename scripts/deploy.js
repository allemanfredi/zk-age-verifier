const { ethers } = require('hardhat')

const main = async () => {
  const Verifier = await ethers.getContractFactory('Verifier')
  const AgeVerifier = await ethers.getContractFactory('AgeVerifier')

  console.log('Deploying verifier on Ethereum ...')
  const verifier = await Verifier.deploy()
  const ageVerifier = await AgeVerifier.deploy(verifier.address)
  console.log({
    ageVerifier,
    verifier
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
