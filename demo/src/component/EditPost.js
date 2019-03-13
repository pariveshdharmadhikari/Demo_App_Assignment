import React from 'react'
import PostForm from './PostForm';
import { updatePost, fetchPost } from '../action';
import { connect } from 'react-redux';
import _ from 'lodash'
import { toastr } from 'react-redux-toastr';
import history from '../History';
import '../css/Loader.css';
import Header from './Header';

class EditPost extends React.Component {

    state = { post: '' }

    //use to  fetch initiate value from API of selected Post and set it to state.
    //It uses fetchPost action creator.
    componentWillMount() {
        if (localStorage.getItem('IsLogedIn')=== 'true'){
            this.props.fetchPost(this.props.match.params.id, (res) => {
                this.setState({ post: res })
            })
        }   
    }

    //Invoke when user submitted edited post.
    //It uses updatePost action creator. 
    onSubmit = (formvalues) => {
        const { id } = this.props.match.params;
        this.props.updatePost(id, formvalues, (res) => {
            if (res.status === 200) {
                toastr.success('Done', "Post updated successfully");
                history.push('/Dashboard');
            }
            else {
                toastr.error('Something Went Wrong', "Please try again");
            }
        });
    }

    //This method taked a paragraph as a argument.
    //Return string with removing html tags. 
    strip_html_tags(str) {
        if ((str === null) || (str === ''))
            return '';
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    //this will set initial value to the PostForm component.
    initiateForm = () => {
        const { post } = this.state;
        const content = this.strip_html_tags(post.content.rendered);
        const initialvalues = {
            "title": post.title.rendered,
            "content": content,
            "status": post.status
        };
        return (
            <div>
                <Header propName='Back'/>
                <PostForm
                    initialValues={_.pick(initialvalues, 'title', 'content', 'status')}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }

    //main render method.
    render() {
        console.log(localStorage.getItem('IsLogedIn'),'kdhsgfksfhgs')
        if (localStorage.getItem('IsLogedIn')=== 'true') {
            if (this.state.post !== '') {
                return (
                    <div>
                        {this.initiateForm()}
                    </div>
                );
            }
            else {
                return (
                    <div className="loader"></div>
                )
            }
        }
        else {
            return (
                <div>
                    <h2 style={{ textAlign: 'center' }}>Must Login First</h2>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { post: state.posts }
}

export default connect(mapStateToProps, { updatePost, fetchPost })(EditPost);