import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import IGlobalState from '../../../interfaces/IGlobalState';
import IVoter from '../../../interfaces/IVoter';
import { giveStoryPoint } from '../../../redux/session/session.actions';
import { getActiveUserStory, getSelectedSession } from '../../../redux/session/session.selectors';
import './ActiveStory.scss';
import IActiveStoryProps from './interface/IActiveStoryProps';

const fibonacciNumbers: number[] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134];
export class ActiveStory extends React.Component<IActiveStoryProps, any> {
    render() {
        const { activeUserStory } = this.props;
        const storyPoint = this.getMyStoryPoint();
        return (
            <div className="activeStory">
                <div className="pageTitle">Active Story</div>
                <div className="storyPoint">
                    <div className="storyName">{activeUserStory && activeUserStory.storyName}</div>
                    <div className="storyPointList">
                        <ul className="row">{this.renderFibonacciNumbers()}</ul>
                    </div>
                    <div className="voteNumber">
                        {!storyPoint ? 'Please Vote!' : (storyPoint === 1000 ? '?' : storyPoint) + ' Voted'}
                    </div>
                </div>
            </div>
        );
    }

    renderFibonacciNumbers = (): React.ReactNode => {
        const storyPoint = this.getMyStoryPoint();
        return (
            <ul className="row">
                {fibonacciNumbers.map((x: number) => (
                    <li
                        className={`col-3 ${storyPoint === x ? 'selected' : undefined}`}
                        onClick={() => this.giveStoryPoint(x)}
                        key={x}
                    >
                        <span>{x}</span>
                    </li>
                ))}
                <li
                    className={`col-3 ${storyPoint === 1000 ? 'selected' : undefined}`}
                    onClick={() => this.giveStoryPoint(1000)}
                >
                    <span>?</span>
                </li>
            </ul>
        );
    };

    giveStoryPoint = (value: number): void => {
        const { match } = this.props;
        if (match && match.params && match.params.voteFor) {
            this.props.giveStoryPoint(match.params.voteFor, value);
        }
    };

    getMyStoryPoint = (): number | string | undefined => {
        const {
            activeUserStory,
            match: {
                params: { voteFor },
            },
        } = this.props;
        if (activeUserStory && activeUserStory.voters && voteFor) {
            const voter: IVoter | undefined = activeUserStory.voters.find(x => x.voterName === voteFor.toUpperCase());
            if (voter) return voter.storyPoint;
            return undefined;
        }
        return -1;
    };
}

const mapStateToProps = (state: IGlobalState) => ({
    activeUserStory: getActiveUserStory(state),
    selectedSession: getSelectedSession(state),
});

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        giveStoryPoint: (voterName: string, storyPoint: number) => {
            dispatch(giveStoryPoint(voterName, storyPoint));
        },
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ActiveStory),
);
