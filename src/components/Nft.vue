<template>
	<div class="nft">
		<img :src="imageUrl" :alt="data.tokenId">
		<p>Pancake Squad #{{ data.tokenId }}</p>
		<span>Цена: {{ data.price }} BNB</span>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

export interface INftData {
	tokenId: string
	price: string
}

@Component
export default class Nft extends Vue {

	@Prop() readonly data: INftData | undefined

	get imageUrl() {
		return `https://static-nft.pancakeswap.com/mainnet/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/pancake-squad-${this.data?.tokenId}-1000.png`
	}

}
</script>

<style scoped>
.nft {
	width: 24%;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #ebeef0;
	border-radius: 10px;
}

.nft img {
	width: 100%;
	border-radius: 10px;
}
</style>
