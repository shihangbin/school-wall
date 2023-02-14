<template>
	<view class="edit">
		<view class="content">
			<textarea
				placeholder="内容不少于5个字..."
				maxlength="200"
				focus="true"
				auto-height="true"
				v-model="content"
				@input="inputContent"
			></textarea>
		</view>
		<view class="fileImg">
			<uni-file-picker
				v-model="imageValue"
				fileMediatype="image"
				mode="grid"
				@progress="progress"
				@success="success"
			/>
		</view>
		<view class="btnGroup">
			<u-button
				type="primary"
				text="确定发布"
				color="#d9d9f3"
				:disabled="isDisabled"
				@click="onSubmit"
			></u-button>
		</view>
	</view>
</template>

<script>
import { getProvince } from '@/utils/tool.js';

const db = uniCloud.database();

export default {
	name: 'com-edit',
	data() {
		return {
			imageValue: [],
			content: '',
			avatar: [],
			location: '',
			isDisabled: true
		};
	},
	onLoad() {
		getProvince().then(res => {
			this.location = res;
		});
	},
	methods: {
		// 获取上传进度
		progress() {
			uni.showToast({
				title: '上传中',
				icon: 'loading',
				mask: true
			});
		},
		// 上传成功
		success(e) {
			this.avatar = e.tempFilePaths;
		},
		inputContent() {
			if (this.content.length >= 5) {
				this.isDisabled = false;
			}
		},
		onSubmit() {
			uni.showToast({
				title: '发布中',
				icon: 'loading'
			});
			this.addData();
		},
		addData() {
			db.collection('school_default')
				.add({
					content: this.content,
					avatar: this.avatar,
					location: this.location
				})
				.then(res => {
					console.log(res);
					uni.showToast({
						title: '发布成功',
						icon: 'none'
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}, 800);
				});
		}
	}
};
</script>

<style lang="scss">
.edit {
	padding: 30rpx;

	.content {
		// border: 5rpx solid #000;
		border-radius: 20rpx;
		padding: 30rpx 20rpx;

		uni-textarea {
			width: 100%;
			letter-spacing: 5rpx;
			text-align: justify;
		}
	}

	.fileImg {
		padding: 20rpx;
	}

	.btnGroup {
		margin-top: 30rpx;
	}
}
</style>
