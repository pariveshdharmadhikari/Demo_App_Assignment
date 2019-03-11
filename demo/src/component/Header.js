import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className=" ui secondary pointing menu" >

            <div className="right menu" >
                <Link to="/" className="item" >Login</Link>
                <Link to="/Signup" className="item" >Signup</Link>
                {/* <GoogleAuth /> */}
                {/* <Link to="" className="" ></Link>
                    Header*/}
            </div>
        </div>
    );
}

export default Header;