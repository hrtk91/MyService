interface IProps {
  children: JSX.Element[];
}

export default function Carousel(props: IProps) {
  const id = [...Array(10)]
    .map(() => {
      const num = Math.floor(Math.random() * 15 - 1);
      return "0123456789abcdef".substring(num, num + 1);
    })
    .reduce((pre, cur) => pre + cur);

  return (
    <div
      id={`carouselControls-${id}`}
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {props.children.map((elem, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            {elem}
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {props.children?.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target={`#carouselControls-${id}`}
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current="true"
          ></button>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#carouselControls-${id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#carouselControls-${id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
