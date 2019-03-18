import React from 'react';
import { createUser } from '../action';
import { connect } from 'react-redux'
import Form from './Form'
import Header from './Header';
import { toastr } from 'react-redux-toastr';
import history from './History';


class SignupForm extends React.Component {
    
    
    state = { flag: true }

    //onSubmit method will invoke when user submited form
    //"createUser" action Creator calls from here and the page waiting for the response.
    onSubmit = (formValues, ref) => {
        formValues.role = 'author';
        this.props.createUser(formValues, (res) => {
            if (res.status === 200) {
                ref();
                toastr.success(`Signup Successfully`);
                history.push('/');
            }
            else {
                toastr.error(`Something Went Wrong`, 'may be Username or Email already exist');
                this.setState({ flag: false });
            }
        });
    }

    //main render method which call the "Form" component to render the registration form.
    render() {
        if (localStorage.getItem("IsLogedIn") === 'false') {
            return (<div>
                <Header propName='Login' />
                <h2 style={{ textAlign: 'center' }}>Signup</h2>
                <Form onSubmit={this.onSubmit} />
            </div>);
        } else {
            history.push('/Dashboard');
            return (
                <div></div>
            )
        }


    }
}

export default connect(null, { createUser })(SignupForm);




