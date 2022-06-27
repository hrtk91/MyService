interface IProps {
  children: JSX.Element;
}

export default function Card(props: IProps) {
  return <div className="card h-100">{props.children}</div>;
}
