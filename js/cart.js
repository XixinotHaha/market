$(function () {
    //页面开启重新加载页面
    load();
    getSum();
    function load() {
        var data = getDate();
        // console.log(data);    
        var html = "";
        //渲染页面
        $.each(data, function (i, d) {
            html += `
            <div class="cart-item ">
                <div class="p-checkbox">
                    <input type="checkbox" name="" id=${i}  class="j-checkbox">
                </div>
                <div class="p-goods">
                    <div class="p-img">
                        <img src="${d.img}" alt="">
                    </div>
                    <div class="p-msg">${d.desc}</div>
                </div>
                <div class="p-price">￥${d.price}</div>
                <div class="p-num">
                    <div class="quantity-form">
                        <a href="javascript:;" class="decrement" gid="${d.id}">-</a>
                        <input type="text" class="itxt" value="${d.num}">  
                        <a href="javascript:;" class="increment" gid="${d.id}">+</a>
                    </div>
                </div>
                <div class="p-sum">￥${d.price * d.num}</div>
                <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>`;
        })
        $(".cart-item-list").html(html);

    }

    //勾选全选框,单选复选框会被全部选中
    $(".checkall").on("change", function () {
        $(".checkall,.j-checkbox").prop("checked", $(this).prop("checked"));

        //给选中的商品栏加背景色
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });

    //勾选单选复选框，选中就会添加背景颜色，如果全部选中，全选复选框也会被选中，如果有一个没有被选中，请安萱复选框就不会被选中
    $(".cart-item-list").on("change", ".j-checkbox", function () {

        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", "checked");
        } else {
            $(".checkall").prop("checked", "");
        };

        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");


        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        };
        getSum();

    });

    //点击减号（——）减少商品件数
    $(".cart-item-list").on("click", ".decrement", function () {
        var data = getDate();
        //定义一个变量来获取数量值
        var num = $(this).siblings("input").val();
        //让数量递减
        num--;
        //重新赋值  
        if (num < 1) {
            $(this).attr("disabled", "disabled")
            num=1;
        } else {
            $(this).siblings("input").val(num);
        }
        //小计
        var p=$(this).parents(".p-num").siblings(".p-price").text().substr(1);      
        $(this).parents(".p-num").siblings(".p-sum").text("￥"+p*num);

        getSum();
        var gid=$(this).attr('gid');
        $.each(data,function(i,item){
            if(item.id==gid){
                item.num-=1;
            }
        });
        saveDate(data); 

    });
    //点击加号（+）增加商品件数
    $(".cart-item-list").on("click", ".increment", function () {
        var data = getDate();
        var num = $(this).siblings("input").val();
        //让数量递增
        num++;
        $(this).siblings("input").val(num);
        //小计
        var p=$(this).parents(".p-num").siblings(".p-price").text().substr(1);      
        $(this).parents(".p-num").siblings(".p-sum").text("￥"+p*num);
        var gid=$(this).attr('gid');
        $.each(data,function(i,item){
            if(item.id==gid){
                item.num+=1;
            }
        });
        saveDate(data);  
        getSum();      
    });

    $(".itxt","change",function(){
        getSum();
        load(0);
    })

    //删除物品
    $(".cart-item-list").on("click", ".p-action a", function () {
        //先获取数据
        var data = getDate();
        //获取自定义属性id的属性值
        var index = $(this).parent().siblings(".p-checkbox").find(".j-checkbox").attr("id");
        // console.log(index);
        //截取字符串，把数据中的这一项删除     
        data.splice(index, 1);
        //重新将数据保存再本地
        saveDate(data);
        //重新渲染页面
        load();
        getSum();
    })

    //删除选中商品
    $(".remove-batch").on("click", function () {
        //不能用（ $(".j-checkbox:checked").parents(".cart-item").remove();）来删除，因为本地没有删除加载之后会重新渲染；
        var data = getDate();
        //获取自定义属性id的属性值
        //因为attr()只能取一项，而单选复选框可能会选好几个，所以不确定是哪个，所以得循环遍历被选择的单选复选框
        $.each($(".j-checkbox:checked"), function (index, ele) {
            // $(ele).attr("id");
            //截取字符串，把数据中的这一项删除   
            data.splice($(ele).attr("id"), 1);
        });
        //重新将数据保存再本地
        saveDate(data);
        //重新渲染页面
        load();
        getSum();
    })

    //清空购物车全部删除(委托事件)
    $(".cart-floatbar").on("click", ".clear-all", function () {
        localStorage.removeItem("information");
        // $(this).parents(".cart-floatbar").siblings(".cart-item-list").empty();
        //重新渲染页面
        load();
    })

    //计算总计和总额，根据是不是被选择来计算
    function getSum() {
        var count = 0;
        var money = 0;
        $.each($(".j-checkbox:checked"), function (index, ele) {
            var c = $(ele).parent().siblings(".p-num").find(".itxt").val();
            count += parseInt(c)   
        })
        // console.log(count);
        $(".amount-sum em").text(count);

        $.each($(".j-checkbox:checked"), function (index, ele) {
            // m=$(ele).text().substr(1)
            var m=$(ele).parent().siblings(".p-sum").text().substr(1);
            money += parseFloat(m);           
        })
        // console.log(money);
        $(".price-sum em").text("￥" + money);
    }


    // 先定义读取本地存储的数据的函数
    function getDate() {
        var data = localStorage.getItem("information")
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return [];
        }
    }
    // 存储数据，
    function saveDate(data) {
        localStorage.setItem("information", JSON.stringify(data));
    }

})