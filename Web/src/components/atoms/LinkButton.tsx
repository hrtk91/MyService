import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

interface IProps {
  children: JSX.Element[] | JSX.Element | string;
  to?: string;
  state?: unknown;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  color?: string;
  outline?: boolean;
}

export default function LinkButton(props: IProps) {
  const navigate = useNavigate();
  const onClick =
    props.to != null
      ? () => navigate(props.to!, { state: props.state })
      : props.onClick;
  return (
    <Button
      className={props.className}
      color={props.color}
      outline={props.outline}
      onClick={onClick}
    >
      {props.children}
    </Button>
  );
}
