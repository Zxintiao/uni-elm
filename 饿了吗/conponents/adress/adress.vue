<template>
	<!-- 获取地址 -->
	<view class="indexTop">
		<span style="marginLeft:15px;color: #1296DB;" class="iconfont icon-dingwei"></span>
		<text>{{address}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: '',
			}
		},
		onLoad() {

		},
		created() {
			// 获取地址
			this.getAdress()
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
			getAdress() { // 地址
				uni.request({
					url: "http://192.168.137.1:3000/restapi/member/v2/users/14547420/location",
					method: "GET",
					success: (res) => {
						this.address = res.data.addresses[0].address;
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
