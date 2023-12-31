//封装购物车模块

import {defineStore} from "pinia";
import {userUserStore} from "@/stores/userStore";
import {insertCartAPI, findNewCartList, delCartList} from "@/apis/cart";

export const useCartStore = defineStore('cart', () => {
    const userStore = userUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //1,定义store -cartList
    const cartList = ref([])

    const updateNewList = async () => {
        const res = await findNewCartList()
        cartList.value = res.result
    }

    //2.定义action -addCart
    const addCart = async (goods) => {
        const {skuId, count} = goods
        if(isLogin.value) {
            //登录之后加入购物车逻辑
            await insertCartAPI({skuId, count})
            updateNewList()
        }else {
            //添加购物车操作
            //已添加过 - count + 1
            //没有添加过 - 直接push
            //思路： 通过匹配传递过来的商品对象中的skuId能不能再cartList中找到 找到了就是添加过了
            const item = cartList.value.find(item => goods.skuId === item.skuId)
            if(item) {
                //找到了
                item.count++
            }else {
                cartList.value.push(goods)
            }
        }
    }

    //删除购物车
    const delCart = async (skuId) => {
        if(isLogin.value) {
            //调用接口实现购物车的删除功能
            await delCartList([skuId])
            updateNewList()
        }else {
            //思路： 找到要删除项的下标 -splice
            //或 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex(item => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }

    }

    //清除购物车
    const clearCart = () => {
        cartList.value = []
    }


    //单选功能
    const singleCheck = (skuId, selected) => {
        //通过skuId找到要修改的哪一项， 然后把它selected修改为传过来的selected
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    //全选功能
    const allCheck = (selected) => {
        //把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }

    //计算属性
    //1. 总数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    //是否全选
    const isALL = computed(() => cartList.value.every(item => item.selected))

    //已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    //已选择商品价格合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    return {
        cartList,
        addCart,
        delCart,
        isALL,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        singleCheck,
        allCheck,
        clearCart,
        updateNewList
    }

},{
    persist: true,
})
