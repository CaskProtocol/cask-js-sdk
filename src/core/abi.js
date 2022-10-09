import CaskSubscriptionsAbi from "./abi/ICaskSubscriptions.js";
import CaskSubscriptionPlansAbi from "./abi/ICaskSubscriptionPlans.js";
import CaskSubscriptionManagerAbi from "./abi/CaskSubscriptionManager.js";
import CaskVaultAbi from "./abi/ICaskVault.js";
import CaskDCAAbi from "./abi/CaskDCA.js";
import CaskDCAManagerAbi from "./abi/CaskDCAManager.js";
import CaskP2PAbi from "./abi/CaskP2P.js";
import CaskP2PManagerAbi from "./abi/CaskP2PManager.js";
import CaskChainlinkTopupAbi from "./abi/CaskChainlinkTopup.js";
import CaskChainlinkTopupManagerAbi from "./abi/CaskChainlinkTopupManager.js";

import AggregatorV3InterfaceAbi from "./abi/AggregatorV3Interface.js";
import ERC20Abi from "./abi/ERC20Metadata.js";
import ERC721Abi from "./abi/ERC721Metadata.js";
import IUniswapV2Router02Abi from "./abi/IUniswapV2Router02.js";
import IStdReferenceAbi from "./abi/IStdReference.js";
import AutomationRegistryBaseInterface from "./abi/AutomationRegistryBaseInterface.js";
import VRFCoordinatorV2Interface from "./abi/VRFCoordinatorV2Interface.js";


/**
 * Cask contract ABIs per environment.
 *
 * @namespace CaskSDK.abi
 */


/**
 * @enum
 * @memberof CaskSDK.abi
 */
const abi = {
  CaskSubscriptions: CaskSubscriptionsAbi.abi,
  CaskSubscriptionPlans: CaskSubscriptionPlansAbi.abi,
  CaskSubscriptionManager: CaskSubscriptionManagerAbi.abi,
  CaskVault: CaskVaultAbi.abi,
  CaskDCA: CaskDCAAbi.abi,
  CaskDCAManager: CaskDCAManagerAbi.abi,
  CaskP2P: CaskP2PAbi.abi,
  CaskP2PManager: CaskP2PManagerAbi.abi,
  CaskChainlinkTopup: CaskChainlinkTopupAbi.abi,
  CaskChainlinkTopupManager: CaskChainlinkTopupManagerAbi.abi,
  AggregatorV3Interface: AggregatorV3InterfaceAbi.abi,
  ERC20: ERC20Abi.abi,
  ERC721: ERC721Abi.abi,
  IUniswapV2Router02: IUniswapV2Router02Abi.abi,
  IStdReference: IStdReferenceAbi.abi,
  AutomationRegistryBaseInterface: AutomationRegistryBaseInterface.abi,
  VRFCoordinatorV2Interface: VRFCoordinatorV2Interface.abi,
};

export default abi;