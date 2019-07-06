  // 商品列表
    var list = [{
            name: 'OPPO Reno',
            desc: 'OPPO Reno 10倍变焦版 高通骁龙855 4800万超清三摄 6G+256G 雾海绿 全网',
            price: 4499,
            img: 'imgs/1.jpg'
        },
        {
            name: "Apple iPhone XR",
            price: 5749,
            desc: 'Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 双卡双待 ',
            img: 'imgs/2.jpg'

        },
        {
            name: "vivo iQOO",
            price: 3298,
            desc: '[KPL官方比赛用机]vivo iQOO 44W超快闪充 8GB+128GB电光蓝 全面屏拍照手',
            img: 'imgs/3.jpg'

        },
        {
            name: "红米Redmi",
            price: 1599,
            desc: '小米 红米Redmi Note7Pro AI双摄 6GB+128GB 梦幻蓝 全网通4G 双卡双待 ',
            img: 'imgs/4.jpg'

        },
        {
            name: "荣耀8X",
            price: 1699,
            desc: '荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全 ',
            img: 'imgs/5.jpg'

        },
        {
            name: "小米8SE",
            price: 1299,
            desc: '小米8SE 全面屏智能游戏拍照手机 6GB+64GB 灰色 骁龙710处理器 全 ',
            img: 'imgs/6.jpg'
        }
    ];

    var btnUp = document.querySelector('.btn-primary');
    var btnDown = document.querySelector('.btn-success');
    var father = document.querySelector('.father');
    // document.createElement();
    function render() {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            html += `
            <div class="col-md-3">
                    <img class="img-thumbnail" src="${obj.img}" alt="">
                    <div>
                        <h3 class="price">￥${obj.price}</h3>
                        <p class='title'>${obj.name}</p>
                        <p class="desc">
                                ${obj.desc}
                        </p>
                        <p>
                            <button type="button" class="btn btn-primary btn-xs">自营</button>
                            <button type="button" class="btn btn-danger btn-xs">放心购</button>
                        </p>
                    </div>
                </div>`;
        }

        // console.log(html);

        father.innerHTML = html;
    }

    render();


    btnUp.addEventListener('click', function () {
        list.sort(function (a, b) {
            return a.price - b.price
        })
        // console.log(list);
        render();
    })

    btnDown.addEventListener('click', function () {
        list.sort(function (a, b) {
            return b.price - a.price
        })
        // console.log(list);
        render();
    })