<template>
	<view class="wrap">
		<!-- 发布 -->
		<view @click="goEdit" class="publish">
			<com-menu></com-menu>
		</view>
		<!-- 返回顶部 -->
		<u-back-top
			:scrollTop="scrollTop"
			:iconStyle="{
				fontSize: '50rpx',
				color: '#fff'
			}"
			:customStyle="{
				width: '110rpx',
				height: '110rpx',
				borderRadius: '50%',
				backgroundColor: 'rgba(217, 217, 243, 1)',
				position: 'fixed',
				bottom: '300rpx',
				right: '50rpx'
			}"
		></u-back-top>
	</view>
</template>

<script>
export default {
	name: 'com-goTop',
	data() {
		return {
			scrollTop: 0
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		goEdit() {
			uni.navigateTo({
				url: '/pages/chat/exchange/exchange'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	height: 200vh;
	background-color: $uni-F5F7FA;
	.publish {
		position: fixed;
		bottom: 150rpx;
		right: 50rpx;
	}
}
</style>
