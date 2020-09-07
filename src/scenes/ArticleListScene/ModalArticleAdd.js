import React from 'react'
import { connect } from "react-redux"
import { Field, reduxForm } from 'redux-form';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap'
import ArticleListActions from '../../services/actions/ArticleListActions'
class ModalArticleAdd extends React.PureComponent {
    state = {
        data: [],
        showAlert: false,
        alertText: '',
        successAlert: true,
        buttonLoader: false,
    }
    componentDidMount = () => {
        this.loadAuthors()
    }
    loadAuthors = () => {
        this.props.showLoader()
        this.props.loadAuthors().then(
            async (e) => {
                if (e.status === 200) {
                    console.log(e.data)
                    await this.setState({ data: e.data.results })
                    this.props.unshowLoader()
                }
            }
        )

    }
    createArticle = async () => {
        await this.setState({ buttonLoader: true })
        this.props.createArticle(
            this.props.formData
        ).then(
            (e) => {
                if (e.status === 201) {
                    this.setState({ buttonLoader: false, alertText: "Статья создана!", showAlert: true, successAlert: true })
                } else {

                    this.setState({ buttonLoader: false, alertText: e.message, showAlert: true, successAlert: false })
                }
            },
            (e) => {
                this.setState({ buttonLoader: false, alertText: e.message, showAlert: true, successAlert: false })
            }
        )
    }
    render() {
        if (this.props.loader) {
            return (<div className={`align-items-center container-fluid d-flex justify-content-center mt-4`}>
                <Spinner animation="border" variant="primary" />
            </div>)
        } else return (<React.Fragment>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление статьи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Введите название</p>
                    <Field name='name' component="input" />
                    <p>Введите описание</p>
                    <Field name='description' component="input" />
                    <p>Введите текст статьи</p>
                    <Field name='text' component="textarea" />
                    <p>Выберите автора</p>
                    <Field name='author' component="select">
                        {
                            <React.Fragment>
                                <option key={`option-authors-modal--1`} value={-1}>автор не выбран</option>
                                {this.state.data.map(
                                    (item, index) => {
                                        return <option key={`option-authors-modal-${index}`} value={item['id']}>{item['name']}</option>
                                    }
                                )}
                            </React.Fragment>
                        }
                    </Field>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.showAlert && <Alert variant={this.state.successAlert ? 'success' : 'danger'} dismissible onClose={() => { this.setState({ showAlert: false }) }}>
                        {this.state.alertText}
                    </Alert>}
                    <Button onClick={this.createArticle}>
                        {this.state.buttonLoader ? <Spinner /> : `Создать статью`}
                    </Button>
                </Modal.Footer>
            </form>

        </React.Fragment>)
    }
}


ModalArticleAdd = reduxForm({
    form: 'modalArticleAdd',
    destroyOnUnmount: false
})(ModalArticleAdd);

const mapStateToProps = state => ({
    formData: state.form.modalArticleAdd ? state.form.modalArticleAdd.values : null,
    loader: state.articleListReducers.articleListReducer.singleArticleLoader,

});



const mapDispatchToProps = dispatch => ({
    showLoader: () => { return dispatch({ type: 'GET_AUHTORS_LOADER_SHOW' }) },
    unshowLoader: () => { return dispatch({ type: 'GET_AUTHORS_LOADER_UNSHOW' }) },
    loadAuthors: (id) => {
        return dispatch(ArticleListActions.getAuthors())
    },
    createArticle: (data) => {
        return dispatch(ArticleListActions.addArticle(data))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalArticleAdd)