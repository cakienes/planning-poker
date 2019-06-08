import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '../../../../components/Button/Button';
import FormFields from '../../../../components/FormFields/FormFields';
import { onlyNumber, required } from '../../../../helper/Validation';
import IGlobalState from '../../../../interfaces/IGlobalState';
import { getActiveUserStory } from '../../../../redux/session/session.selectors';
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
const mapStateToProps = (state: IGlobalState) => ({
    activeUserStory: getActiveUserStory(state),
});

export default connect(
    mapStateToProps,
    null,
)(
    reduxForm<{}, any>({
        form: 'finalScoreForm',
    })(FinalScoreForm),
);
