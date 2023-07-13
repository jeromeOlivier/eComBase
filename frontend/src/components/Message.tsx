import { Alert } from "react-bootstrap";

interface MessageProps {
  variant?: string;
  children?: React.ReactNode;
}

const Message = ({ variant = "info", children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
