<template>
  <div class="currencies">
	  <div class="header">
		  <div class="place">#</div>
		  <div class="currency">Валюта</div>
		  <div class="price">Цена</div>
		  <div class="h24">24 часа %</div>
		  <div class="d7">7 дней %</div>
		  <div class="cap">Рын. кап.</div>
		  <div class="volume">Обьем (24ч)</div>
	  </div>
	  <Currency v-for="currency in sortedCurrencies" :key="currency.id" :data="currency"></Currency>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ICurrencyData} from "@/components/Currency.vue";
import Currency from "@/components/Currency.vue";
import axios from "axios";

@Component({
	components: {
		Currency
	}
})
export default class Main extends Vue {

	currencies: ICurrencyData[] = []
	webSocketUrl: string = 'wss://stream.coinmarketcap.com/price/latest'

	get sortedCurrencies(): ICurrencyData[] {
		return this.currencies.sort((currencyA, currencyB) => {
			if (currencyA.rank > currencyB.rank) return 1
			if (currencyA.rank < currencyB.rank) return -1
			return 0
		})
	}

	beforeMount() {
		axios.get('https://api.coinmarketcap.com/data-api/v3/map/all', {
			params: {
				listing_status: 'active,untracked',
				exchangeAux: 'is_active,status',
				cryptoAux: 'is_active,status',
				start: 1,
				limit: 300
			}
		}).then(({data}) => {
			for (const currency of data.data.cryptoCurrencyMap) {
				this.currencies = [...this.currencies, {
					id: currency.id,
					rank: currency.rank,
					name: currency.name,
					price: null,
					h24: null,
					d7: null,
					marketCap: null,
					tradingVolume: null
				}]
			}

			const client = new WebSocket(this.webSocketUrl)

			client.onmessage = message => {
				const json = JSON.parse(message.data)
				const index = this.currencies.findIndex(currency => currency.id === json.d.cr.id)
				this.currencies[index].price = json.d.cr.p.toFixed(2)
				this.currencies[index].h24 = json.d.cr.p24h.toFixed(2)
				this.currencies[index].d7 = json.d.cr.p7d.toFixed(2)
				this.currencies[index].marketCap = json.d.cr.mc.toFixed(2)
				this.currencies[index].tradingVolume = json.d.cr.v.toFixed(2)
			}

			const message = JSON.stringify({
				method: 'subscribe',
				id: 'price',
				data: {
					cryptoIds: this.currencies.map(({id}) => id)
				}
			})

			client.onopen = () => {
				client.send(message)
			}
		})
	}

}
</script>

<style scoped>
.currencies {
	border: 1px solid #ebeef0;
	border-radius: 10px;
}

.header {
	display: flex;
	text-align: center;
	width: 100%;
	margin: 20px 0;
}

.header .place {
	width: 5%;
}

.header .currency {
	width: 20%;
}

.header .price {
	width: 15%;
}

.header .h24 {
	width: 15%;
}

.header .d7 {
	width: 15%;
}

.header .cap {
	width: 15%;
}

.header .volume {
	width: 15%;
}
</style>
