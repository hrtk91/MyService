import React, { FormEvent, useEffect, useState } from "react";
import Carousel from "../molecules/Carousel";

interface IProps {
  onChange?: (files: File[]) => Promise<void>;
  onSubmit?: (file: File[]) => Promise<void>;
}

export default function UploadForm(props: IProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const fileInput = React.createRef<HTMLInputElement>();

  const onChange = () => {
    const files = [...(fileInput?.current?.files ?? [])];
    setFiles(files);

    const fileUrls = files.map((file) =>
      (URL || webkitURL).createObjectURL(file)
    );
    setFileUrls(fileUrls);

    props.onChange?.(files);
  };
  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (files.length !== 0) {
      props.onSubmit?.(files);
    } else {
      alert("ファイルが選択されていません。");
    }
  };

  useEffect(() => {
    return function cleanup() {
      fileUrls?.map((URL || webkitURL).revokeObjectURL);
    };
  }, [fileUrls]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label className="form-label">ファイルを選択してください。</label>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            accept="image/png, image/jpeg"
            ref={fileInput}
            onChange={onChange}
            multiple
          />
          <button className="btn btn-primary">投稿</button>
        </div>
      </form>
      <Carousel itemUrls={fileUrls} />
    </div>
  );
}
