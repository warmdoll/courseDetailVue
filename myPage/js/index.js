$(function(){
    // var app = new Vue({
    //     el: '#app',//vue2.0不能在html,body上添加
    //     data: {
    //     message: '2017年消防工程师5天速成班',
    //     changeMessage:"my name is sunhuina",
    //     seen: true
    //     }
    // })
    var app3 = new Vue({
        el: '#app-3',
        data: {
          seen: true
        }
      })

      Vue.component('todo-item', {
        props: ['todo'],
        template: '<div class="bar_group__bar thin" v-bind:style="todo.style"></div><a href="/view/{{todo.href}}" class="skill-name">{{ todo.text }}</a>'
      })
      var app7 = new Vue({
        el: '#app-7',
        data: {
          groceryList: [
            { id: 0, text: 'html5,css3' ,style:{width:"90%"},href:"htmlcss"},
            { id: 1, text: 'javascript' ,style:{width:"90%"},href:"javascript"},
            { id: 2, text: 'vue.js' ,style:{width:"90%"},href:"vue"},
            { id: 3, text: 'webpack' ,style:{width:"90%"},href:"webpack"}
          ]
        }
      });

  })