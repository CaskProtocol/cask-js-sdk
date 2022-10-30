import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";


function dcaAssetspecHash(asset) {
    return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
        [ "uint8", "bytes", "address", "address", "address[]" ],
        [
            asset.swapProtocol,
            asset.swapData,
            asset.router.toLowerCase(),
            asset.priceFeed.toLowerCase(),
            asset.path.map((p) => p.toLowerCase())
        ]
    ));
}

function dcaAssetspec(asset) {
    return [
        asset.router.toLowerCase(),
        asset.priceFeed.toLowerCase(),
        ...asset.path.map((a) => a.toLowerCase())
    ];
}

function dcaPricespec(period, amount, totalAmount, maxSlippageBps, minPrice, maxPrice) {
    return [period, amount, totalAmount, maxSlippageBps, minPrice, maxPrice];
}

function _dcaMerkleTree(assetList) {
    const elements = assetList.map((asset) => dcaAssetspecHash(asset));
    return new MerkleTree(elements, keccak256, { sort: true });
}

function dcaMerkleRoot(assetList) {
    const merkleTree = _dcaMerkleTree(assetList);
    return ethers.utils.hexZeroPad(merkleTree.getHexRoot(), 32);
}

function dcaMerkleProof(assetList, asset) {
    const merkleTree = _dcaMerkleTree(assetList);
    return merkleTree.getHexProof(dcaAssetspecHash(asset));
}

function dcaMerkleVerify(assetList, asset, proof) {
    const merkleTree = _dcaMerkleTree(assetList);
    const leaf = dcaAssetspecHash(asset);
    return merkleTree.verify(proof, leaf, merkleTree.getHexRoot());
}

function getDCAAsset(assetList, asset) {
    return assetList.find((a) => a.path[a.path.length-1].toLowerCase() === asset.toLowerCase());
}



export default {
    // dca helpers
    dcaAssetspecHash,
    dcaAssetspec,
    dcaPricespec,
    dcaMerkleRoot,
    dcaMerkleProof,
    dcaMerkleVerify,
    getDCAAsset,
}