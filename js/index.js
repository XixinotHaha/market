$(function () {
    var list = [
        {
            id: 1,
            name: 'OPPO Reno',
            desc: 'OPPO Reno 10倍变焦版 高通骁龙855 4800万超清三摄 6G+256G 雾海绿 全网',
            price: 4499,
            img: 'imgs/1.jpg'
        },
        {
            id: 2,
            name: "Apple iPhone XR",
            price: 5749,
            desc: 'Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 双卡双待 ',
            img: 'imgs/2.jpg'

        },
        {
            id: 3,
            name: "vivo iQOO",
            price: 3298,
            desc: '[KPL官方比赛用机]vivo iQOO 44W超快闪充 8GB+128GB电光蓝 全面屏拍照手',
            img: 'imgs/3.jpg'

        },
        {
            id: 4,
            name: "红米Redmi",
            price: 1599,
            desc: '小米 红米Redmi Note7Pro AI双摄 6GB+128GB 梦幻蓝 全网通4G 双卡双待 ',
            img: 'imgs/4.jpg'

        },
        {
            id: 5,
            name: "荣耀8X",
            price: 1699,
            desc: '荣耀8X 千元屏霸 91%屏占比 2000万AI双摄 4GB+64GB 幻夜黑 移动联通电信4G全 ',
            img: 'imgs/5.jpg'

        },
        {
            id: 6,
            name: "小米8SE",
            price: 1299,
            desc: '小米8SE 全面屏智能游戏拍照手机 6GB+64GB 灰色 骁龙710处理器 全 ',
            img: 'imgs/6.jpg'

        }
    ]

    //循环将数据渲染到页面上
    var html = "";
    $.each(list, function (i, ele) {
        html += `
        <div class="col-md-3" >
            <img class="img-thumbnail" src="${list[i].img}" alt="">
            <div>
                <h3 class="price">￥${list[i].price}</h3>
                <p class='title'>${list[i].name}</p>
                <p class="desc">
                    ${list[i].desc}
                </p>
                <p>
                    <button type="button" class="btn btn-danger btn-xs" id=${list[i].id}>加入购物车</button>
                </p>
                <p class="mark">${list[i].id} </p>
            </div>
        </div>`;
    })
    $(".row").html(html);

    $(".btn").on("click", function () {
        var local = getDate();
        //将新的数据push进数组里；
        var num = 0;
        var obj = {
            id: $(this).parent().siblings(".mark").text(),
            name: $(this).parent().siblings(".title").text(),
            num: 1,
            price: $(this).parent().siblings(".price").text().substr(1),
            desc: $(this).parent().siblings(".desc").text().trim(),
            img: $(this).parents("div").siblings(".img-thumbnail").attr("src"),
        }
        // console.log($(this).parents("div").siblings(".img-thumbnail").attr("src"));
        
        //判断是否重复，重复就让num加1个
       if(local.length>0){
           // 假设购物车中不存在当前商品
           var flag=false;
            $.each(local, function (i, e) {
                // console.log(e.id,obj.id);               
                if (e.id == obj.id) {
                    e.num++;   
                    // 当前购物车中添加过
                    flag=true;
                } 
            })
            if(flag==false){
                local.unshift(obj); 
            }
       }else{
        local.unshift(obj);
       }
        console.log(local);        

        
        saveDate(local);


    })

    //先定义读取本地存储的数据的函数
    function getDate() {
        var data = localStorage.getItem("information")
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return [];
        }
    }
    //存储数据，
    function saveDate(data) {
        localStorage.setItem("information", JSON.stringify(data));
    }



})