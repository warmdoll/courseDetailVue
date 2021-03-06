$(function(){
   
    Vue.component('todo-item',{
        props:['todo'],
        template:' <li class="item-box">\
                        <div class="item-list">\
                            <p>{{todo.title}}</p>\
                            <div class="item-list-content">{{todo.content}}</div>\
                        </div>\
                    </li>'
    })

    
    var app=new Vue({
        el:'#app',
        data:{
            groceryList:[
                {id:0,title:'a',content:"这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 <code>props</code> 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 <code>todo-item</code> 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。"},
                {id:1,title:'b',content:"这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 <code>props</code> 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 <code>todo-item</code> 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。"},
                {id:2,title:'c',content:"这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 <code>props</code> 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 <code>todo-item</code> 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。"},
                {id:2,title:'c',content:"这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 <code>props</code> 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 <code>todo-item</code> 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。"},
                {id:2,title:'c',content:"这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 <code>props</code> 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 <code>todo-item</code> 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。"}
            ]
        }
    });
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :pullDownfreshfn //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :pullUpfreshfn //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        },
    });
    // 下拉刷新
    function pullDownfreshfn(){
        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    };
    //上拉加载
    function pullUpfreshfn(){
        var appendData={id:2,title:"c",content:"这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 <code>props</code> 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 <code>todo-item</code> 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。"};
        app.groceryList.push(appendData);
        this.endPullupToRefresh(true);
    };
    
  
})
