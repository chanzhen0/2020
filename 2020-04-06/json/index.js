let shopModule = (function () {
	let navList = document.querySelectorAll('.nav .item'),
		productBox = document.querySelector('.Box'),
		cardList = null,
		data = null;
	let queryData = function queryData() {
		let xhr = new XMLHttpRequest;
		xhr.open('GET', './json/product.json', false);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
			}
		};
		xhr.send(null);
	};
	let bindHTML = function bindHTML() {
		let str = ``;
		data.forEach(item => {
			let {
				title,
				price,
				time,
				hot,
				img
			} = item;
			str += `<div class="card" data-price="${price}" data-time="${time}"
				data-hot="${hot}">
				<img src="${img}" class="top" alt="">
				<div class="body">
					<h5 class="title">${title}</h5>
					<p class="text">价格：￥${price.toFixed(2)}</p>
					<p class="text">销量：${hot}</p>
					<p class="text">时间：${time}</p>
				</div>
			</div>`;
		});
		productBox.innerHTML = str;
		cardList = productBox.querySelectorAll('.card');
	};
	let clear = function clear() {
		[].forEach.call(navList, item => {
			if (item !== this) {
				item.flag = -1;
			}
		});
	};
	let sortCard = function sortCard(i) {
		let arr = Array.from(cardList);
		let char = "data-price";
		i === 1 ? char = 'data-time' : null;
		i === 2 ? char = 'data-hot' : null;
		arr.sort((a, b) => {
			a = a.getAttribute(char);
			b = b.getAttribute(char);
			if (char === 'data-time') {
				a = a.replace(/-/g, '');
				b = b.replace(/-/g, '');
			}
			return (a - b) * this.flag;
		});
		for (let j = 0; j < arr.length; j++) {
			productBox.appendChild(arr[j]);
		}
	};
	let handleNav = function handleNav() {
		[].forEach.call(navList, (item, index) => {
			item.flag = -1;
			item.onclick = function () {
				clear.call(this);
				this.flag *= -1;
				sortCard.call(this, index);
			};
		});
	};

	return {
		init() {
			queryData();
			bindHTML();
			handleNav();
		}
	};
})();
shopModule.init();