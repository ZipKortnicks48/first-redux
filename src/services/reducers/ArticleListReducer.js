import {combineReducers} from 'redux';
import ArticleListActions from '../actions/ArticleListActions'
import {createHttpRequestReducer} from '../utils/createHttpRequestReducer'
const INITIAL_STATE = {
    loader: false,
    singleArticleLoader:false,
    getAuthorsLoader:false,

    modalOpen:false,

    articles:[],
    
    selectedArticle:0,
    limit:3,
    page:1,
    count_pages:1
};

const articleListReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ARTICLE_MODAL_SET_OPENED':
            return {...state,modalOpen:true,selectedArticle:action.value}

        case 'ARTICLE_MODAL_SET_CLOSED':
            return {...state,modalOpen:false,selectedArticle:0}

        case 'ARTICLE_LIST_LOADER_SHOW':  
            return {...state,loader:true}  

        case 'ARTICLE_LIST_LOADER_UNSHOW':  
            return {...state,loader:false}  
        
        case 'SET_SINGLE_ARTICLE_LOADER_SHOW':
            return {...state,singleArticleLoader:true}
    
        case 'SET_SINGLE_ARTICLE_LOADER_UNSHOW':
            return {...state,singleArticleLoader:false}    

        case 'GET_AUTHORS_LOADER_SHOW':
            return {...state,getAuthorsLoader:true}
    
        case 'GET_AUHTORS_LOADER_UNSHOW':
            return {...state,getAuthorsLoader:false}

        case 'SET_ARTICLE_LIST':
            return {...state,
                articles:action.value.results,
                count_pages:Math.ceil(action.value.count/state.limit)
            }

        case 'SET_ARTICLE_LIST_PAGE':
            return {...state,page:action.value}

        

        default:
            return state
        
    }
}

const getArticleList = createHttpRequestReducer(
    ArticleListActions.ARTICLE_LIST_REQUESTED,
    ArticleListActions.ARTICLE_LIST_RECEIVED,
    ArticleListActions.ARTICLE_LIST_ERROR,
    []
);

const getSingleArticle=createHttpRequestReducer(
    ArticleListActions.ARTICLE_SINGLE_REQUESTED,
    ArticleListActions.ARTICLE_SINGLE_RECEIVED,
    ArticleListActions.ARTICLE_SINGLE_ERROR,
    []
)

const deleteArticle=createHttpRequestReducer(
    ArticleListActions.DELETE_ARTICLE_REQUESTED,
    ArticleListActions.DELETE_ARTICLE_RECEIVED,
    ArticleListActions.DELETE_ARTICLE_ERROR,
    []
)

const addArticle=createHttpRequestReducer(
    ArticleListActions.ADD_ARTICLE_REQUESTED,
    ArticleListActions.ADD_ARTICLE_RECEIVED,
    ArticleListActions.ADD_ARTICLE_ERROR,
    []
)

const getAuthors=createHttpRequestReducer(
    ArticleListActions.GET_AUTHORS_REQUESTED,
    ArticleListActions.GET_AUTHORS_RECEIVED,
    ArticleListActions.GET_AUTHORS_ERROR,
    []
)

const articleListReducers = combineReducers({
    getArticleList,
    getSingleArticle,
    articleListReducer,
    deleteArticle,
    addArticle,
    getAuthors,
});

export default articleListReducers;