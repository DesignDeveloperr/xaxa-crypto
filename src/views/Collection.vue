<template>
	<div>
		<h2>NFT коллекция</h2>
		<h1>Pancake Squad</h1>
		<div class="catalog">
			<Nft v-for="nft in nfts" :key="nft.tokenId" :data="nft"></Nft>
		</div>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import axios from "axios";
import {INftData} from "@/components/Nft.vue";
import Nft from "@/components/Nft.vue";

@Component({
	components: {
		Nft
	}
})
export default class Collection extends Vue {

	nfts: INftData[] = []

	beforeMount() {
		axios.post('https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market', {
			"query": "\n        query getNftsMarketData($first: Int, $skip: Int!, $where: NFT_filter, $orderBy: NFT_orderBy, $orderDirection: OrderDirection) {\n          nfts(where: $where, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, skip: $skip) {\n            \n  tokenId\n  metadataUrl\n  currentAskPrice\n  currentSeller\n  latestTradedPriceInBNB\n  tradeVolumeBNB\n  totalTrades\n  isTradable\n  updatedAt\n  otherId\n  collection {\n    id\n  }\n\n            transactionHistory {\n              \n  id\n  block\n  timestamp\n  askPrice\n  netPrice\n  withBNB\n  buyer {\n    id\n  }\n  seller {\n    id\n  }\n\n            }\n          }\n        }\n      ",
			"variables": {
				"where": {"collection": "0x0a8901b0e25deb55a87524f0cc164e9644020eba", "isTradable": true},
				"first": 100,
				"skip": 0,
				"orderBy": "currentAskPrice",
				"orderDirection": "asc"
			}
		}).then(({data}) => {
			for (const nft of data.data.nfts) {
				this.nfts = [...this.nfts, {
					tokenId: nft.tokenId,
					price: nft.currentAskPrice
				}]
			}
		})
	}

}
</script>

<style scoped>
h1, h2 {
	margin: 0;
}

h1 {
	color: rgb(154, 106, 255);
	margin: 10px 0;
}

.catalog {
	width: 100%;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
</style>
