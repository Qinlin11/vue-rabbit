//管理用户数据相关
import {defineStore} from "pinia";
import {loginAPI} from "@/apis/user";
import {useCartStore} from "@/stores/carStore";

export const userUserStore = defineStore('user', () => {
        const cartStore = useCartStore()
        //1.定义管理用户数据state
        const userInfo = ref({})
        //2.定义获取就扣数据的action函数
        const getUserInfo = async ({account, password}) => {
            const res = await loginAPI({account, password})
            userInfo.value = res.result
        }

        //退出时清除用户信息
        const clearUserInfo = () => {
            userInfo.value = {}
            //清除购物车的action
            cartStore.clearCart()
        }
        //3.以对象的格斯把state和action  return
        return {
            userInfo,
            getUserInfo,
            clearUserInfo
        }
    },
    {
        persist: true,
    })
