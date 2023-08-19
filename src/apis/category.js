import httpInstance from "@/utils/http";

export function getCategory2API(id) {
    return httpInstance({
        url: '/category',
        params: {
            id
        }
    })

}
