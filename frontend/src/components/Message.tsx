// Purpose: Create a message component to display alerts to the user.
// external imports
// bootstrap
import { Alert } from "react-bootstrap";
// react
import { ReactNode } from "react";

interface MessageProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  children?: ReactNode;
}

const Message = ({ variant = "info", children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
