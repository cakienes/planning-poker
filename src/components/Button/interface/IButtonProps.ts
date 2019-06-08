export default interface IButtonProps {
    label?: string;
    onClick?: () => void;
    type: 'submit' | 'reset' | 'button';
}
