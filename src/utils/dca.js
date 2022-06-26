import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";


function _dcaMerkleLeafHash(asset) {
    return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
        [ "address[]" ],
        [ [asset.router.toLowerCase(), asset.priceFeed.toLowerCase(), ...asset.path.map((p) => p.toLowerCase())] ]
    ));
}

function _dcaMerkleTree(assetList) {
    const elements = assetList.map((asset) => _dcaMerkleLeafHash(asset));
    return new MerkleTree(elements, keccak256, { sort: true });
}

function dcaMerkleRoot(assetList) {
    const merkleTree = _dcaMerkleTree(assetList);
    return ethers.utils.hexZeroPad(merkleTree.getHexRoot(), 32);
}

function dcaMerkleProof(assetList, asset) {
    const merkleTree = _dcaMerkleTree(assetList);
    return merkleTree.getHexProof(_dcaMerkleLeafHash(asset));
}

function dcaMerkleVerify(assetList, asset, proof) {
    const merkleTree = _dcaMerkleTree(assetList);
    const leaf = _dcaMerkleLeafHash(asset);
    return merkleTree.verify(proof, leaf, merkleTree.getHexRoot());
}

function getDCAAsset(assetList, asset) {
    return assetList.find((a) => a.path[a.path.length-1].toLowerCase() === asset.toLowerCase());
}



export default {
    // dca helpers
    dcaMerkleRoot,
    dcaMerkleProof,
    dcaMerkleVerify,
    getDCAAsset,
}