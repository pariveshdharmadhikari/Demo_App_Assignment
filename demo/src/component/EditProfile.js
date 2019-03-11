import React from 'react';
import Form from './Form';
import {updateUserInfo} from '../action'
import {connect} from 'react-redux';

class EditProfile extends React.Component{
    
    componentWillMount(){
        
    }

    onSubmit=()=>{
        this.props.updateUserInfo(localStorage.getItem('Userid'),(res)=>{
            console.log(res,'<<======= willmount of editprofile');
        });
    }
    
    render(){
        return(
            <div>
                <h2 style={{ textAlign: 'center' }}>Edit Profile</h2>
                <Form onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null,{updateUserInfo})(EditProfile);