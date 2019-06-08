import React from 'react';
import { Link } from 'react-router-dom';
import ILinkBoxProps from './interface/ILinkBoxProps';
import './LinkBox.scss';
const LinkBox: React.FC<ILinkBoxProps> = ({ to, text }) => {
    return (
        <Link to={to} className="linkBox">
            {text}
        </Link>
    );
};
export default LinkBox;
