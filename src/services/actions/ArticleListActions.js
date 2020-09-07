import {createHttpRequestReducer} from "../utils/createHttpRequestReducer";
import {createHttpRequestActionBundle} from "../utils/createHttpActionBundle";

export default class ArticleListActions {
    static ARTICLE_LIST_REQUESTED = 'ARTICLE_LIST_REQUESTED';
    static ARTICLE_LIST_RECEIVED = 'ARTICLE_LIST_RECEIVED';
    static ARTICLE_LIST_ERROR = 'ARTICLE_LIST_ERROR';

    static getArticleList(params) {
        return createHttpRequestActionBundle({
                method: 'get',
                url: 'articles/',
                timeout: 200000,
                responseType: 'json',
                params:params,
            },
            ArticleListActions.ARTICLE_LIST_REQUESTED,
            ArticleListActions.ARTICLE_LIST_RECEIVED,
            ArticleListActions.ARTICLE_LIST_ERROR
        )();
    }

    static ARTICLE_SINGLE_REQUESTED='ARTICLE_SINGLE_REQUESTED'
    static ARTICLE_SINGLE_RECEIVED='ARTICLE_SINGLE_RECEIVED'
    static ARTICLE_SINGLE_ERROR='ARTICLE_SINGLE_ERROR'

    static getSingleArticle(articleId){
        return createHttpRequestActionBundle({
            method:'get',
            url:`articles/${articleId}`,
            timeout:200000,
            responseType:'json',
        },
            ArticleListActions.ARTICLE_SINGLE_REQUESTED,
            ArticleListActions.ARTICLE_SINGLE_RECEIVED,
            ArticleListActions.ARTICLE_SINGLE_ERROR
    )();
    }

    static DELETE_ARTICLE_REQUESTED='DELETE_ARTICLE_REQUESTED'
    static DELETE_ARTICLE_RECEIVED='DELETE_ARTICLE_RECEIVED'
    static DELETE_ARTICLE_ERROR='DELETE_ARTICLE_ERROR'

    static deleteArticle(articleId){
        return createHttpRequestActionBundle({
            method:'delete',
            url:`articles/${articleId}`,
            timeout:200000,
            responseType:'json',
        },
            ArticleListActions.DELETE_ARTICLE_REQUESTED,
            ArticleListActions.DELETE_ARTICLE_RECEIVED,
            ArticleListActions.DELETE_ARTICLE_ERROR
    )();
    }

    static ADD_ARTICLE_REQUESTED='ADD_ARTICLE_REQUESTED'
    static ADD_ARTICLE_RECEIVED='ADD_ARTICLE_RECEIVED'
    static ADD_ARTICLE_ERROR='ADD_ARTICLE_ERROR'

    static addArticle(requestData){
        return createHttpRequestActionBundle({
            method:'post',
            url:`articles/`,
            timeout:200000,
            responseType:'json',
            data:requestData,
        },
            ArticleListActions.ADD_ARTICLE_REQUESTED,
            ArticleListActions.ADD_ARTICLE_RECEIVED,
            ArticleListActions.ADD_ARTICLE_ERROR
    )();
    }

    static GET_AUTHORS_REQUESTED='GET_AUTHORS_REQUESTED'
    static GET_AUTHORS_RECEIVED='GET_AUTHORS_RECEIVED'
    static GET_AUTHORS_ERROR='GET_AUTHORS_ERROR'

    static getAuthors(){
        return createHttpRequestActionBundle({
            method:'get',
            url:`authors/`,
            timeout:200000,
            responseType:'json',
        },
            ArticleListActions.GET_AUTHORS_REQUESTED,
            ArticleListActions.GET_AUTHORS_RECEIVED,
            ArticleListActions.GET_AUTHORS_ERROR
    )();
    }
}