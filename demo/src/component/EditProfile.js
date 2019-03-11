import React from 'react';
import Form from './Form';
import {updateUserInfo} from '../action'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class EditProfile extends React.Component{
    
onSubmit=()=>{
        this.props.updateUserInfo(localStorage.getItem('Userid'),(res)=>{
            console.log(res,'<<======= willmount of editprofile');
        });
    }
    
    render(){
        return(
            <div>
                <div className=" ui secondary pointing menu" >
                    <div className="right menu" >
                        <Link to="/Dashboard" className="item" >Back to DashBoard</Link>
                    </div>
                </div>
                <h3 style={{ textAlign: 'center' }}>Edit Profile</h3>
                <Form onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null,{updateUserInfo})(EditProfile);