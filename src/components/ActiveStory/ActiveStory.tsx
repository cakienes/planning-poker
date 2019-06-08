import React from 'react';
import { UserTypeEnum } from '../../helper/Enum';
import IVoter from '../../interfaces/IVoter';
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
                        {storyPoint === -1 ? 'Please Vote!' : (!storyPoint ? '?' : storyPoint) + ' Voted'}
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
                <li className={`col-3 ${!storyPoint ? 'selected' : undefined}`} onClick={() => this.giveStoryPoint()}>
                    <span>?</span>
                </li>
            </ul>
        );
    };

    giveStoryPoint = (value?: number): void => {
        const { type } = this.props;
        if (type) {
            this.props.giveStoryPoint(type, value);
        }
    };

    getMyStoryPoint = (): number => {
        const { activeUserStory, developerId } = this.props;

        if (activeUserStory && activeUserStory.voters) {
            const voter: IVoter | undefined = activeUserStory.voters.find(
                x => x.voterName === (developerId || UserTypeEnum.SCRUM_MASTER),
            );
            if (voter) return voter.storyPoint;
        }
        return -1;
    };
}

export default ActiveStory;
