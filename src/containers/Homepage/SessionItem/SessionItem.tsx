import React from 'react';
import LinkBox from '../../../components/LinkBox/LinkBox';
import ISessionItemProps from './interface/ISessionItemProps';
const SessionItem: React.FC<ISessionItemProps> = ({ session }) => {
    return <LinkBox to={`/session/${session.id}`} text={session.sessionName} />;
};
export default SessionItem;
