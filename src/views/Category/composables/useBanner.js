//封装轮播图相关代码

import {onMounted, ref} from "vue";
import {getBannerAPI} from "@/apis/home";

export function useBanner() {
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite:'2'
        })
        bannerList.value = res.result

    }
    onMounted(() => getBanner())

    return {
        bannerList
    }
}
