//把components中所有的组件进行全局注册
//通过插件的方式
import ImageView from '@/components/ImageView/index.vue'
import Sku from "@/components/XtxSku/index.vue";
export const componentsPlugin = {
    install(app){
        //app.component('组件的名字', 组件配置对象)
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', Sku)
    }
}
