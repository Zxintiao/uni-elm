<template>
	<!-- 商家信息API -->

	<view class="">
		<view v-for="item in restaurants">
			<view class="r_item">
				<view class="r_left">
					<image :src="item.restaurant.image_path" mode="widthFix"></image>
				</view>
				<view class="r_right">
					<view class="title">{{item.restaurant.name}}</view>
					<view class="grade">
						<text class="rating">★{{item.restaurant.rating}} </text>
						<text>{{item.restaurant.business_info.recent_order_num_display}}</text>
					</view>
					<view class="delivery">
						<text>起送 ￥ {{item.restaurant.float_minimum_order_amount}} 配送 ￥ {{item.restaurant.float_delivery_fee}} </text>
						<text class="time">{{item.restaurant.order_lead_time}}分钟 {{item.restaurant.distance}}</text>
					</view>
					<view class="comment" v-if="item.restaurant.promotion_info">
						<text>"{{item.restaurant.promotion_info}}"</text>
					</view>
					<view class="tag">
						<block v-for="item in item.restaurant.business_info.lemon_support_tags">
							<text class="discount">{{item.text}}</text>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				restaurants: {}
			}
		},
		onLoad() {

		},
		created() {
			// 获取商家信息API
			this.restaurant()
		},
		methods: {
			urlFormatter(oldValue) { //改变获取的图片格式
				const first = "https://fuss10.elemecdn.com/";
				const second = oldValue.slice(0, 1);
				const third = oldValue.slice(1, 3);
				const forth = oldValue.slice(3);
				const type = forth.indexOf('png');
				let fifth = '';
				if (type == -1) {
					fifth =
						".jpeg?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/";
				} else {
					fifth =
						".png?imageMogr/thumbnail/!90x90r/gravity/Center/crop/90x90/";
				}
				return `${first}${second}/${third}/${forth}${fifth}`;
			},
			restaurant() {
				uni.request({
					url: "http://192.168.137.1:3000/restapi/shopping/v3/restaurants",
					method: "GET",
					sslVerify: true,
					success: (res) => {
						for (let i in res.data.items) {
							res.data.items[i].restaurant.image_path = this.urlFormatter(res.data.items[i].restaurant.image_path);
							res.data.items[i].restaurant.business_info = JSON.parse(res.data.items[i].restaurant.business_info);
							if (res.data.items[i].restaurant.distance > 1000) {
								res.data.items[i].restaurant.distance = parseInt(res.data.items[i].restaurant.distance / 1000 * 10) / 10 +
									' km';
							} else {
								res.data.items[i].restaurant.distance = res.data.items[i].restaurant.distance + ' m';
							}
						}
						this.restaurants = res.data.items;
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.intro {
		font-size: 40rpx;
		color: #555;
		margin: 30rpx 10rpx;
	}

	.r_item {
		margin-bottom: 40rpx;
		height: auto;
		display: flex;
		justify-content:space-around;
	}

	.r_left {
		width: 30%;
		padding: 0 20rpx 0 0;
	}

	.r_left image {
		width: 100%;
		border-radius: 20rpx;
		border: 1px solid #ccc;
	}

	.r_right {
		width: 60%;
		min-height: 210rpx;
		border-bottom: 2rpx solid #ccc;
		font-size: 16rpx;
		color: #777;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
	}

	.grade {
		margin: 10rpx 0;
	}

	.title {
		color: #000000;
		font-weight: bold;
		font-size: 36rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.rating {
		color: #f60;
		display: inline-block;
		margin-right: 20rpx;
	}

	.tag {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.discount {
		border: 1px solid #fc9;
		color: #e23028;
		display: inline-block;
		padding: 2rpx 10rpx;
		margin: 4rpx;
	}

	.time {
		display: inline-block;
		float: right;
	}

	.delivery {
		margin: 14rpx 0;
	}

	.comment {
		width: 100%;
		color: #e23028;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		border-radius: 6rpx;
	}

	.comment text {
		display: inline-block;
		padding: 6rpx;
		background-color: #fae5b8;
	}
</style>
