import React from 'react'
import { Field, reduxForm } from 'redux-form';
import '../css/Form.css';

class Form extends React.Component {


    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='error message'>
                    <div className="errormessage">{error}</div>
                </div>
            );
        }
    }

    

    renderInput = ({ input, type,label, meta ,maxLength}) => {
        return (

            <div className='field'>
                <label>{label}</label>
                <input {...input} type={type} maxLength={maxLength} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error formmargin " onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="first_name" type="text" component={this.renderInput} label="First Name" />
                <Field name="last_name" type="text" component={this.renderInput} label="Last Name"/>
                <Field name="email" type="text" component={this.renderInput} label="E-mail" />
                <Field name="username" type="text" component={this.renderInput} label="UserName" />
                <Field name="password" type="password" component={this.renderInput} label="Password" />
                <Field name="ConfirmPassword" type="password" component={this.renderInput} label="ConfirmPassword" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.first_name) {
        errors.first_name = 'you must Enter Title'
    }else if (formValues.first_name.length >30 ) {
        errors.first_name = 'length must be less than 30'
    }

    if (!formValues.last_name) {
        errors.last_name = 'you must Enter Description'
    }else if (formValues.last_name.length >30 ) {
        errors.last_name = 'length must be less than 30'
    }


    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(formValues.email)) {
        errors.email = 'Enter Valid Email'
    }else if (formValues.email.length >50 ) {
        errors.email = 'length must be less than 50'
    }

    if (!/^[a-zA-Z0-9]/i.test(formValues.username)) {
        errors.username = 'Only Alfanumeric value will aceepted'
    }

    if (!formValues.password) {
        errors.password = 'you must Enter Password'
    }else if(formValues.password.length<6){
        errors.password = 'Minimum length is 6 character'
    }else if (formValues.password.length >20 ) {
        errors.username = 'length must be less than 20'
    }

    if (!formValues.ConfirmPassword) {
        errors.ConfirmPassword = 'Please Re-Enter Password';
    } else if (formValues.ConfirmPassword !== formValues.password) {
        errors.ConfirmPassword = 'Password mismatched';
    }

    return errors;
}

const wrapedform = reduxForm({
    form: 'Form',
    validate
})(Form);


export default wrapedform;
