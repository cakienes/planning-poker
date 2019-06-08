import React from 'react';
import { connect } from 'react-redux';
import { UserTypeEnum } from '../../../helper/Enum';
import IGlobalState from '../../../interfaces/IGlobalState';
import IVoter from '../../../interfaces/IVoter';
import { getActiveUserStory, getSelectedSession } from '../../../redux/session/session.selectors';
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
                </div>
                <input />
            </div>
        );
    }

    renderVoters = (): React.ReactNode => {
        const { activeUserStory, selectedSession } = this.props;
        if (selectedSession && activeUserStory) {
            const array: number[] = [];
            for (let index = 1; index < selectedSession.developers.length + 1; index++) {
                array.push(index);
            }
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
                if (voter && voter.storyPoint !== 1000) return voter.storyPoint.toString();
                else if (voter && voter.storyPoint === 1000) return '?';
            }
            if (voter) return 'Voted';
            else return 'Not Voted';
        }
        return 'Not Voted';
    };
}

const mapStateToProps = (state: IGlobalState) => ({
    activeUserStory: getActiveUserStory(state),
    selectedSession: getSelectedSession(state),
});

export default connect(
    mapStateToProps,
    null,
)(ScrumMasterPanel);
