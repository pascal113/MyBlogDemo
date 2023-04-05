import {take, call, put,select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as NewArticleActionTypes} from '../reducers/adminManagerNewArticle'

export function* saveArticle(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        let id = yield select(state=>state.admin.newArticle.id);
        if(id){
            data.id = id;
            return yield call(post, '/admin/article/updateArticle', data);
        }else{
            return yield call(post, '/admin/article/addArticle', data);
        }

    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Network request error', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* saveArticleFlow() {
    while (true) {
        let request = yield take(NewArticleActionTypes.SAVE_ARTICLE);
        if (request.data.title === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Please input title', msgType: 0});
        } else if (request.data.content === "") {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Please input content', msgType: 0});
        } else if (request.data.tags.length === 0) {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: 'Please input type', msgType: 0});
        }
        if (request.data.title && request.data.content && request.data.tags.length > 0) {
            let res = yield call(saveArticle, request.data);
            if (res) {
                if (res.code === 0) {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
                    setTimeout(function () {
                        location.replace('/admin/managerArticle');
                    }, 1000);
                } else if (res.message === 'Information is out. Please retry input.') {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                    setTimeout(function () {
                        location.replace('/');
                    }, 1000);
                } else {
                    yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
                }
            }
        }
    }
}