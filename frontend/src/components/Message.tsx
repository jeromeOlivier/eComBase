import { Alert } from "react-bootstrap";
import { ReactNode } from "react";

interface MessageProps {
  variant?: string;
  children?: ReactNode;
}

const Message = ({ variant = "info", children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
