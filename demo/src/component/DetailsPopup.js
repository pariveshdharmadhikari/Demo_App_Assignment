import React from 'react'
import Modal from 'react-responsive-modal';

class DetailsPopup extends React.Component {
    render() {
        const { detailPopupState,cancelPopup,striptag,selectedpost} = this.props;
        const { title, content, status } = selectedpost;
        const filteredcontent = striptag(content.rendered);
        return (
            <div>
                <Modal open={detailPopupState} onClose={() => { }} center showCloseIcon={false} >
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
                    <button className='ui button' onClick={cancelPopup}>CANCEL</button>
                </Modal>
            </div>
        );
    }
}

export default DetailsPopup;