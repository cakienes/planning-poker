export default interface IFibonacciBoxProps {
    storyPoint?: number;
    fibonacciNumber: number;

    giveStoryPoint: (fibonacciNumber: number) => void;
}
