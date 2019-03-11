import React from 'react'
import PostForm from './PostForm';
import { createPost } from '../action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../History';
import { toastr } from 'react-redux-toastr';

class CreatePost extends React.Component {

    onSubmit = (formvalues) => {

        this.props.createPost(formvalues, (res) => {
            console.log(res);
            history.push('/Dashboard');
            toastr.success("Post Added Successfully")
            formvalues ={}
        });


    }
    onLogout = () => {
        localStorage.removeItem("IsLogedIn");
        localStorage.removeItem('Userid');
        this.setState({ flag: false })
    }

    render() {
        if (localStorage.getItem("IsLogedIn")) {
            return (
                <div>
                    <div className=" ui secondary pointing menu" >
                        <div className="right menu" >
                            <Link to="/Dashboard" className="item" >Back to DashBoard</Link>
                            <Link to="/" onClick={this.onLogout} className="item" >LogOut</Link>

                        </div>
                    </div>
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