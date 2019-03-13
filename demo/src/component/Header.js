import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Form.css'
import { toastr } from 'react-redux-toastr';

//This is function component which returns the header as JSX.
class Header extends React.Component{
    
    onLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem("IsLogedIn", false);
        toastr.info('Logout Successfully');
    }

    render(){
        const {propName} = this.props;
        if (propName === 'Login') {
            return (
                <div className=" ui secondary pointing menu" >
                    <div className="right menu effect" >
                        <Link to="/" className="item" >{propName}</Link>
                    </div>
                </div>
            );
        }else if (propName === 'Signup') {
            return (
                <div className=" ui secondary pointing menu" >
                    <div className="right menu effect" >
                        <Link to="/signup" className="item" >{propName}</Link>
                    </div>
                </div>
            )
        } else if (propName === 'Dashboard') {
            return (
                <div className=" ui secondary pointing menu" >
                    <div className="right menu" >
                        <Link to="/EditProfile">
                            <div className="avatar-circle" >
                                <span className="initials" ><div className='character' >{this.props.temp}</div></span>
                            </div></Link>
                        <Link to="/CreatePost" className="item" >Create Post</Link>
                        <Link to="/" onClick={this.onLogout} className="item" >LogOut</Link>
                    </div>
                </div>
            );
        }else if(propName === 'Back'){
            return(
                <div className=" ui secondary pointing menu" >
                    <div className="right menu" >
                        <Link to="/Dashboard" className="item" >Back to DashBoard</Link>
                    </div>
                </div>
            )
        }
    }
    

}

export default Header;