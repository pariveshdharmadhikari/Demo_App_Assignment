import React from 'react'
import PostForm from './PostForm';
import { updatePost, fetchPost } from '../action';
import { connect } from 'react-redux';
import _ from 'lodash'
import { toastr } from 'react-redux-toastr';
import history from '../History';
import { Link } from 'react-router-dom';



class EditPost extends React.Component {
    state = { post: '' }
    componentWillMount() {
        this.props.fetchPost(this.props.match.params.id, (res) => {
            this.setState({ post: res })
        })
    }

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
    strip_html_tags(str) {
        if ((str === null) || (str === ''))
            return '';
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    initiateForm = () => {
        const { post } = this.state;
        console.log(post, "initiate");
        const content = this.strip_html_tags(post.content.rendered);
        const initialvalues = {
            "title": post.title.rendered,
            "content": content,
            "status": post.status
        };
        return (
            <div>
                <div className=" ui secondary pointing menu" >
                    <div className="right menu" >
                        <Link to="/Dashboard" className="item" >Back to DashBoard</Link>
                    </div>
                </div>
                <PostForm
                    initialValues={_.pick(initialvalues, 'title', 'content', 'status')}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }

    render() {
        console.log(localStorage.getItem('IsLogedIn'),'ikufghldsfkdsjds');
        if (localStorage.getItem('IsLogedIn')) {
            if (this.state.post !== '') {
                return (
                    <div>
                        {this.initiateForm()}
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h2>
                            Loading...
                        </h2>
                    </div>
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
    console.log(state.posts, 'map state to props');
    return { post: state.posts }
}

export default connect(mapStateToProps, { updatePost, fetchPost })(EditPost);