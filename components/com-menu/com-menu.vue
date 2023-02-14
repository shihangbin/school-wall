<template>
	<view class="menu">
		<text :class="iconfont"></text>
	</view>
</template>

<script>
export default {
	name: 'com-menu',
	props: {
		iconfont: {
			type: String,
			default: 'iconfont icon-icon-test5 '
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.menu {
	width: 110rpx;
	height: 110rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: rgba(217, 217, 243, 1);
	.iconfont {
		font-size: 50rpx;
		color: $uni-fff;
	}
}
</style>
