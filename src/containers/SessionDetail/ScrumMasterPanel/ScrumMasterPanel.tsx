import React from 'react';
import { connect } from 'react-redux';
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
            </div>
        );
    }

    renderVoters = (): React.ReactNode => {
        const { activeUserStory, selectedSession } = this.props;
        if (selectedSession && activeUserStory) {
            const array: string[] = [];
            for (let index = 1; index < Number(selectedSession.numberOfVoters) + 1; index++) {
                array.push(`Voter-${index}`);
            }
            return (
                <ul>
                    {array.map((voter: string) => (
                        <li key={voter}>
                            {voter} : {this.getVoteNumber(voter)}
                        </li>
                    ))}
                    <li>Scrum Master : 22</li>
                </ul>
            );
        }
    };

    getVoteNumber = (voterName: string): string => {
        const { activeUserStory } = this.props;
        if (activeUserStory && activeUserStory.voters) {
            const voter: IVoter | undefined = activeUserStory.voters.find(x => x.voterName === voterName.toUpperCase());
            if (voter && voter.storyPoint !== 1000) return voter.storyPoint.toString();
            else if (voter && voter.storyPoint === 1000) return '?';
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
