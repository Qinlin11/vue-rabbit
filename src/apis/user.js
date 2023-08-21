//封装所有和用户相关的接口信息
import request from "@/utils/http";

export const loginAPI = ({account, password}) => {
    return request({
        url: '/login',
        method: 'post',
        data: {
            account,
            password
        }

    })
}
