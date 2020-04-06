(function () {
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        cardList = null,
        data = null;
    let xhr = new XMLHttpRequest;
    xhr.open('GET', './json/product.json', false);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
    let str = ``;
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let {
            id,
            title,
            price,
            time,
            hot,
            img
        } = item;
        str += `<div class="card">
                <img src="${img}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">价格：￥${price.toFixed(2)}</p>
                    <p class="card-text">销量：${hot}</p>
                    <p class="card-text">时间：${time}</p>
                </div>
            </div>`
    }
    productBox.innerHTML = str;
    //数据绑定完，获取到页面中创建的10个card盒子（cardlist：存储的是card的元素对象。它是一个节点
    cardList = productBox.querySelectorAll('.card');

    //点击价格按照价格的升序排序
    //navli[0]集合中的第一项就是价格这个按钮
   navList[0].onclick=function(){
       //先把类数组集合变为数组（目的是一会用sort排序）
       let arr=Array.from(cardList);
       arr.sort((a,b)=>{
           return a.getAttribute('data-price')-b.getAttribute('data-price');
       });
       for (let i=0; i<arr.length;i++){
           productBox.appendChild(arr[i]);
       }
   }
})();