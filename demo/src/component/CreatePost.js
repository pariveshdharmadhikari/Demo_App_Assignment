import React from 'react'
import PostForm from './PostForm';
import { createPost } from '../action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from './History';
import { toastr } from 'react-redux-toastr';
import Header from './Header';

class CreatePost extends React.Component {

    //onSubmit Invoke when user submited the Create Post form.
    onSubmit = (formvalues) => {
        this.props.createPost(formvalues, (res) => {
            history.push('/Dashboard');
            toastr.success("Post Added Successfully")
            formvalues ={}
        });
    }

    //Perform the functionality of logout through LocalStorage
    onLogout = () => {
        localStorage.removeItem("IsLogedIn");
        localStorage.removeItem('Userid');
        this.setState({ flag: false })
    }

    //Main render method which render the form from PostForm component.
    render() {
        if (localStorage.getItem("IsLogedIn")==='true') {
            return (
                <div>
                    <Header propName='Back'/>
                    <PostForm onSubmit={this.onSubmit} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className=" ui secondary pointing menu" >
                        <div className="right menu" >
                            <Link to="/" className="item" >Login</Link>
                        </div>
                    </div>
                    <h2 style={{ textAlign: 'center' }}>Please Login First</h2>
                </div>
            );
        }
    }
}

export default connect(null, { createPost })(CreatePost);