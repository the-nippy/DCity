/**
 * 封装的Error对象
 */

let ErrorCode = 0;
let ErrorMsg = '未知错误';

export default class Error {

    //set get方法
    setErrorCode(code) {
        if (code != null && typeof code == 'number') {
            ErrorCode = code;
        }
    }

    getErrorCode() {
        return ErrorCode;
    }

    setErrorMsg(msg) {
        if (msg != null && msg.length > 0) {
            ErrorMsg = msg;
        }
    }

    getErrorMsg() {
        return ErrorMsg;
    }

}