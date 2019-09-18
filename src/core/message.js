function mapData(errorCode) {
    var errorMap = {
        200 : "OK"
    }
    
}
function messagesRes(code, msg = "", data = {}) {
    return {
        status: code,
        data: data,
        message: msg
    }
}
function exceptionRes(code, msg = "",detail = "") {
    return {
        status: code,
        message: msg,
        message_detail : detail
    }
}
export { messagesRes, exceptionRes }