interface IProps {
  children: JSX.Element[] | JSX.Element;
}

export default function CardTopImages(props: IProps) {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return <div className="card-img-bottom">{children}</div>;
}
