<template>
	<!-- 轮播 -->
	<swiper class="swiper" indicator-dots autoplay interval="5000" circular indicator-color="black" indicator-active-color="#ffffff">
		<swiper-item v-for="(item,index) in swiperUrl" :key="index">
			<image :src="item.image_hash | urlFormatter" alt="图片不存在"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				swiperUrl: []
			}
		},
		onLoad() {

		},
		created() {
			// 获取轮播数据信息
			this.getSwpier()
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
			getSwpier() { // 轮播
				uni.request({
					url: "http://192.168.137.1:3000/restapi/shopping/v2/banners",
					method: "GET",
					success: (res) => {
						this.swiperUrl = res.data
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
	.swiper {
		overflow: hidden;
		padding: 0 3vw;
		height: 200rpx;
		text-align: center;

		image {
			border-radius: 10rpx;
			width: 95%;
			height: 100%;
		}
	}
</style>
