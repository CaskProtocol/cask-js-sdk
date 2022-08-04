import CaskSubscriptionsAbi from "./abi/ICaskSubscriptions.js";
import CaskSubscriptionPlansAbi from "./abi/ICaskSubscriptionPlans.js";
import CaskVaultAbi from "./abi/ICaskVault.js";
import CaskDCAAbi from "./abi/ICaskDCA.js";
import CaskP2PAbi from "./abi/ICaskP2P.js";

import AggregatorV3InterfaceAbi from "./abi/AggregatorV3Interface.js";
import ERC20Abi from "./abi/ERC20Metadata.js";
import ERC721Abi from "./abi/ERC721Metadata.js";
import IUniswapV2Router02Abi from "./abi/IUniswapV2Router02.js";
import IStdReferenceAbi from "./abi/IStdReference.js";


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
  /**
   * CaskSubscriptions ABI per environment.
   */
  CaskSubscriptions: CaskSubscriptionsAbi.abi,
  /**
   * CaskSubscriptionPlans ABI per environment.
   */
  CaskSubscriptionPlans: CaskSubscriptionPlansAbi.abi,
  /**
   * CaskVault ABI per environment.
   */
  CaskVault: CaskVaultAbi.abi,
  /**
   * CaskDCA ABI per environment.
   */
  CaskDCA: CaskDCAAbi.abi,
  /**
   * CaskVault ABI per environment.
   */
  CaskP2P: CaskP2PAbi.abi,
  /**
   * AggregatorV3Interface ABI.
   */
  AggregatorV3Interface: AggregatorV3InterfaceAbi.abi,
  /**
   * ERC20 ABI.
   */
  ERC20: ERC20Abi.abi,
  /**
   * ERC721 ABI.
   */
  ERC721: ERC721Abi.abi,
  /**
   * IUniswapV2Router02 ABI.
   */
  IUniswapV2Router02: IUniswapV2Router02Abi.abi,
  /**
   * Band Protocol Oracle IStdReference ABI.
   */
  IStdReference: IStdReferenceAbi.abi,
};

export default abi;