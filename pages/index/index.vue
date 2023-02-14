<template>
	<view class="home">
		<!-- 顶部导航栏 -->
		<view class="navTop">
			<u-tabs
				:list="navList"
				@click="navClick"
				lineColor="#7A57D1"
				:activeStyle="{
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#333',
					transform: 'scale(1)'
				}"
			></u-tabs>
		</view>
		<!-- 骨架屏 -->
		<view class="loadingState" v-show="loadState">
			<u-skeleton rows="3" title loading></u-skeleton>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view class="items" v-for="item in dataList">
				<com-dataList :item="item"></com-dataList>
			</view>
		</view>
		<!-- 发布 -->
		<view @click="goEdit" class="publish"><com-menu></com-menu></view>
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
const db = uniCloud.database();
export default {
	data() {
		return {
			loadState: true,
			navList: [
				{
					name: '最新',
					type: 'publish_date'
				},
				{
					name: '热门',
					type: 'view_count'
				}
			],
			scrollTop: 0,
			dataList: [],
			navAction: 0
		};
	},
	onLoad() {
		this.getData();
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		getData() {
			let indexTemp = db.collection('school_default').getTemp();

			let usersTemp = db
				.collection('uni-id-users')
				.field('nickname,_id,avatar_file')
				.getTemp();

			db.collection(indexTemp, usersTemp)
				.orderBy(this.navList[this.navAction].type, 'desc')
				.get()
				.then(res => {
					this.dataList = res.result.data;
					console.log(this.dataList);
					this.loadState = false;
				});
		},
		navClick(e) {
			this.loadState = true;
			this.dataList = [];
			this.navAction = e.index;
			this.getData();
		},
		goEdit() {
			uni.navigateTo({
				url: '/pages/index/edit/edit'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	min-height: calc(100vh - var(--window-top));
	background-color: $uni-F5F7FA;
	.navTop {
		margin-bottom: 10rpx;
	}
	.loadingState {
		padding: 30rpx;
	}
	.content {
		padding-bottom: 30rpx;
		.items {
			padding: 20rpx;
		}
	}
	.publish {
		position: fixed;
		bottom: 150rpx;
		right: 50rpx;
	}
}
</style>
