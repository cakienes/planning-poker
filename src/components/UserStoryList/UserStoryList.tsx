import React from 'react';
import IUserStory from '../../interfaces/IUserStory';
import IUserStoryListProps from './interface/IUserStoryListProps';
import './UserStoryList.scss';

export class UserStoryList extends React.Component<IUserStoryListProps, any> {
    render() {
        return (
            <div className="userStoryList">
                <div className="pageTitle">Story List</div>
                <table>
                    <thead>
                        <tr>
                            <th>Story</th>
                            <th>Story Point</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>
                </table>
            </div>
        );
    }

    renderTableData = (): React.ReactNode => {
        const { selectedSession } = this.props;

        if (selectedSession && selectedSession.userStories.length > 0) {
            return selectedSession.userStories.map((userStory: IUserStory, index: number) => {
                return (
                    <tr key={index}>
                        <td>{userStory.storyName}</td>
                        <td>{userStory.storyPoint}</td>
                        <td>{userStory.status}</td>
                    </tr>
                );
            });
        }
    };
}

export default UserStoryList;
