import React from 'react'
import { connect } from "react-redux";
import { Modal, Button, Spinner } from 'react-bootstrap'
import ArticleListActions from '../../services/actions/ArticleListActions'
class ModalArticle extends React.Component {
    state = {
        data: {}
    }
    componentDidMount = () => {
        this.getOneArticle()
    }
    getOneArticle = () => {
        this.props.showLoader()
        this.props.loadArticle(this.props.articleId).then(
            async (e) => {
                if (e.status === 200) {
                    console.log('Данные по статье',e.data)
                    await this.setState({data:e.data})
                    this.props.unshowLoader()
                }
            }
        )

    }
    render() {
        
        if (this.props.loader) {return (<div className={`align-items-center container-fluid d-flex justify-content-center mt-4`}>
            <Spinner animation="border" variant="primary" />
        </div>) } else return (<React.Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{this.state.data.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{this.state.data.text}</p>
            </Modal.Body>

        </React.Fragment>)
    }
}
const mapStateToProps = state => ({
    loader: state.articleListReducers.articleListReducer.singleArticleLoader,
});

const mapDispatchToProps = dispatch => ({
    showLoader: () => { return dispatch({ type: 'SET_SINGLE_ARTICLE_LOADER_SHOW' }) },
    unshowLoader: () => { return dispatch({ type: 'SET_SINGLE_ARTICLE_LOADER_UNSHOW' }) },
    loadArticle: (id) => {
        return dispatch(ArticleListActions.getSingleArticle(id))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalArticle)