import React from 'react'
import { connect } from "react-redux";
import ArticleListActions from '../../services/actions/ArticleListActions'
import { Spinner, Card, Pagination, Button, Modal } from 'react-bootstrap'
import { ModalArticle, ModalArticleAdd } from '../index'
import classNames from './articlelist.module.css'
class ArticleListScene extends React.Component {
    state = {
        modalAddingShow: false,
    }

    componentDidMount = () => {
        this.getArticles()
    }
    getArticles = () => {
        this.props.showLoader()
        let params = this.getLimitOffset()
        this.props.loadArticleList(params).then((e) => {
            console.log('первый зен', e);
            if (e.status === 200) {
                console.log(e.data)
                this.props.setArticles(e.data)
                this.props.unshowLoader()
            }
        })
    }
    getLimitOffset = () => {
        return {
            limit: this.props.limit,
            offset: (this.props.page - 1) * this.props.limit
        }
    }
    pageChangeHandler = async (page) => {
        await this.props.setPage(page)
        this.getArticles()
    }

    modalAddingOpenHandler = () => {
        this.setState({ modalAddingShow: true })
    }
    modalAddingCloseHandler = () => {
        this.setState({ modalAddingShow: false })
    }
    getPagination = () => {
        let items = []
        for (let number = 1; number <= this.props.count; number++) {
            items.push(
                <Pagination.Item onClick={() => this.pageChangeHandler(number)} key={number} active={number === this.props.page}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items
    }
    render() {
        if (this.props.loader) {
            return (<div className={`${classNames.spinner} align-items-center container-fluid d-flex justify-content-center mt-4`}>
                <Spinner animation="border" variant="primary" />
            </div>)
        }
        else {
            console.log('ВЫВОД СТАТЕЙ', this.props.articles, this.props.loader); return (
                <div className={`${classNames.mainContainer} d-flex flex-column`}>
                    <div className='mb-4'><h1>Сохраненные статьи</h1></div>
                    {this.props.articles.map(
                        (item, index) => {
                            return (<div className='mb-2' key={`article-list-item-${index}`}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{item['name']}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{item['publication_date']}</Card.Subtitle>
                                        <Card.Text>
                                            {item['description']}
                                        </Card.Text>
                                        <Card.Link onClick={() => { this.props.openModalArticleHandler(item['id']) }} style={{ cursor: "pointer" }}>Перейти к статье</Card.Link>
                                        <Card.Link onClick={() => { this.props.deleteArticle(item['id']); this.getArticles() }} style={{ cursor: "pointer" }}>Удалить статью</Card.Link>
                                    </Card.Body>
                                </Card>
                            </div>)
                        }
                    )}
                    <Pagination>{this.getPagination()}</Pagination>
                    <Button onClick={this.modalAddingOpenHandler}>Добавить статью</Button>
                    <Modal 
                        aria-labelledby="contained-modal-title-vcenter"
                        centered 
                        show={this.props.modalOpen}
                        onHide={this.props.closeModalArticleHardler}>
                        <ModalArticle articleId={this.props.selectedArticleId} />
                    </Modal>
                    <Modal show={this.state.modalAddingShow} onHide={this.modalAddingCloseHandler}>
                        <ModalArticleAdd />
                    </Modal>
                </div>

            )
        }
    }
}
const mapStateToProps = state => ({
    loader: state.articleListReducers.articleListReducer.loader,
    articles: state.articleListReducers.articleListReducer.articles,
    modalOpen: state.articleListReducers.articleListReducer.modalOpen,
    page: state.articleListReducers.articleListReducer.page,
    limit: state.articleListReducers.articleListReducer.limit,
    count: state.articleListReducers.articleListReducer.count_pages,
    selectedArticleId: state.articleListReducers.articleListReducer.selectedArticle,
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => { return dispatch({ type: 'ARTICLE_LIST_LOADER_SHOW' }) },
    unshowLoader: () => { return dispatch({ type: 'ARTICLE_LIST_LOADER_UNSHOW' }) },
    setArticles: val => { return dispatch({ type: 'SET_ARTICLE_LIST', value: val }) },
    setPage: val => { return dispatch({ type: 'SET_ARTICLE_LIST_PAGE', value: val }) },
    loadArticleList: (params) => {
        return dispatch(ArticleListActions.getArticleList(params))
    },
    openModalArticleHandler: (val) => { return dispatch({ type: 'ARTICLE_MODAL_SET_OPENED', value: val }) },
    closeModalArticleHardler: () => { return dispatch({ type: 'ARTICLE_MODAL_SET_CLOSED' }) },
    deleteArticle: (val) => { return dispatch(ArticleListActions.deleteArticle(val)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(ArticleListScene)