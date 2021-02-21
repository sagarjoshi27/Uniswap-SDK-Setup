const UNISWAP = require('@uniswap/sdk')
const chainId = UNISWAP.ChainId.MAINNET

const tokenAddress = '0xbcd4b7de6fde81025f74426d43165a5b0d790fdd' //SPDR Token

const dai = new UNISWAP.Token(chainId, tokenAddress, 18);
const weth = new UNISWAP.Token(chainId, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', 18);
const usdt = new UNISWAP.Token(chainId, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6);

const USDTWETHPair = UNISWAP.Fetcher.fetchPairData(usdt, weth)
const DAIUSDTPair = UNISWAP.Fetcher.fetchPairData(dai, usdt)

const route = new UNISWAP.Route([USDTWETHPair, DAIUSDTPair], weth)
const amountIn = '1000000000000000000' // 1 WETH

const trade = new UNISWAP.Trade(route, new UNISWAP.TokenAmount(weth, amountIn), UNISWAP.TradeType.EXACT_INPUT)

const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%

const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
const path = [weth.address, usdt.address, dai.address];
const to = '' // should be a checksummed recipient address
const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
const value = trade.inputAmount.raw // // needs to be converted to e.g. hex
