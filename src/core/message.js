
export function messagesRes(code,msg = "",data = {}) {
    return {
        status : code,
        data : data,
        message : msg
    }
}