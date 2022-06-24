interface IProps {
  children: JSX.Element;
}

export default function CardBody(props: IProps) {
  return <div className="card-body">{props.children}</div>;
}
