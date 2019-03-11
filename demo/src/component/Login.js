import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, fetchPosts } from '../action'
import history from '../History'
import { toastr } from 'react-redux-toastr';
import Header from './Header';
class Login extends React.Component {
    state = { flag: false }



    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='error message'>
                    <div className="errormessage">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, type, meta, maxLength }) => {
        return (

            <div className='field'>
                <div>
                    <label>{label}</label>
                    <input {...input} type={type} maxLength={maxLength} />
                </div>
                {this.renderError(meta)}
            </div>
        )
    }




    onSubmit = (formValues) => {
        this.props.login(formValues, (res) => {
            if (res.status === 200) {
                toastr.success(`Welcome ${res.data.user_display_name}`, 'Login Successfully');
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("IsLogedIn", true);
                localStorage.setItem("Username", res.data.user_display_name);
                localStorage.setItem('userid',res.data.user_id);
                history.push('/Dashboard');
            }
            else {
                toastr.error('Login Failed', `Invalid username or Password`);
            }
        });
    }

    render() {
        return (
            <div>
                <Header />
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <form className="ui form error formmargin " onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="username" component={this.renderInput} label="Username" maxLength='20' />
                    <Field name="password" type='password' component={this.renderInput} label="Password" maxLength='20' />
                    <button className="ui button primary " style={{ alignContent: 'right' }}>Login</button> 
                    <Link to='/Signup'><button className="ui button">Create Account</button></Link>
                </form>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.username) {
        errors.username = 'you must Enter UserName'
    }
    if (!formValues.password) {
        errors.password = 'you must Enter Password'
    }
    return errors;
}



const wrapedform = reduxForm({
    form: 'LoginForm',
    validate
})(Login);

export default connect(null, { login, fetchPosts })(wrapedform);


