//封装倒计时函数
import dayjs from "dayjs";
export const useCountDown = () => {
    //1.响应式数据
    const time = ref(0)
    let timer = null
    //格式化事件 为xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    //2.开启倒计时的函数
    const start = (currentTime) => {
        //开启倒计时的逻辑
        //核心逻辑：每隔1秒就 -1
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    onUnmounted(() => {
        timer && clearInterval(timer)
    })

    return {
        formatTime,
        start
    }
}
