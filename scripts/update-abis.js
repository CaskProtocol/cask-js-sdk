const fs = require('fs');
const path = require('path');
const glob = require('glob');

const environment = process.argv[2] || 'development';

const artifactPath = path.resolve(__dirname, '../../p-cask-contracts/artifacts/contracts/interfaces');
const outputPath = path.resolve(__dirname, '../src/core/abi/'+environment);

const abiJSONfilenames = [
    'ICaskVault',
    'ICaskSubscriptions',
    'ICaskSubscriptionPlans',
];

glob(artifactPath + '/**/!(*dbg).json', {}, (err, files) => {
    if (err) {
        console.error(err);
    }
    for (const filename of files) {
        const split = filename.split('/');
        const contractFileName = split[split.length - 1];
        const contractName = contractFileName.split('.json')[0];
        if (abiJSONfilenames.includes(contractName)) {
            console.log(`Writing ABI for ${contractName} to ${outputPath+'/'+contractName}.js`);
            const json = JSON.parse(fs.readFileSync(path.resolve(filename), 'utf8'));
            fs.writeFileSync(outputPath + '/' + contractName+'.js',
                'export default ' + JSON.stringify(json, null, 2));
        }
    }
});
