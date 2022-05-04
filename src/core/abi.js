import environments from "./environments.js";

import CaskSubscriptionsTestnetAbi from "./abi/testnet/ICaskSubscriptions.js";
import CaskSubscriptionPlansTestnetAbi from "./abi/testnet/ICaskSubscriptionPlans.js";
import CaskVaultTestnetAbi from "./abi/testnet/ICaskVault.js";

import CaskSubscriptionsDevelopmentAbi from "./abi/development/ICaskSubscriptions.js";
import CaskSubscriptionPlansDevelopmentAbi from "./abi/development/ICaskSubscriptionPlans.js";
import CaskVaultDevelopmentAbi from "./abi/development/ICaskVault.js";

import CaskSubscriptionsProductionAbi from "./abi/production/ICaskSubscriptions.js";
import CaskSubscriptionPlansProductionAbi from "./abi/production/ICaskSubscriptionPlans.js";
import CaskVaultProductionAbi from "./abi/production/ICaskVault.js";

import CaskSubscriptionsInternalAbi from "./abi/internal/ICaskSubscriptions.js";
import CaskSubscriptionPlansInternalAbi from "./abi/internal/ICaskSubscriptionPlans.js";
import CaskVaultInternalAbi from "./abi/internal/ICaskVault.js";

import AggregatorV3InterfaceAbi from "./abi/AggregatorV3Interface.js";
import ERC20Abi from "./abi/ERC20Metadata.js";


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
   * AggregatorV3Interface ABI.
   */
  AggregatorV3Interface: AggregatorV3InterfaceAbi.abi,
  /**
   * ERC20 ABI.
   */
  ERC20: ERC20Abi.abi,
};

export default abi;