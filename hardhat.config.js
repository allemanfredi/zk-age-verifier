require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('@openzeppelin/hardhat-upgrades')
require('hardhat-gas-reporter')
require('@nomicfoundation/hardhat-chai-matchers')
// require('hardhat-spdx-license-identifier')
require('hardhat-log-remover')
require('solidity-coverage')
require('@nomicfoundation/hardhat-toolbox')

const getEnvironmentVariable = (_envVar) => process.env[_envVar] || ''

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.17',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true
        }
      }
    }
  },
  networks: {
    hardhat: {
      /*forking: {
        url: `${getEnvironmentVariable('MAINNET_NODE')}`,
        accounts: [getEnvironmentVariable('PK')]
      }*/
    },
    local: {
      url: 'http://localhost:8545'
    },
    /*mainnet: {
      url: getEnvironmentVariable('MAINNET_NODE'),
      accounts: [getEnvironmentVariable('PK')],
      gasPrice: 20e9
    },
    polygon: {
      url: getEnvironmentVariable('POLYGON_NODE'),
      accounts: [getEnvironmentVariable('PK')],
      gasPrice: 400e9
    },
    mumbai: {
      url: getEnvironmentVariable('MUMBAI_NODE'),
      accounts: [getEnvironmentVariable('PK')],
      gasPrice: 400e9
    },
    bsc: {
      url: getEnvironmentVariable('BSC_NODE'),
      accounts: [getEnvironmentVariable('PK')],
      gasPrice: 5e9
    },
    sepolia: {
      url: getEnvironmentVariable('SEPOLIA_NODE'),
      accounts: [getEnvironmentVariable('PK')]
    }*/
  },
  etherscan: {
    apiKey: {
      mainnet: getEnvironmentVariable('ETHERSCAN_API_KEY'),
      polygon: getEnvironmentVariable('POLYGONSCAN_API_KEY')
    },
    customChains: [
      {
        network: 'polygon',
        chainId: 137,
        urls: {
          apiURL: 'https://api.polygonscan.com/api',
          browserURL: 'https://polygonscan.com'
        }
      },
      {
        network: 'sepolia',
        chainId: 11155111,
        urls: {
          apiURL: 'https://api.sepolia.etherscan.io/api',
          browserURL: 'https://sepolia.etherscan.io'
        }
      },
      {
        network: 'mumbai',
        chainId: 80001,
        urls: {
          apiURL: 'https://api.mumbai.polygonscan.com/api',
          browserURL: 'https://mumbai.polygonscan.com/'
        }
      }
    ]
  },
  gasReporter: {
    enabled: true
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: false
  },
  mocha: {
    timeout: 100000000
  }
}
