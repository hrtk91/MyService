interface IProps {
  text: string;
  headerText?: string;
  footerText?: string;
  topImages?: string[];
  bottomImages?: string[];
}

export default function Card(props: IProps) {
  return (
    <div className="card">
      {props.headerText ? (
        <div className="card-header">{props.headerText}</div>
      ) : (
        <></>
      )}
      {props.topImages?.map((picUrl, idx) => (
        <img className="card-img-bottom" key={idx} src={picUrl} />
      ))}
      <div className="card-body">
        <p className="card-text">{props.text}</p>
      </div>
      {props.bottomImages?.map((picUrl, idx) => (
        <img className="card-img-bottom" key={idx} src={picUrl} />
      ))}
      {props.footerText ? (
        <div className="card-header">{props.footerText}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
