import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import { fetchPosts, deletePost } from '../action';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Modal from 'react-responsive-modal';

class Dashboard extends React.Component {
    state = { data: undefined, popupState: false, postid: '' }

    componentWillMount() {
        if (localStorage.getItem('IsLogedIn') === 'true') {

            this.props.fetchPosts((res) => {
                this.setState({ data: res.data })
            });
        }
    }

    onLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem("IsLogedIn", false);
        toastr.info('Logout Successfully');
    }

    strip_html_tags(str) {
        if ((str === null) || (str === ''))
            return '';
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    trimByWord(sentence) {
        if (sentence !== '') {
            var result = sentence;
            var resultArray = result.split(' ');
            if (resultArray.length > 16) {
                resultArray = resultArray.slice(0, 16);
                result = resultArray.join(' ') + '…';
            }
            return result;
        }
    }

    renderPopup = (id) => {
        this.setState({ popupState: true, postid: id });
    }

    renderbutton = (uid, id) => {
        const userid = localStorage.getItem('userid');
        if (uid.toString() === userid) {
            return (
                <div className='right floated content'>
                    <Link to={`/EditPost/${id}`} ><button className='ui primary button' >Edit</button></Link>
                    <button className='ui negative button' onClick={() => this.renderPopup(id)} >Delete</button>
                </div>
            );
        }
    }

    renderlist = () => {
        if (this.props.posts !== []) {
            const _this = this;
            return this.props.posts.map((post, index) => {
                const description = _this.strip_html_tags(post.excerpt.rendered)
                return (
                    <div className='item' key={index}>
                        {_this.renderbutton(post.author, post.id)}
                        <i className='large middle aligned icon user' />
                        <div className='content'>
                            <div className='header' >
                                {post.title.rendered}
                            </div>
                            <div className='description'>

                                {this.trimByWord(description)}
                            </div>
                        </div>
                    </div>
                );
            })
        }
        else {
            return (
                <div>
                    <h2 style={{ textAlign: 'center' }}>Loading...</h2>
                </div>
            );
        }
    }

    deletePost = () => {
        this.refs.delbtn.setAttribute("disabled", "disabled");
        this.props.deletePost(this.state.postid, (res) => {
            
            if (res.status === 200) {
                this.setState({ popupState: false });
                toastr.warning("Waiting For Deleting Post","Deleting...")
                setTimeout(function(){ window.location.reload() }, 3000);
                
                    
                
          
            }
            else {
                this.setState({ popupState: false });
                toastr.error("something went wrong");
            }
        })
    }

    cancelDelete = () => {
        this.setState({ popupState: false });
    }

    deletePopup() {
        const { popupState } = this.state;
        return (
            <div>
                <Modal open={popupState} center showCloseIcon={false} >
                    <h2>Confirm to delete this post?</h2>
                    <button className='ui button' onClick={this.cancelDelete}>CANCEL</button>
                    <button ref="delbtn" className='ui negative button' onClick={this.deletePost}>DELETE</button>
                </Modal>
            </div>
        );
    }

    renderDashBoard() {
        const name = localStorage.getItem("Username")
        const temp = (name.charAt(0)).toUpperCase();
        console.log(localStorage.getItem("IsLogedIn"), 'renderdashboard');
        if (localStorage.getItem("IsLogedIn") === 'true') {
            return (
                <div>
                    <div className=" ui secondary pointing menu" >
                        <div className="right menu" >
                            <Link to="/EditProfile">
                                <div className="avatar-circle" >
                                    <span className="initials" ><div className='character' >{temp}</div></span>
                                </div></Link>
                            <Link to="/CreatePost" className="item" >Create Post</Link>
                            <Link to="/" onClick={this.onLogout} className="item" >LogOut</Link>
                        </div>
                    </div>
                    <div>
                        <h2 style={{ textAlign: 'center' }}>POST LIST</h2>
                        <div className='ui celled list' >
                            {this.renderlist()}
                        </div>
                    </div>
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

    render() {

        return (
            <div>
                {this.state.popupState && this.deletePopup()}
                {this.renderDashBoard()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(Dashboard)