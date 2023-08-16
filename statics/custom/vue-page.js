(function () {
    var tm = '<div class="dataTables_paginate paging_simple_numbers">' +
        '<ul class="pagination" style="float:right">' +
        '<li class="paginate_button previous" v-if="cur!=1" style="margin-left: 10px"><a @click="btnClick(cur-1)" style="cursor:pointer;">上一页</a></li>' +
        '<li class="paginate_button previous" v-for="index in indexs" v-bind:class="{ active: cur == index}" style="margin-left: 10px">' +
        '<a v-on:click="btnClick(index)" style="cursor:pointer;">{{ index }}</a>' +
        '</li>' +
        '<li class="paginate_button previous" v-if="cur!=all" style="margin-left: 10px"><a @click="btnClick(cur+1)" style="cursor:pointer;">下一页</a></li>' +
        '<li class="paginate_button previous" style="margin-left: 10px;cursor:pointer;"><a>共<i>{{all}}</i>页</a></li>' +
        '</ul>' +
        '<div style="padding-top:10px;float:right;padding-right:25px">当前第{{curStart}}到{{curEnd}}条记录  总共{{total}}条记录  </div>' +
        '</div>'

    var navBar = Vue.extend({
        template: tm,
        props: {
            cur: {
                type: [String, Number],
                required: true
            },
            all: {
                type: [String, Number],
                required: true
            },
            total:
            {
                type: [String, Number],
                required: true
            },
            url: {
                type: [String, Number],
                required: true
            },
            jump_cb:{
                type:[String]
            },
            onPage: {
                default() {
                    return function onPage(page) {
                        let url = this.url
                        let index = url.indexOf("&page")
                        if(index>0)
                        {
                            url = url.substr(0,index)
                        }
                        else
                        {
                            index = url.indexOf("page")
                            if(index>0)
                            {
                                url = url.substr(0,index)
                            }
                        }
                        if(url.indexOf("?")<0)
                        {
                            url+="?page="+page
                        }
                        else
                        {
                            url+="&page="+page
                        }
                        location.href = url
                    }
                }
            }
        },
        computed: {
            curStart()
            {
                if(this.total==0)
                {
                    return 0
                }
                return (this.cur-1)*30+1
            },
            curEnd()
            {
                let t = this.cur*30
                if(t>this.total)
                {
                    t = this.total
                }
                return t
            },
            curTotal()
            {
                return this.total
            },
            indexs() {
                var left = 1
                var right = this.all
                var ar = []
                if (this.all >= 11) {
                    if (this.cur > 5 && this.cur < this.all - 4) {
                        left = this.cur - 5
                        right = this.cur + 4
                    } else {
                        if (this.cur <= 5) {
                            left = 1
                            right = 10
                        } else {
                            right = this.all
                            left = this.all - 9
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                return ar
            }
        },
        methods: {
            btnClick(page) {
                if (page != this.cur) {
                    if(this.jump_cb)
                    {
                        this.jump_cb(page)
                    }
                    else
                    {
                        this.onPage(page)
                    }
                }
            }
        }
    })

    window.Vnav = navBar

})()