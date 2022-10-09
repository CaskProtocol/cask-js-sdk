const fs = require('fs');
const path = require('path');

const artifactPath = path.resolve(__dirname, '../../cask-contracts/artifacts/contracts');
const outputPath = path.resolve(__dirname, '../src/core/abi');

const abiJSONfilenames = [
    'interfaces/ICaskVault.sol/ICaskVault.json',
    'interfaces/ICaskSubscriptions.sol/ICaskSubscriptions.json',
    'interfaces/ICaskSubscriptionPlans.sol/ICaskSubscriptionPlans.json',
    'subscriptions/CaskSubscriptionManager.sol/CaskSubscriptionManager.json',
    'dca/CaskDCA.sol/CaskDCA.json',
    'dca/CaskDCAManager.sol/CaskDCAManager.json',
    'p2p/CaskP2P.sol/CaskP2P.json',
    'p2p/CaskP2PManager.sol/CaskP2PManager.json',
    'chainlink_topup/CaskChainlinkTopup.sol/CaskChainlinkTopup.json',
    'chainlink_topup/CaskChainlinkTopupManager.sol/CaskChainlinkTopupManager.json',
];

for (const filename of abiJSONfilenames) {
    const fullPath = `${artifactPath}/${filename}`;
    const split = fullPath.split('/');
    const contractFileName = split[split.length - 1];
    const contractName = contractFileName.split('.json')[0];
    console.log(`Writing ABI for ${contractName} to ${outputPath+'/'+contractName}.js`);
    const json = JSON.parse(fs.readFileSync(path.resolve(fullPath), 'utf8'));
    fs.writeFileSync(outputPath + '/' + contractName+'.js', 'export default ' + JSON.stringify(json, null, 2));
}

