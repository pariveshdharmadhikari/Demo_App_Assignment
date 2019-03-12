import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import { fetchPosts, deletePost } from '../action';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Modal from 'react-responsive-modal';
import '../css/Loader.css';

class Dashboard extends React.Component {
    state = {
        data: undefined,
        popupState: false,
        postid: '',
        detailPopupState: false,
        selectedpost: {}
    }

    //used to initiate the dashboard with our POST lists
    //It uses fetchPosts Action Creator.
    componentWillMount() {
        if (localStorage.getItem('IsLogedIn') === 'true') {
            this.props.fetchPosts((res) => {
                if (res.status === 200) {
                    this.setState({ data: res.data })
                }
                else {
                    toastr.error("Something went wrong");
                }
            });
        }
    }

    //used to maintain login-logout session. with help of localstorage.
    onLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem("IsLogedIn", false);
        toastr.info('Logout Successfully');
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

    //method return string with N number of words and then ...
    trimByWord(sentence) {
        var result = sentence;
        var resultArray = result.split(' ');
        if (resultArray.length > 12) {
            resultArray = resultArray.slice(0, 12);
            result = resultArray.join(' ') + '…';
        }
        return result;

    }

    //metthod used to show the deletePopup
    renderDeletePopup = (id) => {
        this.setState({ popupState: true, postid: id });
    }

    //delete Popup
    deletePopup() {
        const { popupState } = this.state;
        return (
            <div>
                <Modal open={popupState} onClose={()=>{}} center showCloseIcon={false} >
                    <h2>Confirm to delete this post?</h2>
                    <button className='ui button' onClick={this.cancelPopup}>CANCEL</button>
                    <button ref="delbtn" className='ui negative button' onClick={this.deletePost}>DELETE</button>
                </Modal>
            </div>
        );
    }

    //method to show detail Popup
    renderDetailPopup = (selectedpost) => {
        this.setState({ detailPopupState: true, selectedpost: selectedpost });
    }

    //detail Popup
    detailPopup() {
        const { detailPopupState } = this.state;
        const { title, content, status } = this.state.selectedpost;
        const filteredcontent = this.strip_html_tags(content.rendered);
        return (
            <div>
                <Modal open={detailPopupState} onClose={()=>{}} center showCloseIcon={false} >
                    <h2>Details...</h2>
                    <hr></hr>
                    <div className='ui mmodal' >
                        <div className="header">
                            <strong>TITLE :- </strong>
                            <span>{title.rendered}</span>
                        </div>
                        <hr></hr>
                        <div className='content'>
                            <strong>CONTENT :- </strong>
                            <span>{filteredcontent}</span>
                        </div>
                        <hr></hr>
                        <div className="content" >
                            <strong>STATUS :- </strong>
                            <span>{status}</span>
                        </div>
                    </div>
                    <hr></hr>
                    <button className='ui button' onClick={this.cancelPopup}>CANCEL</button>
                </Modal>
            </div>
        );
    }

    //it hides the models.
    cancelPopup = () => {
        this.setState({ popupState: false, detailPopupState: false });
    }

    //It shows the EDIT & DELETE button if the post created by loged-in user.  
    renderbutton = (uid, id) => {
        const userid = localStorage.getItem('userid');
        if (uid.toString() === userid) {
            return (
                <div className='right floated content'>
                    <Link to={`/EditPost/${id}`} ><button className='ui primary button' >Edit</button></Link>
                    <button className='ui negative button' onClick={() => this.renderDeletePopup(id)} >Delete</button>
                </div>
            );
        }
    }

    //It show the list of all posts .
    renderlist = () => {
        if (this.props.posts !== []) {
            const _this = this;
            return this.props.posts.map((post, index) => {
                const description = _this.strip_html_tags(post.excerpt.rendered)
                return (
                    <div className='item' key={index}>
                        {_this.renderbutton(post.author, post.id)}
                        <i className='large middle aligned icon user' />
                        <div className='content'  >
                            <div className='header ontitleclick' onClick={() => this.renderDetailPopup(post)}>
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

    //It perform the functionality to delete the post
    //It uses deletePost Action Creator.
    deletePost = () => {
        this.refs.delbtn.setAttribute("disabled", "disabled");
        this.props.deletePost(this.state.postid, (res) => {

            if (res.status === 200) {
                this.setState({ popupState: false });
                toastr.warning("Waiting For Deleting Post", "Deleting...")
                setTimeout(function () { window.location.reload() }, 3000);
            }
            else {
                this.setState({ popupState: false });
                toastr.error("something went wrong");
            }
        })
    }

    //It Render the whole JSX including renderlist.
    renderDashBoard() {
        const name = localStorage.getItem("Username")
        const temp = (name.charAt(0)).toUpperCase();
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

    //Main render method
    render() {
        return (
            <div>
                {this.state.detailPopupState && this.detailPopup()}
                {this.state.popupState && this.deletePopup()}
                {this.renderDashBoard()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(Dashboard)