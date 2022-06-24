interface IProps {
  children: JSX.Element;
}

export default function Card(props: IProps) {
  return <div className="card">{props.children}</div>;
}
