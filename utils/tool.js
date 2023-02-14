export function getProvince() {
	return new Promise((resolve, reject) => {
		let historyCity = uni.getStorageSync("historyCity")
		if (historyCity) {
			resolve(historyCity.city)
		} else {
			uni.request({
				url: "https://restapi.amap.com/v3/ip?key=f70e97685a81b5330bbbd65bef5e32b9",
				success: (res) => {
					let str = ''
					resolve(res.data.city)
					if (typeof(res.data.city) == "string") {
						str = res.data.city
					} else {
						str = "未知"
					}
					resolve(str)
					let obj = {
						city: str,
						time: Date.now()
					}
					uni.setStorageSync("historyCity", obj)
				},
				fail: (err) => {
					reject(err)
				}
			})
		}
	})
}
