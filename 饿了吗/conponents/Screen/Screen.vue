<template>
	<!-- 筛选数据 -->
	<view class="Screen">
		<ul class="navBar">
			<li v-for="(item,index) in list" keys="index" :class="{active:index==num}" @click="changIndex(index)">
				<view class="">
					{{item}}
				</view>
				<text :class="{btnActive:index==num}"></text>
			</li>
		</ul>
		<view class="recommend">
			<view class="navItem">
				<view class="navItem_left">
					<view :class="{ChangeActive:changNum==0}" @click="changNumIndex(0)">
						{{goods}}
						<text class="iconfont icon-icon--1"></text>

						<view class="Screen_goods" v-show="isShow">

							<view class="Screen_goods_two">

							</view>
							<view class="Screen_goods_one">
								<view v-for="(item,index) in Screen_goods" keys="index" :class="{changIndex:goodsIndex==index}" @click="changGoodsIndex(index)">
									{{item.name}}
									<text class="iconfont  icon-like" v-if="goodsIndex==index"></text>
								</view>
							</view>
						</view>

					</view>
					<view :class="{ChangeActive:changNum==1}" @click="changNumIndex(1)">距离</view>
					<view :class="{ChangeActive:changNum==2}" @click="changNumIndex(2)">销量</view>
				</view>
				<view class="navItem_right">
					<text>筛选</text>
					<text class="iconfont icon-dressingbyscreenin"></text>






				</view>

			</view>

		</view>
		<view class="content" v-show="num==0">
			<text v-for="(item,index) in Screen_names">
				{{item.name}}
			</text>
		</view>
		<goods></goods>

	</view>
</template>

<script>
	import goods from "../goods/goods.vue"
	export default {
		components: {
			goods
		},
		data() {
			return {
				num: 0,
				list: ['推荐', '果蔬商超', '到店自取'],
				changNum: 0,
				isShow: false,
				Screen_goods: [],
				goodsIndex: 0,
				goods: '',
				Screen_names: []
			}
		},
		onLoad() {

		},
		created() {
			// 商品筛选
			this.getScreen()
		},
		methods: {
			changGoodsIndex(index) {
				this.goodsIndex = index
				this.goods = this.Screen_goods[index].name
			},
			noShow() {
				this.isShow = false
			},
			changNumIndex(index) {
				this.changNum = index
				if (index == 0) {
					this.isShow = !this.isShow
				} else {
					this.isShow = false
				}
			},
			changIndex(index) {
				this.num = index
			},
			getScreen() { // 筛选数据
				uni.request({
					url: "http://192.168.137.1:3000/pizza/shopping/restaurants/batch_filter",
					method: "GET",
					success: (res) => {
						// console.log(res.data)
						this.Screen_goods = res.data.outside.inside_sort_filter
						this.Screen_names = res.data.outside.outside_filters
						this.goods = this.Screen_goods[0].name
					},
					fail(err) {
						console.log('err:', err);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.Screen {
		.navBar {
			display: flex;

			li {
				margin: 0 30rpx;
				height: 80rpx;
			}

			.active {
				color: #007AFF;
				text-align: center;

				.btnActive {
					display: inline-block;
					background-color: #007AFF;
					width: 60rpx;
					height: 10rpx;
					border-radius: 30rpx;
				}
			}
		}

		.navItem {
			margin: 30rpx 0 0 0;
			display: flex;
			position: relative;
			justify-content: space-between;
			font-size: 14px;

			.navItem_left {
				.icon-icon--1 {
					position: absolute;
					top: 4rpx;
				}

				&>view {
					display: inline-block;
					margin: 0 30rpx;
					position: relative;

					.Screen_goods_one {
						padding-left: 30rpx;
						background-color: #FFFFFF;
						position: absolute;
						z-index: 4;
						color: #424242;
						width: 750rpx;
						left: -30rpx;
						top: 34rpx;
						.changIndex {
							color: #007AFF;
						}

						view {
							display: flex;
							margin: 20rpx 0;
							justify-content: space-between;
						}
					}

					.Screen_goods_two {
						position: absolute;
						z-index: 3;
						left: -30rpx;
						width: 750rpx;
						height: 1000rpx;
						background-color: #000000;
						opacity: 0.1;
					}
				}

				&>.ChangeActive {
					color: #007AFF;
				}

			}
		}

		.navItem_right {
			margin: 0 50rpx;
		}

		.content {
			margin: 10rpx 0;
			font-size: 12px;

			text {
				padding: 5rpx;
				border-radius: 10rpx;
				margin: 0 30rpx;
				background-color: #e2e2e2;
			}
		}
	}
</style>
