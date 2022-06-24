interface IProps {
  children: JSX.Element;
}

export default function CardTopImages(props: IProps) {
  return <div className="card-img-bottom">{props.children}</div>;
}
