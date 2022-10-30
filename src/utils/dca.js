import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";


function dcaAssetspecHash(asset) {
    return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
        [ "uint8", "address", "address", "address[]" ],
        [
            asset.swapProtocol,
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
    dcaMerkleRoot,
    dcaMerkleProof,
    dcaMerkleVerify,
    getDCAAsset,
}