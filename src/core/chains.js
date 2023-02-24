/**
 * @typedef {Object} Chain
 * @property {number} chainId Numeric Chain ID
 * @property {string} hexChainId Chain ID in hex format
 * @property {string} name Chain Name
 * @property {string} token Native chain token
 * @property {string} defaultRpcUrl Default RPC URL for chain
 * @property {string} explorerUrl Web explorer URL for chain
 * @property {string} litName Name of chain in the Lit Protocol
 * @property {string} logo SVG logo for chain
 */

/**
 * Chain Information
 *
 * @namespace CaskSDK.chains
 */

/**
 * @enum
 * @memberOf CaskSDK.chains
 */
const chains = {
  ETH_MAINNET: {
    chainId: 1,
    hexChainId: '0x1',
    name: "Ethereum",
    shortName: 'ethereum',
    token: "ETH",
    defaultRpcUrl: "https://mainnet.infura.io/v3",
    explorerUrl: "https://etherscan.io",
    litName: 'ethereum',
    logo: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
viewBox="0 0 784.37 1277.39"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <g id="_1421394342400">
   <g>
    <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
    <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
    <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
    <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
    <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
    <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
   </g>
  </g>
 </g>
</svg>`
  },
  ETH_HARDHAT: {
    chainId: 31337,
    hexChainId: '0x7A69',
    defaultRpcUrl: "http://127.0.0.1:8545",
    token: "ETH",
    name: "Hardhat",
    shortName: 'hardhat',
  },
  POLYGON_MAINNET: {
    chainId: 137,
    hexChainId: '0x89',
    token: "MATIC",
    name: "Polygon",
    shortName: 'polygon',
    defaultRpcUrl: "https://matic-mainnet.chainstacklabs.com",
    explorerUrl: "https://polygonscan.com",
    litName: 'polygon',
    transakName: 'polygon',
    transakToken: 'USDC',
    biconomyEnabled: true,
    logo: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 38.4 33.5" style="enable-background:new 0 0 38.4 33.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#8247E5;}
</style>
<g>
	<path class="st0" d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3
		c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7
		c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
		c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1
		L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
		c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
</g>
</svg>`
  },
  POLYGON_MUMBAI: {
    chainId: 80001,
    hexChainId: '0x13881',
    token: "MATIC",
    name: "Mumbai Testnet",
    shortName: 'mumbai',
    defaultRpcUrl: "https://rpc-mumbai.maticvigil.com",
    explorerUrl: "https://mumbai.polygonscan.com",
    litName: 'mumbai',
    biconomyEnabled: true,
    logo: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 38.4 33.5" style="enable-background:new 0 0 38.4 33.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#8247E5;}
</style>
<g>
	<path class="st0" d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3
		c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7
		c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
		c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1
		L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
		c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
</g>
</svg>`
  },
  BSC_MAINNET: {
    chainId: 56,
    hexChainId: '0x38',
    token: "BNB",
    name: "BNB Chain",
    shortName: 'bsc',
    defaultRpcUrl: "https://bsc-dataseed.binance.org",
    explorerUrl: "https://bscscan.com",
    litName: 'bsc',
    transakName: 'bsc',
    transakToken: 'BUSD',
    biconomyEnabled: true,
    logo: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 2496 2496" style="enable-background:new 0 0 2496 2496;" xml:space="preserve">
<g>
	<path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F0B90B;" d="M1248,0c689.3,0,1248,558.7,1248,1248s-558.7,1248-1248,1248
		S0,1937.3,0,1248S558.7,0,1248,0L1248,0z"/>
	<path style="fill:#FFFFFF;" d="M685.9,1248l0.9,330l280.4,165v193.2l-444.5-260.7v-524L685.9,1248L685.9,1248z M685.9,918v192.3
		l-163.3-96.6V821.4l163.3-96.6l164.1,96.6L685.9,918L685.9,918z M1084.3,821.4l163.3-96.6l164.1,96.6L1247.6,918L1084.3,821.4
		L1084.3,821.4z"/>
	<path style="fill:#FFFFFF;" d="M803.9,1509.6v-193.2l163.3,96.6v192.3L803.9,1509.6L803.9,1509.6z M1084.3,1812.2l163.3,96.6
		l164.1-96.6v192.3l-164.1,96.6l-163.3-96.6V1812.2L1084.3,1812.2z M1645.9,821.4l163.3-96.6l164.1,96.6v192.3l-164.1,96.6V918
		L1645.9,821.4L1645.9,821.4L1645.9,821.4z M1809.2,1578l0.9-330l163.3-96.6v524l-444.5,260.7v-193.2L1809.2,1578L1809.2,1578
		L1809.2,1578z"/>
	<polygon style="fill:#FFFFFF;" points="1692.1,1509.6 1528.8,1605.3 1528.8,1413 1692.1,1316.4 1692.1,1509.6 	"/>
	<path style="fill:#FFFFFF;" d="M1692.1,986.4l0.9,193.2l-281.2,165v330.8l-163.3,95.7l-163.3-95.7v-330.8l-281.2-165V986.4
		L968,889.8l279.5,165.8l281.2-165.8l164.1,96.6H1692.1L1692.1,986.4z M803.9,656.5l443.7-261.6l444.5,261.6l-163.3,96.6
		l-281.2-165.8L967.2,753.1L803.9,656.5L803.9,656.5z"/>
</g>
</svg>`
  },
  BSC_TESTNET: {
    chainId: 97,
    hexChainId: '0x61',
    token: "BNB",
    name: "BNB Chain Testnet",
    shortName: 'bsc_testnet',
    defaultRpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    explorerUrl: "https://testnet.bscscan.com",
    biconomyEnabled: true,
    logo: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 2496 2496" style="enable-background:new 0 0 2496 2496;" xml:space="preserve">
<g>
	<path style="fill-rule:evenodd;clip-rule:evenodd;fill:#F0B90B;" d="M1248,0c689.3,0,1248,558.7,1248,1248s-558.7,1248-1248,1248
		S0,1937.3,0,1248S558.7,0,1248,0L1248,0z"/>
	<path style="fill:#FFFFFF;" d="M685.9,1248l0.9,330l280.4,165v193.2l-444.5-260.7v-524L685.9,1248L685.9,1248z M685.9,918v192.3
		l-163.3-96.6V821.4l163.3-96.6l164.1,96.6L685.9,918L685.9,918z M1084.3,821.4l163.3-96.6l164.1,96.6L1247.6,918L1084.3,821.4
		L1084.3,821.4z"/>
	<path style="fill:#FFFFFF;" d="M803.9,1509.6v-193.2l163.3,96.6v192.3L803.9,1509.6L803.9,1509.6z M1084.3,1812.2l163.3,96.6
		l164.1-96.6v192.3l-164.1,96.6l-163.3-96.6V1812.2L1084.3,1812.2z M1645.9,821.4l163.3-96.6l164.1,96.6v192.3l-164.1,96.6V918
		L1645.9,821.4L1645.9,821.4L1645.9,821.4z M1809.2,1578l0.9-330l163.3-96.6v524l-444.5,260.7v-193.2L1809.2,1578L1809.2,1578
		L1809.2,1578z"/>
	<polygon style="fill:#FFFFFF;" points="1692.1,1509.6 1528.8,1605.3 1528.8,1413 1692.1,1316.4 1692.1,1509.6 	"/>
	<path style="fill:#FFFFFF;" d="M1692.1,986.4l0.9,193.2l-281.2,165v330.8l-163.3,95.7l-163.3-95.7v-330.8l-281.2-165V986.4
		L968,889.8l279.5,165.8l281.2-165.8l164.1,96.6H1692.1L1692.1,986.4z M803.9,656.5l443.7-261.6l444.5,261.6l-163.3,96.6
		l-281.2-165.8L967.2,753.1L803.9,656.5L803.9,656.5z"/>
</g>
</svg>`
  },
  AVAX_MAINNET: {
    chainId: 43114,
    hexChainId: '0xA86A',
    token: "AVAX",
    name: "Avalanche",
    shortName: 'avalanche',
    defaultRpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorerUrl: "https://snowtrace.io",
    litName: 'avalanche',
    transakName: 'avaxcchain',
    transakToken: 'USDC',
    biconomyEnabled: true,
    logo: `<svg width="1503" height="1504" viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="287" y="258" width="928" height="844" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" fill="#E84142"/>
</svg>`
  },
  AVAX_TESTNET: {
    chainId: 43113,
    hexChainId: '0xA869',
    token: "AVAX",
    name: "Fuji Testnet",
    shortName: 'fuji',
    defaultRpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    explorerUrl: "https://testnet.snowtrace.io",
    biconomyEnabled: true,
    logo: `<svg width="1503" height="1504" viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="287" y="258" width="928" height="844" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" fill="#E84142"/>
</svg>`
  },
  FANTOM_MAINNET: {
    chainId: 250,
    hexChainId: '0xFA',
    token: "FTM",
    name: "Fantom",
    shortName: 'fantom',
    defaultRpcUrl: "https://rpc.ftm.tools",
    explorerUrl: "https://ftmscan.com",
    biconomyEnabled: true,
    litName: 'fantom',
    logo: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}.cls-2{fill:#13b5ec;}.cls-3{mask:url(#mask);}</style><mask id="mask" x="10" y="6" width="93.1" height="20" maskUnits="userSpaceOnUse"><g id="a"><path class="cls-1" d="M10,6h93.1V26H10Z"/></g></mask></defs><title>fa</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-2" cx="16" cy="16" r="16"/><g class="cls-3"><path class="cls-1" d="M17.2,12.9l3.6-2.1V15Zm3.6,9L16,24.7l-4.8-2.8V17L16,19.8,20.8,17ZM11.2,10.8l3.6,2.1L11.2,15Zm5.4,3.1L20.2,16l-3.6,2.1Zm-1.2,4.2L11.8,16l3.6-2.1Zm4.8-8.3L16,12.2,11.8,9.8,16,7.3ZM10,9.4V22.5l6,3.4,6-3.4V9.4L16,6Z"/></g></g></g></svg>`
  },
  FANTOM_TESTNET: {
    chainId: 4002,
    hexChainId: '0xFA2',
    token: "FTM",
    name: "Fantom Testnet",
    shortName: 'fantom_testnet',
    defaultRpcUrl: "https://rpc.testnet.fantom.network",
    explorerUrl: "https://testnet.ftmscan.com",
    biconomyEnabled: true,
    logo: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}.cls-2{fill:#13b5ec;}.cls-3{mask:url(#mask);}</style><mask id="mask" x="10" y="6" width="93.1" height="20" maskUnits="userSpaceOnUse"><g id="a"><path class="cls-1" d="M10,6h93.1V26H10Z"/></g></mask></defs><title>fa</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-2" cx="16" cy="16" r="16"/><g class="cls-3"><path class="cls-1" d="M17.2,12.9l3.6-2.1V15Zm3.6,9L16,24.7l-4.8-2.8V17L16,19.8,20.8,17ZM11.2,10.8l3.6,2.1L11.2,15Zm5.4,3.1L20.2,16l-3.6,2.1Zm-1.2,4.2L11.8,16l3.6-2.1Zm4.8-8.3L16,12.2,11.8,9.8,16,7.3ZM10,9.4V22.5l6,3.4,6-3.4V9.4L16,6Z"/></g></g></g></svg>`
  },
  CELO_MAINNET: {
    chainId: 42220,
    hexChainId: '0xA4EC',
    token: "CELO",
    name: "Celo",
    shortName: 'celo',
    defaultRpcUrl: "https://forno.celo.org",
    explorerUrl: "https://explorer.celo.org",
    litName: 'celo',
    transakName: 'celo',
    transakToken: 'CUSD',
    oracleType: 'band',
    logo: `<svg version="1.1" id="Celo_Rings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 950 950" style="enable-background:new 0 0 950 950;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FBCC5C;}
	.st1{fill:#35D07F;}
	.st2{fill:#5EA33B;}
</style>
<title>Artboard 1</title>
<path id="Bottom_Ring" class="st0" d="M375,850c151.9,0,275-123.1,275-275S526.9,300,375,300S100,423.1,100,575S223.1,850,375,850z
	 M375,950C167.9,950,0,782.1,0,575s167.9-375,375-375s375,167.9,375,375S582.1,950,375,950z"/>
<path id="Top_Ring" class="st1" d="M575,650c151.9,0,275-123.1,275-275S726.9,100,575,100S300,223.1,300,375S423.1,650,575,650z
	 M575,750c-207.1,0-375-167.9-375-375S367.9,0,575,0s375,167.9,375,375S782.1,750,575,750z"/>
<path id="Rings_Overlap" class="st2" d="M587.4,750c26-31.5,44.6-68.4,54.5-108.1c39.6-9.9,76.5-28.5,108.1-54.5
	c-1.4,45.9-11.3,91.1-29.2,133.5C678.5,738.7,633.3,748.6,587.4,750z M308.1,308.1c-39.6,9.9-76.5,28.5-108.1,54.5
	c1.4-45.9,11.3-91.1,29.2-133.4c42.3-17.8,87.6-27.7,133.4-29.2C336.6,231.5,318,268.4,308.1,308.1z"/>
</svg>`
  },
  CELO_TESTNET: {
    chainId: 44787,
    hexChainId: '0xAEF3',
    token: "CELO",
    name: "Celo Alfajores",
    shortName: 'celo_alfajores',
    defaultRpcUrl: "https://alfajores-forno.celo-testnet.org",
    explorerUrl: "https://alfajores-blockscout.celo-testnet.org",
    oracleType: 'band',
    logo: `<svg version="1.1" id="Celo_Rings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 950 950" style="enable-background:new 0 0 950 950;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FBCC5C;}
	.st1{fill:#35D07F;}
	.st2{fill:#5EA33B;}
</style>
<title>Artboard 1</title>
<path id="Bottom_Ring" class="st0" d="M375,850c151.9,0,275-123.1,275-275S526.9,300,375,300S100,423.1,100,575S223.1,850,375,850z
	 M375,950C167.9,950,0,782.1,0,575s167.9-375,375-375s375,167.9,375,375S582.1,950,375,950z"/>
<path id="Top_Ring" class="st1" d="M575,650c151.9,0,275-123.1,275-275S726.9,100,575,100S300,223.1,300,375S423.1,650,575,650z
	 M575,750c-207.1,0-375-167.9-375-375S367.9,0,575,0s375,167.9,375,375S782.1,750,575,750z"/>
<path id="Rings_Overlap" class="st2" d="M587.4,750c26-31.5,44.6-68.4,54.5-108.1c39.6-9.9,76.5-28.5,108.1-54.5
	c-1.4,45.9-11.3,91.1-29.2,133.5C678.5,738.7,633.3,748.6,587.4,750z M308.1,308.1c-39.6,9.9-76.5,28.5-108.1,54.5
	c1.4-45.9,11.3-91.1,29.2-133.4c42.3-17.8,87.6-27.7,133.4-29.2C336.6,231.5,318,268.4,308.1,308.1z"/>
</svg>`
  },
  AURORA_MAINNET: {
    chainId: 1313161554,
    hexChainId: '0x4e454152',
    token: "ETH",
    name: "Aurora",
    shortName: 'aurora',
    defaultRpcUrl: "https://mainnet.aurora.dev/",
    explorerUrl: "https://aurorascan.dev",
    logo: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 288 288" style="enable-background:new 0 0 288 288;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#70D44B;}
	.st1{fill:#FFFFFF;}
</style>
<path class="st0" d="M144,0L144,0c79.5,0,144,64.5,144,144v0c0,79.5-64.5,144-144,144h0C64.5,288,0,223.5,0,144v0
	C0,64.5,64.5,0,144,0z"/>
<path class="st1" d="M144,58.8c7.6,0,14.5,4.3,17.9,11.1l56.2,112.5c4.9,9.9,0.9,21.9-9,26.8c-2.8,1.4-5.8,2.1-8.9,2.1H87.8
	c-11,0-20-9-20-20c0-3.1,0.7-6.2,2.1-8.9l56.2-112.5C129.5,63,136.4,58.7,144,58.8 M144,45c-12.8,0-24.5,7.2-30.2,18.7L57.6,176.2
	c-8.3,16.7-1.6,36.9,15.1,45.3c4.7,2.3,9.9,3.6,15.1,3.6h112.5c18.6,0,33.8-15.1,33.8-33.7c0-5.2-1.2-10.4-3.6-15.1L174.2,63.7
	C168.5,52.2,156.8,45,144,45z"/>
</svg>`
  },
  MOONBEAM_MAINNET: {
    chainId: 1284,
    hexChainId: '0x504',
    token: "GLMR",
    name: "Moonbeam",
    shortName: 'moonbeam',
    defaultRpcUrl: "https://rpc.api.moonbeam.network/",
    explorerUrl: "https://moonscan.io",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479.7 479.8" class="jss227" width="24" height="24"><path fill="#211438" d="M236.7 0h6.48a34.34 34.34 0 0 0 6.25.23 216.69 216.69 0 0 1 22.32 1.88 232.42 232.42 0 0 1 41 9.17 240.32 240.32 0 0 1 162.64 182.58 183.08 183.08 0 0 1 3.84 32.34c.07 1.14.14 2.28.22 3.43a22.45 22.45 0 0 0 .25 4v16.79c-.06.47-.14.94-.17 1.41a224.46 224.46 0 0 1-3.47 30.48c-11.55 61.17-42 110.91-91.34 148.72-39 29.9-83.48 45.72-132.56 48.41a236.47 236.47 0 0 1-52.2-3 231.32 231.32 0 0 1-56-16.68c-49.7-22.12-88-56.86-114.27-104.52-27.25-49.52-35.48-102.44-25.77-158 7.66-43.8 26.59-82.4 55.94-115.77A237.57 237.57 0 0 1 160 13.67a234.57 234.57 0 0 1 45.4-11.2 214.23 214.23 0 0 1 25-2.24 34.34 34.34 0 0 0 6.3-.23Zm22.08 204.62h94.77a8.42 8.42 0 0 0 5.45-2.46 8.1 8.1 0 0 0 2.62-4.8 97 97 0 0 0-2.53-30.93 103 103 0 0 0-92.19-78.57c-16.2-1.19-32 1-46.9 7.44q-48.4 20.86-61.26 72.15c-2.29 9.17-2.76 18.54-2.63 28 .08 5.78 3.46 9.23 9.26 9.23Zm-.37 34.3h114.42a8.59 8.59 0 0 0 8.26-11.69c-1.28-3.58-4.41-5.58-8.74-5.58H143.64a8.53 8.53 0 0 0-8.3 10.19c.81 4.36 4.17 7.08 8.78 7.08Zm-11.51 55.17h102.9a8.19 8.19 0 0 0 7.77-4.49c3.19-6-1-12.78-7.89-12.78H143.24a8.08 8.08 0 0 0-6.34 3.37 8.54 8.54 0 0 0-.75 9.29 8.11 8.11 0 0 0 7.81 4.6Zm49.86 11.28H212.1a8.5 8.5 0 0 0-8.55 10.45c.83 4.2 4.22 6.82 8.86 6.82h169.72a8.16 8.16 0 0 0 7.4-5.06 8.57 8.57 0 0 0-7.95-12.2Zm-116.53-38.62h83a8.59 8.59 0 0 0 8.27-11.59 8.41 8.41 0 0 0-8.31-5.67H96.35a8.24 8.24 0 0 0-7 4.6 8.6 8.6 0 0 0 7.85 12.65ZM239.83 379h57.08a8.51 8.51 0 1 0-.37-17H182.37a8.14 8.14 0 0 0-6.19 3.18 8.22 8.22 0 0 0-1 9 8 8 0 0 0 7.68 4.8q28.48.02 56.97.02Zm59.37-46.54h-51.44a8.44 8.44 0 0 0-8.23 10.28c.88 4.16 4.24 6.74 8.81 6.74h102.53a8.49 8.49 0 0 0 7-12.3 8 8 0 0 0-7.62-4.7q-25.51-.04-51.05-.01Zm-151.61-26.85h-40.48a8.52 8.52 0 1 0 .23 17h81.06a8.08 8.08 0 0 0 6.2-3.18 8.25 8.25 0 0 0 .95-9.13 8 8 0 0 0-7.62-4.7c-13.48-.01-26.93.01-40.34.01Zm-18.83-75.54a8.76 8.76 0 1 0-8.81 8.85 8.85 8.85 0 0 0 8.81-8.85Zm-56.49 19.41a8.88 8.88 0 1 0 8.73 8.91 8.82 8.82 0 0 0-8.73-8.91Zm56.49 36a8.76 8.76 0 1 0-8.83 8.83 8.85 8.85 0 0 0 8.83-8.81Zm-52.54 28.46a8.76 8.76 0 1 0 8.86-8.81 8.85 8.85 0 0 0-8.86 8.81Zm157.36 27a8.76 8.76 0 1 0-8.82 8.83 8.85 8.85 0 0 0 8.82-8.86Zm-64.76 29.5a8.76 8.76 0 1 0-8.82 8.84 8.85 8.85 0 0 0 8.82-8.87Z" class="bg"></path><path fill="#776f85" d="M230.45.23a.94.94 0 0 0 .06-.15s0 0 0-.08h6.23a34.34 34.34 0 0 1-6.29.23ZM249.42 0a.75.75 0 0 0 0 .16s0 0 .06.07a34.34 34.34 0 0 1-6.3-.23Z" class="fg"></path><path fill="#fff" d="M258.78 204.62h-93.43c-5.8 0-9.18-3.45-9.26-9.23-.13-9.42.34-18.79 2.63-28q12.81-51.14 61.28-72.11c14.94-6.44 30.7-8.63 46.9-7.44a103 103 0 0 1 92.19 78.57 97 97 0 0 1 2.53 30.93 8.1 8.1 0 0 1-2.62 4.8 8.42 8.42 0 0 1-5.45 2.46H352Zm-.37 34.3H144.12c-4.61 0-8-2.72-8.78-7.08a8.53 8.53 0 0 1 8.3-10.19h228.71c4.33 0 7.46 2 8.74 5.58a8.59 8.59 0 0 1-8.26 11.69Zm-11.51 55.17H144a8.11 8.11 0 0 1-7.81-4.6 8.54 8.54 0 0 1 .75-9.29 8.08 8.08 0 0 1 6.34-3.37h206.4c6.87 0 11.08 6.79 7.89 12.78a8.19 8.19 0 0 1-7.77 4.49H246.9Zm49.86 11.28h84.78a8.57 8.57 0 0 1 7.95 12.2 8.16 8.16 0 0 1-7.4 5.06H212.41c-4.64 0-8-2.62-8.86-6.82a8.5 8.5 0 0 1 8.55-10.45Zm-116.53-38.62h-83a8.6 8.6 0 0 1-7.85-12.65 8.24 8.24 0 0 1 7-4.6h166.84a8.41 8.41 0 0 1 8.31 5.67 8.59 8.59 0 0 1-8.27 11.59ZM239.83 379h-57a8 8 0 0 1-7.68-4.8 8.22 8.22 0 0 1 1-9 8.14 8.14 0 0 1 6.19-3.18h114.2a8.51 8.51 0 1 1 .37 17h-16.79Zm59.37-46.53h51.08a8 8 0 0 1 7.62 4.7 8.49 8.49 0 0 1-7 12.3H248.34c-4.57 0-7.93-2.58-8.81-6.74a8.44 8.44 0 0 1 8.23-10.28h22.78Zm-151.61-26.86h40.29a8 8 0 0 1 7.62 4.7 8.25 8.25 0 0 1-.95 9.13 8.08 8.08 0 0 1-6.2 3.18h-81.06a8.52 8.52 0 1 1-.23-17h34.89Zm-18.83-75.54a8.76 8.76 0 1 1-8.77-8.9 8.84 8.84 0 0 1 8.77 8.9Zm-56.49 19.41a8.88 8.88 0 1 1-8.76 8.89 8.84 8.84 0 0 1 8.76-8.89Zm56.49 36.02a8.76 8.76 0 1 1-8.75-8.92 8.83 8.83 0 0 1 8.75 8.92Zm-52.54 28.44a8.76 8.76 0 1 1 8.72 8.94 8.84 8.84 0 0 1-8.72-8.94Zm157.36 26.97a8.76 8.76 0 1 1-8.74-8.92 8.82 8.82 0 0 1 8.74 8.92Zm-64.76 29.5a8.76 8.76 0 1 1-8.76-8.91 8.84 8.84 0 0 1 8.76 8.91Z" class="fg"></path></svg>`
  },
  GNOSIS_MAINNET: {
    chainId: 100,
    hexChainId: '0x64',
    token: "xDAI",
    name: "Gnosis",
    shortName: 'gnosis',
    defaultRpcUrl: "https://rpc.gnosischain.com/",
    explorerUrl: "https://gnosisscan.io",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="2500" height="2500"><g fill="#00a6c4"><path d="M1809.4 500l-73.6 73.6c58.5 92 76.9 207.4 36.8 317.7-66.9 187.3-274.2 286-463.2 219.1-26.8-10-51.8-21.7-73.6-36.8L1000 1309.4 794.3 1102c-95.3 63.5-217.4 81.9-332.8 41.8-194-70.2-294.3-282.6-224.1-474.9 10-30.1 25.1-56.9 41.8-81.9l-88.6-88.6-16.7 28.4c-92 150.5-142.1 324.4-142.1 503.3-1.7 533.4 433.1 969.9 966.5 969.9h1.7c533.4 0 966.6-433.1 968.2-966.6 0-177.3-48.5-351.2-140.5-503.3l-18.3-30.1"/><path d="M388 695.7c-25.1 33.4-40.1 75.3-40.1 120.4 0 108.7 88.6 197.3 197.3 197.3 45.2 0 87-15.1 120.4-41.8L388 695.7M1356.2 954.8c31.8 21.7 68.6 33.4 110.4 33.4 108.7 0 197.3-88.6 197.3-197.3 0-40.1-11.7-78.6-33.4-110.4l-274.3 274.3M1003.3 1162.2L204 359.5l31.8-33.4C433.1 117.1 702.3 0 991.6 0h1.7c292.6 0 573.6 125.4 769.2 342.8l30.1 33.4-789.3 786M334.5 359.5l668.9 670.6 660.5-657.2C1486.6 195.7 1245.8 93.6 995 93.6h-1.7c-249.2 0-481.6 93.7-658.8 265.9"/></g></svg>`
  },
  ARBITRUM_MAINNET: {
    chainId: 42161,
    hexChainId: '0xA4B1',
    token: "ETH",
    name: "Arbitrum",
    shortName: 'arbitrum',
    defaultRpcUrl: "https://arb1.arbitrum.io/rpc",
    explorerUrl: "https://arbiscan.io",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 683.45 683.4" class="jss227" width="24" height="24"><path fill="#2d374b" d="M0 381.57v-79.1a19.63 19.63 0 0 0 1.23-3.6c.93-6.84 1.26-13.8 2.71-20.52 2.31-10.66 5.25-21.2 8.1-31.74 1.49-5.53 3.2-11 5.07-16.44 2.42-7 4.79-14.12 7.72-21 3.44-8 7.24-15.9 11.27-23.64 4.46-8.57 9-17.15 14.17-25.27 6.2-9.67 12.92-19.05 19.88-28.19 6-7.91 12.48-15.5 19.13-22.88 5.58-6.18 11.6-12 17.65-17.7 4.7-4.45 9.69-8.62 14.65-12.79 4.55-3.82 9.08-7.71 13.91-11.15 8.47-6 17-12 25.81-17.54 6.52-4.17 13.28-8 20.17-11.52 9.45-4.83 19-9.47 28.72-13.75 6.68-2.94 13.65-5.26 20.58-7.62 7.28-2.49 14.6-4.87 22-7 6.08-1.72 12.26-3.12 18.46-4.36C276.77 4.73 282.39 4 288 3.18c4.58-.69 9.18-1.24 13.75-1.95 1.71-.27 3.36-1.16 5-1.17C329.88 0 353 0 376.07 0a13.19 13.19 0 0 1 2.52.1c5.33 1 10.63 2.08 16 3.05 8.68 1.58 17.46 2.71 26 4.73 8.34 2 16.45 4.88 24.71 7.22 13.11 3.7 25.57 9 38 14.51A317.39 317.39 0 0 1 525 52.08c8.44 5.35 16.52 11.31 24.45 17.4 8.32 6.38 16.69 12.8 24.27 20 9.64 9.17 18.71 19 27.66 28.84a251.54 251.54 0 0 1 17.29 21.13 359.34 359.34 0 0 1 29.87 48.83c3.21 6.33 6.1 12.83 8.94 19.34 1.94 4.47 3.62 9.06 5.27 13.65 1.58 4.39 3 8.85 4.45 13.28 2.06 6.23 4.3 12.4 6.07 18.7 1.71 6.09 3 12.3 4.33 18.49 1 4.81 1.93 9.66 2.68 14.52.78 5.09 1.26 10.22 2 15.32.24 1.7 1.17 3.36 1.17 5q.12 35.43.05 70.87a14 14 0 0 1-.14 2.51c-1 5.11-2.11 10.19-3 15.32-1.2 6.89-1.87 13.88-3.41 20.68-1.64 7.25-4 14.34-6.11 21.47-1.6 5.38-3.13 10.79-5 16-3.94 10.78-7.64 21.69-12.34 32.15-4.4 9.8-9.71 19.22-15.06 28.55-8.24 14.36-17.32 28.2-28.1 40.81-8.71 10.2-17.43 20.41-26.63 30.16a224.91 224.91 0 0 1-18.82 17.13c-7.36 6.24-14.81 12.4-22.6 18.09-7.26 5.3-14.84 10.21-22.57 14.81-9.27 5.54-18.61 11.06-28.35 15.69-10.78 5.13-22 9.43-33.11 13.72-7.74 3-15.69 5.46-23.61 8-4.54 1.43-9.18 2.56-13.83 3.58-5.8 1.28-11.63 2.46-17.49 3.4-6.41 1-12.88 1.7-19.31 2.62a12.51 12.51 0 0 0-3 1.22h-79.1a27.45 27.45 0 0 0-4.23-1.23c-4.31-.54-8.7-.63-13-1.41-6.63-1.22-13.19-2.84-19.78-4.31-5.65-1.27-11.37-2.31-16.92-3.93-6.13-1.78-12.15-4-18.14-6.2-9.78-3.61-19.61-7.11-29.19-11.18-7.1-3-13.92-6.74-20.73-10.39s-13.78-7.17-20.15-11.53C147.94 625.13 136.26 616.8 125 608a258.71 258.71 0 0 1-26-23 413.33 413.33 0 0 1-29.26-33.6 379 379 0 0 1-24.24-35.65c-6.29-10.38-11.5-21.47-16.73-32.43-3.61-7.53-6.7-15.31-9.73-23.1-1.83-4.69-3.06-9.62-4.63-14.42-1.16-3.55-2.54-7-3.61-10.59-.73-2.44-1-5-1.65-7.47-1.08-4.15-2.67-8.19-3.37-12.39-1.71-10.24-3-20.55-4.56-30.82A13 13 0 0 0 0 381.57Zm144.42 24.13a.52.52 0 0 0-.49-.19c0-1.79-.11-3.58-.12-5.37q-.08-80.82-.21-161.64c0-7.54 3-12.7 9.5-16.47q89.45-51.78 178.78-103.75c6.11-3.55 12.08-3.51 18.21 0q89.39 51.6 178.84 103.06c6.8 3.9 9.72 9.3 9.72 16.95q-.1 85.88 0 171.76c0 1.26-.07 2.53-.1 3.79-.68-.93-1.4-1.82-2-2.79q-48.62-75.85-97.22-151.73c-.66-1-1.36-2-2.11-3.15a10.93 10.93 0 0 0-.85 1c-12 20.43-24.07 40.86-36 61.36a4.58 4.58 0 0 0 .33 3.85c5.64 9.4 11.44 18.69 17.19 28Q457.65 415 497.47 479.6l-18.38 10.64c-.2-.37-.38-.75-.61-1.1q-45.47-71.86-91-143.72a21.46 21.46 0 0 0-1.6-2c-.58.86-1 1.44-1.38 2.07Q364.26 380 344 414.41c-1.09 1.84-.9 3.11.21 4.83Q360 444 375.73 468.84q18.88 29.76 37.72 59.55c-1.06.68-2.09 1.4-3.18 2-20.13 11.71-40.3 23.34-60.37 35.15-5.65 3.32-10.82 3.32-16.51 0-24.3-14.18-48.7-28.17-73.08-42.2-1-.57-2.07-1-3.11-1.44.55-1.13 1-2.29 1.68-3.37q40.92-69.63 81.86-139.24c14.14-24.06 28.17-48.18 42.31-72.23q20.46-34.8 41.05-69.53c.49-.83.93-1.68 1.5-2.71-24.6 0-48.64 0-72.68.1-1.09 0-2.57 1.24-3.21 2.29q-21 34.56-41.94 69.22-25.26 41.8-50.53 83.59c-10.41 17.18-20.9 34.31-31.31 51.49Q208.71 470 191.57 498.5c-3.18 5.3-6.3 10.63-9.57 16.18 8.95 5.17 17.71 10.26 26.51 15.29 10.84 6.21 21.72 12.36 32.57 18.54.43.3.84.64 1.29.9 22 12.7 43.93 25.45 66 38 9 5.13 17.56 11.06 28.46 12.07 8.55.79 16.69-.15 24-4.3 23.09-13.09 46-26.54 68.93-39.86q52.19-30.3 104.36-60.63c6.46-3.76 13.32-7.05 19.16-11.62 11.75-9.2 17.08-22 17.1-36.72q.21-104.88 0-209.76a51.81 51.81 0 0 0-2-13.53 45.21 45.21 0 0 0-21.56-27.71c-16.55-9.68-33.2-19.18-49.8-28.76q-65.42-37.73-130.83-75.47c-14.31-8.28-29.15-9.65-44.33-3.09-6 2.57-11.43 6.29-17.07 9.56q-46.61 27-93.19 54.09-37.17 21.56-74.37 43.07c-16.34 9.44-25 23.52-25 42.43q-.15 84.48 0 169v49.59c-.06 5.68-.2 11.37-.1 17.06a3.71 3.71 0 0 0 1.77 2.46c7.69 4.54 15.45 9 23.18 13.45l25.19 14.57L329.12 235c-7.25-.32-14.06-.76-20.87-.91-13.94-.31-27.83-.1-41.24 4.46-12.11 4.13-22.28 10.74-29 22-3.17 5.3-6.66 10.41-10 15.6q-31.43 48.85-62.86 97.66c-6.87 10.66-13.82 21.26-20.73 31.89Z" class="bg"></path><path fill="#95bddb" d="M257.2 521.94c1 .48 2.12.87 3.11 1.44 24.38 14 48.78 28 73.08 42.2 5.69 3.31 10.86 3.31 16.51 0 20.07-11.81 40.24-23.44 60.37-35.15 1.09-.63 2.12-1.35 3.18-2 12.47-7.17 25-14.31 37.4-21.54 9.45-5.48 18.83-11.07 28.24-16.61l18.38-10.64c11.2-6.45 22.37-12.94 33.62-19.32a13.71 13.71 0 0 0 7.41-12.35c.16-11.35 0-22.7 0-34.06 0-1.26.1-2.53.1-3.79V238.36c0-7.65-2.92-13-9.72-16.95Q439.43 170 350.09 118.31c-6.13-3.54-12.1-3.58-18.21 0Q242.51 170.2 153.1 222c-6.53 3.77-9.53 8.93-9.5 16.47q.22 80.82.21 161.64c0 1.79.08 3.58.12 5.37l.34.81c-6.23 9.72-12.42 19.47-18.7 29.16-4.12 6.34-8.37 12.59-12.56 18.88l-.79-.11V237.13c0-18.91 8.66-33 25-42.43q37.2-21.51 74.37-43.07 46.59-27 93.19-54.09c5.64-3.27 11.11-7 17.07-9.56 15.18-6.56 30-5.19 44.33 3.09q65.36 37.87 130.82 75.55c16.6 9.58 33.25 19.08 49.8 28.76a45.21 45.21 0 0 1 21.56 27.71 51.81 51.81 0 0 1 2 13.53q.18 104.88 0 209.76c0 14.72-5.35 27.52-17.1 36.72-5.84 4.57-12.7 7.86-19.16 11.62q-52.1 30.35-104.34 60.63c-23 13.32-45.84 26.77-68.93 39.86-7.33 4.15-15.47 5.09-24 4.3-10.9-1-19.48-6.94-28.46-12.07-22.05-12.58-44-25.33-66-38-.45-.26-.86-.6-1.29-.9 4.36-7.44 8.69-14.9 13.08-22.31.89-1.53 2.02-2.87 3.04-4.29Z" class="fg"></path><path fill="#fefefe" d="M257.2 521.94c-1 1.42-2.15 2.76-3 4.26-4.39 7.41-8.72 14.87-13.08 22.31-10.85-6.18-21.73-12.33-32.57-18.54-8.8-5-17.56-10.12-26.51-15.29 3.27-5.55 6.39-10.88 9.57-16.18q17.16-28.49 34.36-56.95c10.41-17.18 20.9-34.31 31.31-51.49q25.31-41.78 50.53-83.59 20.94-34.62 41.94-69.22c.64-1.05 2.12-2.28 3.21-2.29 24-.13 48.08-.1 72.68-.1-.57 1-1 1.88-1.5 2.71q-20.52 34.76-41.05 69.53c-14.14 24-28.17 48.17-42.31 72.23q-40.94 69.67-81.9 139.24c-.64 1.08-1.13 2.24-1.68 3.37ZM113 454.36c4.19-6.29 8.44-12.54 12.56-18.88 6.28-9.69 12.47-19.44 18.7-29.16l.15-.62c6.91-10.63 13.86-21.23 20.73-31.89Q196.61 325 228 276.18c3.34-5.19 6.83-10.3 10-15.6 6.74-11.25 16.91-17.86 29-22 13.41-4.56 27.3-4.77 41.24-4.46 6.81.15 13.62.59 20.87.91L162.26 503.29l-25.19-14.57c-7.73-4.47-15.49-8.91-23.18-13.45a3.71 3.71 0 0 1-1.77-2.46c-.1-5.69 0-11.38.1-17.06Z" class="fg"></path><path fill="#289fef" d="M538.5 413.87c0 11.36.16 22.71 0 34.06a13.71 13.71 0 0 1-7.41 12.35c-11.25 6.38-22.42 12.87-33.62 19.32l-79.63-129.18c-5.75-9.33-11.55-18.62-17.19-28a4.58 4.58 0 0 1-.33-3.85c11.91-20.5 24-40.93 36-61.36a10.93 10.93 0 0 1 .85-1c.75 1.12 1.45 2.12 2.11 3.15q48.6 75.86 97.22 151.73c.6.96 1.32 1.85 2 2.78Zm-59.41 76.37c-9.41 5.54-18.79 11.13-28.24 16.61-12.44 7.23-24.93 14.37-37.4 21.54q-18.85-29.77-37.72-59.55Q360 444 344.16 419.24c-1.11-1.72-1.3-3-.21-4.83q20.37-34.41 40.59-68.91c.36-.63.8-1.21 1.38-2.07a21.46 21.46 0 0 1 1.6 2q45.5 71.85 91 143.72c.19.34.37.72.57 1.09Z" class="fg"></path><path fill="#718ea9" d="m113 454.36-.79 1.39v-1.5Z" class="fg"></path><path fill="#4d627a" d="m144.42 405.7-.15.62-.34-.81a.52.52 0 0 1 .49.19Z" class="fg"></path></svg>`
  },
  OPTIMISM_MAINNET: {
    chainId: 10,
    hexChainId: '0xa',
    token: "ETH",
    name: "Optimism",
    shortName: 'optimism',
    defaultRpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io",
    logo: `<svg width="500" height="500" viewBox="0 0 500 500" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="250" cy="250" r="250" fill="#FF0420"/>
  <path d="M177.133 316.446C162.247 316.446 150.051 312.943 140.544 305.938C131.162 298.808 126.471 288.676 126.471 275.541C126.471 272.789 126.784 269.411 127.409 265.408C129.036 256.402 131.35 245.581 134.352 232.947C142.858 198.547 164.812 181.347 200.213 181.347C209.845 181.347 218.476 182.973 226.107 186.225C233.738 189.352 239.742 194.106 244.12 200.486C248.498 206.74 250.688 214.246 250.688 223.002C250.688 225.629 250.375 228.944 249.749 232.947C247.873 244.08 245.621 254.901 242.994 265.408C238.616 282.546 231.048 295.368 220.29 303.874C209.532 312.255 195.147 316.446 177.133 316.446ZM179.76 289.426C186.766 289.426 192.707 287.362 197.586 283.234C202.59 279.106 206.155 272.789 208.281 264.283C211.158 252.524 213.348 242.266 214.849 233.51C215.349 230.883 215.599 228.194 215.599 225.441C215.599 214.058 209.657 208.366 197.774 208.366C190.768 208.366 184.764 210.43 179.76 214.558C174.882 218.687 171.379 225.004 169.253 233.51C167.001 241.891 164.749 252.149 162.498 264.283C161.997 266.784 161.747 269.411 161.747 272.163C161.747 283.672 167.752 289.426 179.76 289.426Z" fill="white"/>
  <path d="M259.303 314.57C257.927 314.57 256.863 314.132 256.113 313.256C255.487 312.255 255.3 311.13 255.55 309.879L281.444 187.914C281.694 186.538 282.382 185.412 283.508 184.536C284.634 183.661 285.822 183.223 287.073 183.223H336.985C350.87 183.223 362.003 186.1 370.384 191.854C378.891 197.609 383.144 205.927 383.144 216.81C383.144 219.937 382.769 223.19 382.018 226.567C378.891 240.953 372.574 251.586 363.067 258.466C353.685 265.346 340.8 268.786 324.413 268.786H299.082L290.451 309.879C290.2 311.255 289.512 312.38 288.387 313.256C287.261 314.132 286.072 314.57 284.822 314.57H259.303ZM325.727 242.892C330.98 242.892 335.546 241.453 339.424 238.576C343.427 235.699 346.054 231.571 347.305 226.192C347.68 224.065 347.868 222.189 347.868 220.563C347.868 216.935 346.805 214.183 344.678 212.307C342.551 210.305 338.924 209.305 333.795 209.305H311.278L304.148 242.892H325.727Z" fill="white"/>
</svg>`
  },
  BASE_TESTNET: {
    chainId: 84531,
    hexChainId: '0x14a33',
    token: "ETH",
    name: "Base Testnet",
    shortName: 'base_testnet',
    defaultRpcUrl: "https://goerli.base.org",
    explorerUrl: "https://goerli.basescan.org",
    logo: `<svg width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9721 32C24.8241 32 32 24.8366 32 16C32 7.16344 24.8241 0 15.9721 0C7.57386 0 0.684242 6.44789 0 14.6551H21.1852V17.3449H1.15063e-07C0.684243 25.5521 7.57386 32 15.9721 32Z" fill="#0A0B0D"/>
<path d="M40 27.9788H49.5151C53.7629 27.9788 56.7873 25.4641 56.7873 21.3522C56.7873 18.1579 54.9523 16.1189 51.9618 15.5412V15.4393C54.4765 14.8276 56.0397 12.9925 56.0397 10.24C56.0397 6.43392 53.2192 4.05515 49.1753 4.05515H40V27.9788ZM53.491 10.5458C53.491 12.9925 51.7239 14.5557 48.8354 14.5557H42.5487V6.23002H48.8354C51.7239 6.23002 53.491 7.75923 53.491 10.206V10.5458ZM54.2387 21.4202C54.2387 24.0708 52.3016 25.8039 49.1413 25.8039H42.5487V16.6626H49.1073C52.2677 16.6626 54.2387 18.3278 54.2387 21.0804V21.4202Z" fill="#0A0B0D"/>
<path d="M74.6502 27.9788H77.3688L69.4169 4.05515H66.3245L58.4745 27.9788H61.0572L63.0961 21.4881H72.6112L74.6502 27.9788ZM67.7857 6.6718H67.9896L71.9655 19.3473H63.7758L67.7857 6.6718Z" fill="#0A0B0D"/>
<path d="M88.0953 28.4546C93.3286 28.4546 96.7608 25.634 96.7608 21.3862C96.7608 17.4442 94.1781 15.5752 90.2701 14.9295L86.8039 14.3518C84.1533 13.9101 82.3862 12.7547 82.3862 10.206C82.3862 7.6233 84.3572 5.65232 88.0953 5.65232C91.7314 5.65232 93.6004 7.48738 93.8043 10.104H96.421C96.2171 6.63781 93.5664 3.54541 88.1292 3.54541C82.76 3.54541 79.8035 6.56985 79.8035 10.3079C79.8035 14.2839 82.4882 16.1189 86.1583 16.7306L89.6585 17.2743C92.5809 17.7841 94.2121 18.9734 94.2121 21.4881C94.2121 24.4446 91.7994 26.3476 88.1292 26.3476C84.3232 26.3476 81.9444 24.5126 81.7405 21.3862H79.1579C79.3618 25.4641 82.4882 28.4546 88.0953 28.4546Z" fill="#0A0B0D"/>
<path d="M100.589 4.05515V27.9788H115.949V25.7699H103.138V16.6626H114.929V14.4878H103.138V6.26401H115.949V4.05515H100.589Z" fill="#0A0B0D"/>
</svg>`
  },
};

/**
 * Look up the chain information
 *
 * @memberOf CaskSDK.chains
 * @param chain
 * @return {Chain}
 */
function lookupChain(chain) {
  return Object.values(chains).find((c) => c.chainId === chain || c.hexChainId?.toString()?.toLowerCase() === chain?.toString()?.toLowerCase() || c.shortName === chain);
}

export default {
  ...chains,
  lookupChain,
}
