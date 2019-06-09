import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../../../../components/Button/Button';
import FormFields from '../../../../components/FormFields/FormFields';
import { onlyNumber, required } from '../../../../helper/Validation';
import IFinalScoreFormProps from './interface/IFinalScoreFormProps';

export const FinalScoreForm: React.FC<IFinalScoreFormProps> = ({ handleSubmit, activeUserStory }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
                <div className="col-8 ">
                    <Field name="finalScore" component={FormFields} type="number" validate={[required, onlyNumber]} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Button label={`End Voting For ${activeUserStory && activeUserStory.storyName}`} type="submit" />
                </div>
            </div>
        </form>
    );
};

export default reduxForm<{}, any>({
    form: 'finalScoreForm',
})(FinalScoreForm);
