import React from 'react';
import { connect } from 'react-redux';
import { UserTypeEnum } from '../../../helper/Enum';
import IGlobalState from '../../../interfaces/IGlobalState';
import IVoter from '../../../interfaces/IVoter';
import { setFinalScore } from '../../../redux/session/session.actions';
import { getActiveUserStory, getSelectedSession } from '../../../redux/session/session.selectors';
import FinalScoreForm from './FinalScoreForm/FinalScoreForm';
import IScrumMasterPanelProps from './interface/IScrumMasterPanelProps';
import './ScrumMasterPanel.scss';
export class ScrumMasterPanel extends React.Component<IScrumMasterPanelProps, any> {
    render() {
        const { activeUserStory } = this.props;
        return (
            <div className="scrumMasterPanel">
                <div className="storyDetail">
                    <div className="panelName">Scrum Master Panel</div>
                    <div className="detailBox">
                        <div className="storyName">{activeUserStory && activeUserStory.storyName}</div>
                        <div className="voterList">{this.renderVoters()}</div>
                    </div>
                    <div className="text-center">{this.renderDownBlock()}</div>
                </div>
            </div>
        );
    }

    // TODO Refactor if have time
    renderVoters = (): React.ReactNode => {
        const { activeUserStory, selectedSession } = this.props;
        if (selectedSession && activeUserStory) {
            return (
                <ul>
                    {selectedSession.developers.map((developerId: string, index: number) => (
                        <li key={developerId}>
                            Voter-{index + 1} : {this.getVoteNumber(developerId)}
                        </li>
                    ))}
                    <li>Scrum Master : {this.getVoteNumber(UserTypeEnum.SCRUM_MASTER)}</li>
                </ul>
            );
        }
    };

    getVoteNumber = (developerId: string): string => {
        const { activeUserStory, selectedSession } = this.props;
        if (activeUserStory && activeUserStory.voters && selectedSession) {
            const voter: IVoter | undefined = activeUserStory.voters.find(x => x.voterName === developerId);
            if (activeUserStory.voters.length === Number(selectedSession.numberOfVoters) + 1) {
                if (voter && voter.storyPoint) return voter.storyPoint.toString();
                else if (voter && !voter.storyPoint) return '?';
            }
            if (voter) return 'Voted';
        }
        return 'Not Voted';
    };

    renderDownBlock = (): React.ReactNode => {
        const { activeUserStory, selectedSession } = this.props;
        if (activeUserStory) {
            if (
                selectedSession &&
                activeUserStory.voters &&
                activeUserStory.voters.length === Number(selectedSession.numberOfVoters) + 1
            ) {
                return <FinalScoreForm onSubmit={this.setFinalScore} activeUserStory={activeUserStory} />;
            }
            return <div>You can not end voting till each teammate voted</div>;
        }
        return <div>SESSION ENDED</div>;
    };

    setFinalScore = (values: any): void => {
        this.props.setFinalScore(values.finalScore);
    };
}

const mapStateToProps = (state: IGlobalState) => ({
    activeUserStory: getActiveUserStory(state),
    selectedSession: getSelectedSession(state),
});

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        setFinalScore: (finalScore: string) => {
            dispatch(setFinalScore(finalScore));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScrumMasterPanel);
