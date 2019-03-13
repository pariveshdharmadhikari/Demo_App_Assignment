import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css';
import { fetchPosts, deletePost } from '../action';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import '../css/Loader.css';
import DetailsPopup from './DetailsPopup';
import DeletePopup from './DeletePopup';
import Header from './Header'
import '../css/Form.css'

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

    filterTitle(sentence){
        var result = sentence.substr(0,15);
        return result;
    }

    //metthod used to show the deletePopup
    renderDeletePopup = (id) => {
        this.setState({ popupState: true, postid: id });
    }

    //method to show detail Popup
    renderDetailPopup = (selectedpost) => {
        this.setState({ detailPopupState: true, selectedpost: selectedpost });
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
                const rendertitle=_this.filterTitle(post.title.rendered);
                const description = _this.strip_html_tags(post.excerpt.rendered)
                return (
                    <div className='item formmargin' key={index}>
                        {_this.renderbutton(post.author, post.id)}
                        <i className='large middle aligned icon user' />
                        <div className='content'  >
                            <div className='header ontitleclick' onClick={() => this.renderDetailPopup(post)}>
                                {rendertitle}
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

    //It Render the whole JSX including renderlist.
    renderDashBoard() {
        const name = localStorage.getItem("Username")
        const temp = (name.charAt(0)).toUpperCase();
        if (localStorage.getItem("IsLogedIn") === 'true') {
            return (
                <div>
                    <Header propName='Dashboard' temp={temp} />
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
        const { selectedpost, detailPopupState, popupState, postid } = this.state;
        return (
            <div>
                {this.state.detailPopupState && <DetailsPopup
                    cancelPopup={this.cancelPopup}
                    selectedpost={selectedpost}
                    striptag={this.strip_html_tags}
                    detailPopupState={detailPopupState}
                />}

                {this.state.popupState && <DeletePopup
                    popupState={popupState}
                    cancelPopup={this.cancelPopup}
                    postid={postid}
                />}

                {this.renderDashBoard()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(Dashboard)