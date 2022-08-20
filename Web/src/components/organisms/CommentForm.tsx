import { ChangeEvent, useState } from "react";
import { Button, InputGroup } from "reactstrap";
import { useApiClient } from "../../context";

interface IProps {
  articleId: string;
  onAfterPost?: () => void;
}

export default function CommentForm(props: IProps) {
  const [input, setInput] = useState("");
  const apiClient = useApiClient();

  const onChangeText = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setInput(value);
  };

  const onClickButton = async () => {
    const baseUrl = "article/comment";
    await apiClient.post(baseUrl, {
      articleId: props.articleId,
      content: input,
    });
    setInput("");
    props.onAfterPost?.();
  };

  return (
    <InputGroup>
      <input
        className="form-control"
        type="text"
        onChange={onChangeText}
        value={input}
      ></input>
      <Button color="primary" type="button" onClick={onClickButton}>
        投稿
      </Button>
    </InputGroup>
  );
}
