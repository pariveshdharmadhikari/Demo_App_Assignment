import React from 'react'
import { Field, reduxForm } from 'redux-form';
import '../css/Form.css';

class Form extends React.Component {

    //It Will invoke when validation mistake happens in form.
    //It will return the JSX according to the validation error.
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='error message'>
                    <div className="errormessage">{error}</div>
                </div>
            );
        }
    }

    //renderInput method returns the JSX for every Field Component.
    renderInput = ({ input, type, label, meta, maxLength, placeholder}) => {
        return (
            <div className='field'>
                <label>{label}</label>
                <input {...input} type={type} maxLength={maxLength} placeholder={placeholder}/>
                {this.renderError(meta)}
            </div>
        )
    }

    //onSubmit method invoke the callback onSubmit function.
    onSubmit = (formValues) => {
        const _this = this;
        this.props.onSubmit(formValues, () => {
            _this.refs.btn.setAttribute("disabled", "disabled");
        })

    }

   

    //main render method.
    render() {
        const pass="password must contain both Uppercase & Lowercase, special character and number. Example:- Abc@123"
        return (
            <form className="ui form error formmargin " onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="first_name" type="text" component={this.renderInput} label="First Name" placeholder='Enter first name' />
                <Field name="last_name" type="text" component={this.renderInput} label="Last Name" placeholder='Enter last name' />
                <Field name="email" type="text" component={this.renderInput} label="E-mail" placeholder='Enter email address' />
                <Field name="username" type="text" component={this.renderInput} label="Username" placeholder='Enter username' />
                <Field name="password" type="password" component={this.renderInput} label="Password" placeholder={pass} />
                <Field name="ConfirmPassword" type="password" component={this.renderInput} label="Confirm Password" placeholder='Confirm password'/>
                <button ref='btn' className="ui button primary">Submit</button>
            </form>
        );
    }
}

//validate method performs validation task on form.
const validate = (formValues) => {
    const errors = {}

    if (!formValues.first_name) {
        errors.first_name = 'First name is must required'
    } else if (formValues.first_name.length > 30) {
        errors.first_name = 'Length must be less than 30'
    }

    if (!formValues.last_name) {
        errors.last_name = 'Last name is must required'
    } else if (formValues.last_name.length > 30) {
        errors.last_name = 'Length must be less than 30'
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
    } else if (formValues.email.length > 50) {
        errors.email = 'Length must be less than 50'
    }

    if (!formValues.username) {
        errors.username = 'Username is must required'
    } else if (formValues.username.length < 6) {
        errors.username = 'Minimum length is 6 character'
    } else if (formValues.username.length > 20) {
        errors.username = 'Maximum length is 20 character'
    }

    if (!formValues.password) {
        errors.password = 'Password is must required'
    } else if (formValues.password.length < 6) {
        errors.password = 'Minimum length is 6 character'
    } else if (formValues.password.length > 20) {
        errors.password = 'Length must be less than 20'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/i.test(formValues.password)) {
        errors.password = 'Password must be Strong'
    }

    if (!formValues.ConfirmPassword) {
        errors.ConfirmPassword = 'Password confirmation must required';
    } else if (formValues.ConfirmPassword !== formValues.password) {
        errors.ConfirmPassword = 'Password and confirm password did not matched';
    }

    return errors;
}

const wrapedform = reduxForm({
    form: 'Form',
    validate
})(Form);


export default wrapedform;
