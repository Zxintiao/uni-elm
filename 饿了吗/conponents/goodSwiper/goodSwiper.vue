<template>
	<!-- 商品页面轮播 -->
	<swiper class="goodSwiper" :indicator-dots="true" :interval="3000" :duration="1000">
		<swiper-item>
			<view class="goodSwiper-item">
				<view class="" v-for="(item,index) in titleUrlOne" :key="index">
					<image :src="item.image_hash | urlFormatter" alt />
					<p>{{item.name}}</p>
				</view>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="goodSwiper-item">
				<view class="" v-for="(item,index) in titleUrlTwo" :key="index">
					<image :src="item.image_hash | urlFormatter" alt />
					<p>{{item.name}}</p>
				</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				titleUrlOne: {},
				titleUrlTwo: {}
			}
		},
		onLoad() {

		},
		created() {
			// 商品页面轮播
			this.getMoreSwiper()
		},
		//过滤器，过滤图片地址
		filters: {
			// 7d8a867c870b22bc74c87c348b75528djpeg
			// https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/
			urlFormatter(oldValue) {
				const first = "https://fuss10.elemecdn.com/";
				const second = oldValue.slice(0, 1);
				const third = oldValue.slice(1, 3);
				const forth = oldValue.slice(3);
				const fifth =
					".jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/";
				return `${first}${second}/${third}/${forth}${fifth}`;
			}
		},
		methods: {
			getMoreSwiper() { // 商品页面轮播
				uni.request({
					url: "http://192.168.137.1:3000/restapi/shopping/v2/entries",
					method: "GET",
					success: (res) => {
						this.titleUrlOne = res.data[0].entries.slice(0, 10);
						this.titleUrlTwo = res.data[0].entries.slice(11, 18);
					},
					fail(err) {
						console.log('err:', err);
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.goodSwiper {
		margin: 10rpx 0;
		height: 400rpx;

		.goodSwiper-item {
			width: 100%;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;
			padding: 1vw;

			view {
				width: 17vw;
				height: 17vw;
				margin: 0 1vw 40rpx;

				image {
					width: 90%;
					height: 90%;
					border-radius: 50%;
				}

				p {
					text-align: center;
					font-size: 14px;
				}
			}
		}
	}
</style>
