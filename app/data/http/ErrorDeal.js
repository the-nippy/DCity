/**
 * 将传入的错误码产生对应的Error对象
 */

import Error from './Error';

//let局部变量不能export
const Unknown_Error = 0; //未知错误
const NetWork_Error = 1;    //网络请求错误


let BAD_REQUEST = 400;  //地址不存在
let UNAUTHORIZED = 401; //未授权
let FORBIDDEN = 403;    //禁止访问
let NOT_FOUND = 404;    //资源不存在
let INTERNAL_ERROR = 500;   //内部错误

class ErrorDeal {

    static getError(code) {
        let error = new Error();
        if (code != null && typeof code == 'number') {
            error.setErrorCode(code);
        }
        switch (code) {
            case BAD_REQUEST:
                error.setErrorMsg('地址不存在');
                break;
            case NetWork_Error:
                error.setErrorMsg('网络请求错误,请检查网络')
                break;
            case UNAUTHORIZED:
                error.setErrorMsg("未授权");
                break;
            case FORBIDDEN:
                error.setErrorMsg("禁止访问");
                break;
            case NOT_FOUND:
                error.setErrorMsg("资源不存在");
                break;
            case INTERNAL_ERROR:
                error.setErrorMsg("内部错误");
                break;
            case Unknown_Error:
                error.setErrorMsg("未知错误");
                break;
        }

        return error;
    }

}

export {NetWork_Error, Unknown_Error, ErrorDeal};

