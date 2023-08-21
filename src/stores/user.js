//管理用户数据相关
import {defineStore} from "pinia";
import {loginAPI} from "@/apis/user";


export const userUserStore = defineStore('user', () => {
        //1.定义管理用户数据state
        const userInfo = ref({})
        //2.定义获取就扣数据的action函数
        const getUserInfo = async ({account, password}) => {
            const res = await loginAPI({account, password})
            userInfo.value = res.result
        }
        //3.以对象的格斯把state和action  return
        return {
            userInfo,
            getUserInfo
        }
    },
    {
        persist: true,
    })
