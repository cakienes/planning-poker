import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../../../components/Button/Button';
import FormFields from '../../../components/FormFields/FormFields';
import './CreateSessionForm.scss';
import ICreateSessionFormProps from './interface/ICreateSessionFormProps';

export const CreateSessionForm = (props: ICreateSessionFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <Field name="sessionName" label="Session Name: " component={FormFields} type="text" />
                </div>
                <div className="col-6">
                    <Field name="numberOfVoters" label="Number of Voters: " component={FormFields} type="text" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Field
                        name="userStories"
                        label="Paste your story list (Each line will be converted as a story): "
                        component={FormFields}
                        type="textarea"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="buttonHolder">
                        <Button label="Start Session" type="submit" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'createSessionForm',
})(CreateSessionForm);
