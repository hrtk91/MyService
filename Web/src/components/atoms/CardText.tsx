interface IProps {
  children: JSX.Element;
}

export default function CardText(props: IProps) {
  return <p className="card-text">{props.children}</p>;
}
