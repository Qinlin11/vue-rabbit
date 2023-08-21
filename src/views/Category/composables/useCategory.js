//封装分类数据页面相关代码
import {getCategory2API} from "@/apis/category";
import {onMounted, ref} from "vue";

export function useCategory() {
    //获取数据
    const categoryDate = ref({})
    //获取路由参数
    const route = useRoute()
    const getCateGory = async (id = route.params.id) => {
        const res = await getCategory2API(id)
        categoryDate.value = res.result
    }
    onMounted(() => getCateGory())

    //目标：希望路由在变化的时候 可以把分类的数据接口重新发送

    onBeforeRouteUpdate((to) => {
        //存在的问题： 使用最新的路由参数请求最新的分类数据
        getCateGory(to.params.id)
    })

    return {
        categoryDate
    }
}
