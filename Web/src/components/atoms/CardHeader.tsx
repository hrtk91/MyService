interface IProps {
  children: JSX.Element;
}

export default function CardHeader(props: IProps) {
  return <div className="card-header">{props.children}</div>;
}
