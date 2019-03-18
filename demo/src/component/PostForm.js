import React from 'react'
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css'
import '../css/Form.css'
class CreatePost extends React.Component {

    //Textarea for every Field
    renderField = ({ input, placeholder,label, type, meta: { touched, error, warning } }) => (
        <div>
            <label>{label}</label>
            <div>
                <textarea {...input} placeholder={placeholder} type={type} />
                {touched && (error && <span className='errormessage' >{error}</span>)}
            </div>
        </div>
    )

    //Input for every field
    renderInput = ({ input, label, type, maxLength, placeholder, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={placeholder} type={type} maxLength={maxLength} />
                {touched && (error && <span className='errormessage' >{error}</span>)}
            </div>
        </div>
    )

    //invokes callback onSubmit function.
    onSubmit = (values) => {
        this.refs.btn.setAttribute("disabled", "disabled");
        this.props.onSubmit(values);
    }


    status = ['publish', 'future', 'draft', 'pending', 'private']
    //render DropdownList.
    renderDropdownList = ({ input, data, valueField, textField,label }) => {
        return (
            <div>   
                <label>{label}</label>
                <DropdownList {...input}
        
                    data={data}
                    valueField={valueField}
                    textField={textField}
                    onChange={input.onChange}
                    defaultValue={input.name}
                /></div>
        );
    }

    //Main render Method.
    render() {
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Post</h2>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formBody formmargin '>
                    <div className='ui form error'>
                        <div className='field'>
                            <Field
                                name="title"
                                type="text"
                                component={this.renderInput}
                                label="Title"
                                maxLength="15"
                                placeholder="Enter title"
                            />
                        </div>
                        <div className='field'>
                            <Field name="content" component={this.renderField} label="Description" placeholder='Enter Description within 200 characters' />
                        </div>

                        <div className='field'>
                            <Field
                                name="status"
                                component={this.renderDropdownList}
                                data={this.status}
                                valueField="value"
                                textField="type" 
                                label="Status"
                                />
                        </div>
                        <div className='field'>
                            <button className='ui secondary button' type="button" disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>
                                Clear Values
                            </button>
                            <button name='submitbutton' ref='btn' className='ui primary button' type="submit" disabled={this.props.submitting}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

//perform validation for Post Form
const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Title is required'
    } else if (values.title.length > 15) {
        errors.title = 'Must be 15 characters or less'
    }
    if (!values.content) {
        errors.content = 'Description is required'
    } else if (values.content.length > 200) {
        errors.content = "must be 200 characters or less";
    }
    return errors
}



export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    initialValues: {
        status: 'publish'
    }
})(CreatePost)



