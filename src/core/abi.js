import environments from "./environments.js";

import CaskSubscriptionsTestnetAbi from "./abi/testnet/ICaskSubscriptions.js";
import CaskSubscriptionPlansTestnetAbi from "./abi/testnet/ICaskSubscriptionPlans.js";
import CaskVaultTestnetAbi from "./abi/testnet/ICaskVault.js";
import CaskDCATestnetAbi from "./abi/testnet/ICaskDCA.js";
import CaskP2PTestnetAbi from "./abi/testnet/ICaskP2P.js";

import CaskSubscriptionsDevelopmentAbi from "./abi/development/ICaskSubscriptions.js";
import CaskSubscriptionPlansDevelopmentAbi from "./abi/development/ICaskSubscriptionPlans.js";
import CaskVaultDevelopmentAbi from "./abi/development/ICaskVault.js";
import CaskDCADevelopmentAbi from "./abi/development/ICaskDCA.js";
import CaskP2PDevelopmentAbi from "./abi/development/ICaskP2P.js";

import CaskSubscriptionsProductionAbi from "./abi/production/ICaskSubscriptions.js";
import CaskSubscriptionPlansProductionAbi from "./abi/production/ICaskSubscriptionPlans.js";
import CaskVaultProductionAbi from "./abi/production/ICaskVault.js";
import CaskDCAProductionAbi from "./abi/production/ICaskDCA.js";
import CaskP2PProductionAbi from "./abi/production/ICaskP2P.js";

import CaskSubscriptionsInternalAbi from "./abi/internal/ICaskSubscriptions.js";
import CaskSubscriptionPlansInternalAbi from "./abi/internal/ICaskSubscriptionPlans.js";
import CaskVaultInternalAbi from "./abi/internal/ICaskVault.js";
import CaskDCAInternalAbi from "./abi/internal/ICaskDCA.js";
import CaskP2PInternalAbi from "./abi/internal/ICaskP2P.js";

import AggregatorV3InterfaceAbi from "./abi/AggregatorV3Interface.js";
import ERC20Abi from "./abi/ERC20Metadata.js";
import ERC721Abi from "./abi/ERC721Metadata.js";
import IUniswapV2Router02Abi from "./abi/IUniswapV2Router02.js";


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
  CaskSubscriptions: {
    [environments.TESTNET]: CaskSubscriptionsTestnetAbi.abi,
    [environments.DEVELOPMENT]: CaskSubscriptionsDevelopmentAbi.abi,
    [environments.PRODUCTION]: CaskSubscriptionsProductionAbi.abi,
    [environments.INTERNAL]: CaskSubscriptionsInternalAbi.abi,
  },
  /**
   * CaskSubscriptionPlans ABI per environment.
   */
  CaskSubscriptionPlans: {
    [environments.TESTNET]: CaskSubscriptionPlansTestnetAbi.abi,
    [environments.DEVELOPMENT]: CaskSubscriptionPlansDevelopmentAbi.abi,
    [environments.PRODUCTION]: CaskSubscriptionPlansProductionAbi.abi,
    [environments.INTERNAL]: CaskSubscriptionPlansInternalAbi.abi,
  },
  /**
   * CaskVault ABI per environment.
   */
  CaskVault: {
    [environments.TESTNET]: CaskVaultTestnetAbi.abi,
    [environments.DEVELOPMENT]: CaskVaultDevelopmentAbi.abi,
    [environments.PRODUCTION]: CaskVaultProductionAbi.abi,
    [environments.INTERNAL]: CaskVaultInternalAbi.abi,
  },
  /**
   * CaskDCA ABI per environment.
   */
  CaskDCA: {
    [environments.TESTNET]: CaskDCATestnetAbi.abi,
    [environments.DEVELOPMENT]: CaskDCADevelopmentAbi.abi,
    [environments.PRODUCTION]: CaskDCAProductionAbi.abi,
    [environments.INTERNAL]: CaskDCAInternalAbi.abi,
  },
  /**
   * CaskVault ABI per environment.
   */
  CaskP2P: {
    [environments.TESTNET]: CaskP2PTestnetAbi.abi,
    [environments.DEVELOPMENT]: CaskP2PDevelopmentAbi.abi,
    [environments.PRODUCTION]: CaskP2PProductionAbi.abi,
    [environments.INTERNAL]: CaskP2PInternalAbi.abi,
  },
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
};

export default abi;