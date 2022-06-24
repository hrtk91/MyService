interface IProps {
  children: JSX.Element;
}

export default function CardFooter(props: IProps) {
  return <div className="card-footer">{props.children}</div>;
}
