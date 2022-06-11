import { useEffect, useState } from "react";

interface IProps {
  files: File[];
}
export default function Carousel(props: IProps) {
  const files = props.files;
  const [itemUrls, setItemUrls] = useState<string[]>(
    files.map((file) => (URL || webkitURL).createObjectURL(file))
  );

  useEffect(() => {
    setItemUrls(files.map((file) => (URL || webkitURL).createObjectURL(file)));
    return function cleanup() {
      itemUrls?.map((URL || webkitURL).revokeObjectURL);
    };
  }, [props.files]);

  return (
    <div
      id="carouselControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {itemUrls?.map((_url, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#carouselControls"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current="true"
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {itemUrls?.map((url, idx) => (
          <div
            key={idx}
            className={`carousel-item bg-secondary ${
              idx === 0 ? "active" : ""
            }`}
          >
            <img
              src={url}
              className="d-block w-auto ms-auto me-auto"
              height={"500vh"}
            ></img>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
