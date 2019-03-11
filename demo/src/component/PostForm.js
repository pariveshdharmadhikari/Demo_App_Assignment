import React from 'react'
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css'
class CreatePost extends React.Component {

    //const { handleSubmit, pristine, reset, submitting } = props
    renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <div>
            <label>{label}</label>
            <div>
                <textarea {...input} placeholder={label} type={type} />
                {touched && (error && <span className='errormessage' >{error}</span>)}
            </div>
        </div>
    )

    renderInput = ({ input, label, type,maxLength, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} maxLength={maxLength} />
                {touched && (error && <span className='errormessage' >{error}</span>)}
            </div>
        </div>
    )

    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
    
    status = [ 'publish', 'future', 'draft', 'pending', 'private', 'private' ]

    renderDropdownList = ({ input, data, valueField, textField }) =>
    <div>    
        <DropdownList {...input}
           data={data}
            valueField={valueField}
            textField={textField}
            onChange={input.onChange} 
            defaultValue={input.name}
            /></div>

    render() {
        
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Create Post</h2>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='formBody'>
                    <div className='ui form error'>
                        <div className='field'>
                            <Field
                                name="title"
                                type="text"
                                component={this.renderInput}
                                label="Title"
                                maxLength="15"
                            />
                        </div>
                        <div className='field'>
                            <Field name="content" component={this.renderField} label="Description" />
                        </div>

                        <div className='field'>
                            <Field
                                name="status"
                                component={this.renderDropdownList}
                                data={this.status}
                                valueField="value"
                                textField="type" />
                        </div>



                        <div className='field'>
                            <button className='ui secondary button' type="button" disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>
                                Clear Values
                    </button>
                            <button className='ui primary button' type="submit" disabled={this.props.submitting}>
                                Submit
                    </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length > 15) {
        errors.title = 'Must be 15 characters or less'
    }
    if (!values.content) {
        errors.content = 'Required'
    }
    return errors
}



export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    initialValues:{
    status:'publish'
    }
})(CreatePost)



