<template>
	<view class="dataList">
		<view class="hander">
			<view class="name" @click="goUser">
				<image
					:src="
						item.user_id[0].avatar_file.url
							? item.user_id[0].avatar_file.url
							: '../../static/logo.png'
					"
					mode="aspectFill"
				></image>
				<text>
					{{
						item.user_id[0].nickname
							? item.user_id[0].nickname
							: item.user_id[0].username
					}}
				</text>
				<text class="userIP">( {{ item.location }} )</text>
			</view>
			<text class="iconfont icon-gengduo"></text>
		</view>
		<view class="content">
			<text @click="goDetail">{{ item.content }}</text>
			<view class="img">
				<image
					v-for="(pic, index) in item.avatar"
					:key="index"
					:src="pic"
					mode="aspectFill"
					@click="clickPic(index)"
				></image>
			</view>
		</view>
		<view class="footer">
			<uni-dateformat
				class="time"
				:date="item.publish_date"
				format="yyyy-MM-dd hh:mm"
				:threshold="[60000, 3600000]"
			></uni-dateformat>
			<view class="greet">
				<view class="box">
					<text class="iconfont icon-icon-test"></text>
					<text>{{ item.view_count }}</text>
				</view>
				<view class="box">
					<text class="iconfont icon-icon-test1"></text>
					<text @click="goDetail">
						{{ item.comment_count ? item.comment_count : '评论' }}
					</text>
				</view>
				<view class="box">
					<text class="iconfont icon-xihuan"></text>
					<text @click="addLike">{{ item.like_count ? item.like_count : '喜欢' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const db = uniCloud.database();
export default {
	name: 'com-dataList',
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			itemArr: this.item
		};
	},
	onLoad() {},
	methods: {
		goDetail() {
			uni.navigateTo({
				url: `/pages/index/details/details?id=${this.item._id}`
			});
		},
		clickPic(index) {
			uni.previewImage({
				urls: this.item.avatar,
				current: index
			});
		},
		goUser() {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
			});
		},
		addLike() {
			// this.addData();
		},

		addData() {
			let indexTemp = db.collection('school_default').getTemp();
			let userTemp = db.collection('uni-id-users').getTemp();
			db.collection(indexTemp, userTemp)
				.doc(this.itemArr._id)
				.update({
					like_count: 99
				});
		}
	}
};
</script>

<style lang="scss">
.dataList {
	background-color: $uni-fff;
	padding: 30rpx 20rpx;
	border-radius: 20rpx;
	.hander {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
		padding-bottom: 15rpx;
		// border-bottom: 1rpx dotted $uni-d9d9f3;
		.name {
			display: flex;
			align-items: center;
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				border: 3rpx solid #000;
				margin-right: 30rpx;
			}
			text {
				font-size: 30rpx;
				font-weight: 700;
			}
			.userIP {
				margin-left: 20rpx;
				font-size: 20rpx;
				font-weight: 400;
			}
		}
		.iconfont {
			font-size: 50rpx;
			margin-right: 20rpx;
		}
	}
	.content {
		text {
			line-height: 1.6em;
			font-size: 33rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			text-align: justify;
			padding: 10rpx;
			letter-spacing: 5rpx;
		}
		.img {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			image {
				width: 200rpx;
				height: 200rpx;
				margin: 10rpx 10rpx 0;
				border-radius: 10rpx;
			}
		}
	}
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		vertical-align: middle;
		.time {
			font-size: 25rpx;
		}
		.greet {
			display: flex;
			align-items: center;
			.box {
				display: flex;
				align-items: center;
				margin-right: 40rpx;
				.iconfont {
					font-size: 45rpx;
				}
				text {
					margin-left: 10rpx;
					font-size: 25rpx;
				}
			}
		}
	}
}
</style>
