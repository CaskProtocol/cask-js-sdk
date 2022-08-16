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
    name: "Binance Smart Chain",
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
    name: "BSC Testnet",
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
    explorerUrl: "https://aurorascan.dev/",
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
    explorerUrl: "https://moonscan.io/",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479.7 479.8" class="jss227" width="24" height="24"><path fill="#211438" d="M236.7 0h6.48a34.34 34.34 0 0 0 6.25.23 216.69 216.69 0 0 1 22.32 1.88 232.42 232.42 0 0 1 41 9.17 240.32 240.32 0 0 1 162.64 182.58 183.08 183.08 0 0 1 3.84 32.34c.07 1.14.14 2.28.22 3.43a22.45 22.45 0 0 0 .25 4v16.79c-.06.47-.14.94-.17 1.41a224.46 224.46 0 0 1-3.47 30.48c-11.55 61.17-42 110.91-91.34 148.72-39 29.9-83.48 45.72-132.56 48.41a236.47 236.47 0 0 1-52.2-3 231.32 231.32 0 0 1-56-16.68c-49.7-22.12-88-56.86-114.27-104.52-27.25-49.52-35.48-102.44-25.77-158 7.66-43.8 26.59-82.4 55.94-115.77A237.57 237.57 0 0 1 160 13.67a234.57 234.57 0 0 1 45.4-11.2 214.23 214.23 0 0 1 25-2.24 34.34 34.34 0 0 0 6.3-.23Zm22.08 204.62h94.77a8.42 8.42 0 0 0 5.45-2.46 8.1 8.1 0 0 0 2.62-4.8 97 97 0 0 0-2.53-30.93 103 103 0 0 0-92.19-78.57c-16.2-1.19-32 1-46.9 7.44q-48.4 20.86-61.26 72.15c-2.29 9.17-2.76 18.54-2.63 28 .08 5.78 3.46 9.23 9.26 9.23Zm-.37 34.3h114.42a8.59 8.59 0 0 0 8.26-11.69c-1.28-3.58-4.41-5.58-8.74-5.58H143.64a8.53 8.53 0 0 0-8.3 10.19c.81 4.36 4.17 7.08 8.78 7.08Zm-11.51 55.17h102.9a8.19 8.19 0 0 0 7.77-4.49c3.19-6-1-12.78-7.89-12.78H143.24a8.08 8.08 0 0 0-6.34 3.37 8.54 8.54 0 0 0-.75 9.29 8.11 8.11 0 0 0 7.81 4.6Zm49.86 11.28H212.1a8.5 8.5 0 0 0-8.55 10.45c.83 4.2 4.22 6.82 8.86 6.82h169.72a8.16 8.16 0 0 0 7.4-5.06 8.57 8.57 0 0 0-7.95-12.2Zm-116.53-38.62h83a8.59 8.59 0 0 0 8.27-11.59 8.41 8.41 0 0 0-8.31-5.67H96.35a8.24 8.24 0 0 0-7 4.6 8.6 8.6 0 0 0 7.85 12.65ZM239.83 379h57.08a8.51 8.51 0 1 0-.37-17H182.37a8.14 8.14 0 0 0-6.19 3.18 8.22 8.22 0 0 0-1 9 8 8 0 0 0 7.68 4.8q28.48.02 56.97.02Zm59.37-46.54h-51.44a8.44 8.44 0 0 0-8.23 10.28c.88 4.16 4.24 6.74 8.81 6.74h102.53a8.49 8.49 0 0 0 7-12.3 8 8 0 0 0-7.62-4.7q-25.51-.04-51.05-.01Zm-151.61-26.85h-40.48a8.52 8.52 0 1 0 .23 17h81.06a8.08 8.08 0 0 0 6.2-3.18 8.25 8.25 0 0 0 .95-9.13 8 8 0 0 0-7.62-4.7c-13.48-.01-26.93.01-40.34.01Zm-18.83-75.54a8.76 8.76 0 1 0-8.81 8.85 8.85 8.85 0 0 0 8.81-8.85Zm-56.49 19.41a8.88 8.88 0 1 0 8.73 8.91 8.82 8.82 0 0 0-8.73-8.91Zm56.49 36a8.76 8.76 0 1 0-8.83 8.83 8.85 8.85 0 0 0 8.83-8.81Zm-52.54 28.46a8.76 8.76 0 1 0 8.86-8.81 8.85 8.85 0 0 0-8.86 8.81Zm157.36 27a8.76 8.76 0 1 0-8.82 8.83 8.85 8.85 0 0 0 8.82-8.86Zm-64.76 29.5a8.76 8.76 0 1 0-8.82 8.84 8.85 8.85 0 0 0 8.82-8.87Z" class="bg"></path><path fill="#776f85" d="M230.45.23a.94.94 0 0 0 .06-.15s0 0 0-.08h6.23a34.34 34.34 0 0 1-6.29.23ZM249.42 0a.75.75 0 0 0 0 .16s0 0 .06.07a34.34 34.34 0 0 1-6.3-.23Z" class="fg"></path><path fill="#fff" d="M258.78 204.62h-93.43c-5.8 0-9.18-3.45-9.26-9.23-.13-9.42.34-18.79 2.63-28q12.81-51.14 61.28-72.11c14.94-6.44 30.7-8.63 46.9-7.44a103 103 0 0 1 92.19 78.57 97 97 0 0 1 2.53 30.93 8.1 8.1 0 0 1-2.62 4.8 8.42 8.42 0 0 1-5.45 2.46H352Zm-.37 34.3H144.12c-4.61 0-8-2.72-8.78-7.08a8.53 8.53 0 0 1 8.3-10.19h228.71c4.33 0 7.46 2 8.74 5.58a8.59 8.59 0 0 1-8.26 11.69Zm-11.51 55.17H144a8.11 8.11 0 0 1-7.81-4.6 8.54 8.54 0 0 1 .75-9.29 8.08 8.08 0 0 1 6.34-3.37h206.4c6.87 0 11.08 6.79 7.89 12.78a8.19 8.19 0 0 1-7.77 4.49H246.9Zm49.86 11.28h84.78a8.57 8.57 0 0 1 7.95 12.2 8.16 8.16 0 0 1-7.4 5.06H212.41c-4.64 0-8-2.62-8.86-6.82a8.5 8.5 0 0 1 8.55-10.45Zm-116.53-38.62h-83a8.6 8.6 0 0 1-7.85-12.65 8.24 8.24 0 0 1 7-4.6h166.84a8.41 8.41 0 0 1 8.31 5.67 8.59 8.59 0 0 1-8.27 11.59ZM239.83 379h-57a8 8 0 0 1-7.68-4.8 8.22 8.22 0 0 1 1-9 8.14 8.14 0 0 1 6.19-3.18h114.2a8.51 8.51 0 1 1 .37 17h-16.79Zm59.37-46.53h51.08a8 8 0 0 1 7.62 4.7 8.49 8.49 0 0 1-7 12.3H248.34c-4.57 0-7.93-2.58-8.81-6.74a8.44 8.44 0 0 1 8.23-10.28h22.78Zm-151.61-26.86h40.29a8 8 0 0 1 7.62 4.7 8.25 8.25 0 0 1-.95 9.13 8.08 8.08 0 0 1-6.2 3.18h-81.06a8.52 8.52 0 1 1-.23-17h34.89Zm-18.83-75.54a8.76 8.76 0 1 1-8.77-8.9 8.84 8.84 0 0 1 8.77 8.9Zm-56.49 19.41a8.88 8.88 0 1 1-8.76 8.89 8.84 8.84 0 0 1 8.76-8.89Zm56.49 36.02a8.76 8.76 0 1 1-8.75-8.92 8.83 8.83 0 0 1 8.75 8.92Zm-52.54 28.44a8.76 8.76 0 1 1 8.72 8.94 8.84 8.84 0 0 1-8.72-8.94Zm157.36 26.97a8.76 8.76 0 1 1-8.74-8.92 8.82 8.82 0 0 1 8.74 8.92Zm-64.76 29.5a8.76 8.76 0 1 1-8.76-8.91 8.84 8.84 0 0 1 8.76 8.91Z" class="fg"></path></svg>`
  },
  GNOSIS_MAINNET: {
    chainId: 100,
    hexChainId: '0x64',
    token: "xDAI",
    name: "Gnosis",
    shortName: 'gnosis',
    defaultRpcUrl: "https://rpc.gnosischain.com/",
    explorerUrl: "https://blockscout.com/xdai/mainnet",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="2500" height="2500"><g fill="#00a6c4"><path d="M1809.4 500l-73.6 73.6c58.5 92 76.9 207.4 36.8 317.7-66.9 187.3-274.2 286-463.2 219.1-26.8-10-51.8-21.7-73.6-36.8L1000 1309.4 794.3 1102c-95.3 63.5-217.4 81.9-332.8 41.8-194-70.2-294.3-282.6-224.1-474.9 10-30.1 25.1-56.9 41.8-81.9l-88.6-88.6-16.7 28.4c-92 150.5-142.1 324.4-142.1 503.3-1.7 533.4 433.1 969.9 966.5 969.9h1.7c533.4 0 966.6-433.1 968.2-966.6 0-177.3-48.5-351.2-140.5-503.3l-18.3-30.1"/><path d="M388 695.7c-25.1 33.4-40.1 75.3-40.1 120.4 0 108.7 88.6 197.3 197.3 197.3 45.2 0 87-15.1 120.4-41.8L388 695.7M1356.2 954.8c31.8 21.7 68.6 33.4 110.4 33.4 108.7 0 197.3-88.6 197.3-197.3 0-40.1-11.7-78.6-33.4-110.4l-274.3 274.3M1003.3 1162.2L204 359.5l31.8-33.4C433.1 117.1 702.3 0 991.6 0h1.7c292.6 0 573.6 125.4 769.2 342.8l30.1 33.4-789.3 786M334.5 359.5l668.9 670.6 660.5-657.2C1486.6 195.7 1245.8 93.6 995 93.6h-1.7c-249.2 0-481.6 93.7-658.8 265.9"/></g></svg>`
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
  return Object.values(chains).find((c) => c.chainId === chain || c.shortName === chain);
}

export default {
  ...chains,
  lookupChain,
}
