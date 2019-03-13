import React from 'react';
import Modal from 'react-responsive-modal';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { deletePost } from '../action';

class DeletePopup extends React.Component {

    deletePost = () => {
        this.props.deletePost(this.props.postid, (res) => {
            if (res.status === 200) {
                this.refs.delbtn.setAttribute("disabled", "disabled");   
                this.props.cancelPopup();
                toastr.warning("Waiting For Deleting Post", "Deleting...")
                setTimeout(function () { window.location.reload() }, 3000);
            }
            else {
                this.props.cancelPopup();
                toastr.error("something went wrong");
            }
        })
    }
    
    render() {
        const { popupState, cancelPopup } = this.props
        return (
            <div>
                <Modal open={popupState} onClose={() => { }} center showCloseIcon={false} >
                    <h2>Confirm to delete this post?</h2>
                    <button className='ui button' onClick={cancelPopup}>CANCEL</button>
                    <button ref='delbtn' className='ui negative button' onClick={this.deletePost}>DELETE</button>
                </Modal>
            </div>
        );


    }
}

export default connect(null,{deletePost})(DeletePopup);