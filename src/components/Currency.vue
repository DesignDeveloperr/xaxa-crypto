<template>
	<div class="currency">
		<div class="place">{{ data.rank }}</div>
		<div class="name"><img :src="imageUrl" :alt="data.name">{{ data.name }}</div>
		<div class="price" :style="{color: priceColor}">{{ data.price ? `${priceArrow}$${data.price}` : loadingText }}</div>
		<div class="h24" :style="{color: h24Color}">{{ data.h24 ? `${h24Arrow}${data.h24}%` : loadingText }}</div>
		<div class="d7" :style="{color: d7Color}">{{ data.d7 ? `${d7Arrow}${data.d7}%` : loadingText }}</div>
		<div class="cap" :style="{color: marketCapColor}">{{ data.marketCap ? `${marketCapArrow}$${data.marketCap}` : loadingText }}</div>
		<div class="volume" :style="{color: tradingVolumeColor}">{{ data.tradingVolume ? `${tradingVolumeArrow}$${data.tradingVolume}` : loadingText }}</div>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

export interface ICurrencyData {
	id: number
	rank: number
	name: string
	price: string | null
	h24: string | null
	d7: string | null
	marketCap: string | null
	tradingVolume: string | null
}

@Component
export default class Currency extends Vue {

	@Prop() readonly data: ICurrencyData | undefined

	get imageUrl() {
		return `https://s2.coinmarketcap.com/static/img/coins/64x64/${this.data?.id}.png`
	}

	readonly loadingText: string = 'Загрузка'
	readonly greenColor: string = '#16c784'
	readonly redColor: string = '#ea3943'
	readonly upArrow: string = '▲'
	readonly downArrow: string = '▼'

	priceColor: string = '#000'
	priceArrow: string = ''

	h24Color: string = '#000'
	h24Arrow: string = ''

	d7Color: string = '#000'
	d7Arrow: string = ''

	marketCapColor: string = '#000'
	marketCapArrow: string = ''

	tradingVolumeColor: string = '#000'
	tradingVolumeArrow: string = ''

	@Watch('data.price')
	updatePriceHandler(newValue: string, oldValue: string) {
		if (!oldValue) return
		if (Number(newValue) > Number(oldValue)) {
			this.priceColor = this.greenColor
			this.priceArrow = this.upArrow
		} else {
			this.priceColor = this.redColor
			this.priceArrow = this.downArrow
		}
	}

	@Watch('data.h24')
	updateH24Handler(newValue: string, oldValue: string) {
		if (!oldValue) return
		if (Number(newValue) > Number(oldValue)) {
			this.h24Color = this.greenColor
			this.h24Arrow = this.upArrow
		} else {
			this.h24Color = this.redColor
			this.h24Arrow = this.downArrow
		}
	}

	@Watch('data.d7')
	updateD7Handler(newValue: string, oldValue: string) {
		if (!oldValue) return
		if (Number(newValue) > Number(oldValue)) {
			this.d7Color = this.greenColor
			this.d7Arrow = this.upArrow
		} else {
			this.d7Color = this.redColor
			this.d7Arrow = this.downArrow
		}
	}

	@Watch('data.marketCap')
	updateMarketCapHandler(newValue: string, oldValue: string) {
		if (!oldValue) return
		if (Number(newValue) > Number(oldValue)) {
			this.marketCapColor = this.greenColor
			this.marketCapArrow = this.upArrow
		} else {
			this.marketCapColor = this.redColor
			this.marketCapArrow = this.downArrow
		}
	}

	@Watch('data.tradingVolume')
	updateTradingVolumeHandler(newValue: string, oldValue: string) {
		if (!oldValue) return
		if (Number(newValue) > Number(oldValue)) {
			this.tradingVolumeColor = this.greenColor
			this.tradingVolumeArrow = this.upArrow
		} else {
			this.tradingVolumeColor = this.redColor
			this.tradingVolumeArrow = this.downArrow
		}
	}

}
</script>

<style scoped>
.currency {
	display: flex;
	text-align: center;
	width: 100%;
	font-weight: 600;
	border-top: 1px solid #ebeef0;
	padding: 15px 0;
}

.currency .place {
	width: 5%;
}

.currency .name {
	width: 20%;
	display: flex;
}

.currency .name img {
	width: 24px;
	margin-right: 10px;
}

.currency .price {
	width: 15%;
}

.currency .h24 {
	width: 15%;
}

.currency .d7 {
	width: 15%;
}

.currency .cap {
	width: 15%;
}

.currency .volume {
	width: 15%;
}
</style>
