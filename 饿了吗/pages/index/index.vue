<template>
	<view class="index">
		<!-- 获取地址 -->
		<my-adress></my-adress>
		<!-- 搜索框 -->
		<button type="default" class="searchGoods" @click="searchShopping">
			<span class="iconfont icon-chaxun"></span>
			搜索商家/商品
		</button>
		<!-- 轮播 -->
		<my-swiper></my-swiper>
		<!-- 商品页面轮播 -->
		<good-swiper></good-swiper>
		<!-- 晒选数据 -->
		<my-screen></my-screen>
		
	</view>
</template>

<script>
	import mySwiper from "../../conponents/swpier/swpier.vue"
	import goodSwiper from "../../conponents/goodSwiper/goodSwiper.vue"
	import myAdress from "../../conponents/adress/adress.vue"
	import myScreen from "../../conponents/Screen/Screen.vue"
	export default {
		components: {
			mySwiper,
			goodSwiper,
			myAdress,
			myScreen
		},
		data() {
			return {

			}
		},
		onLoad() {
			
		},
		methods: {

			searchShopping() {
				uni.navigateTo({
					url: '../searchShopping/searchShopping'
				});
			},


		}
	}
</script>

<style lang="scss">

</style>
