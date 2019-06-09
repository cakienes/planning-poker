import React from 'react';
import IFibonacciBoxProps from './interface/IFibonacciBoxProps';

export class FibonacciBox extends React.Component<IFibonacciBoxProps, any> {
    render() {
        const { fibonacciNumber, storyPoint } = this.props;
        return (
            <li
                className={`col-3 ${storyPoint === fibonacciNumber ? 'selected' : undefined}`}
                onClick={this.onClickFibonacci}
            >
                <span>{fibonacciNumber || '?'}</span>
            </li>
        );
    }

    onClickFibonacci = (): void => {
        const { fibonacciNumber } = this.props;
        this.props.giveStoryPoint(fibonacciNumber);
    };
}

export default FibonacciBox;
