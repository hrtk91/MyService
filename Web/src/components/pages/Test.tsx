import HttpClient from "../../models/HttpClient";
interface IProps {
  httpClient: HttpClient;
}

export default function Test(props: IProps) {
  const client = props.httpClient;
  const onClick = async (): Promise<void> => {
    try {
      const res = await client.get("app/test").then((res) => res.data);
      alert(res);
    } catch (ex) {
      console.table(ex);
      alert("testに失敗しましたー");
    }
  };

  return (
    <div>
      <h1>Test</h1>
      <button type="button" onClick={onClick}>
        てすと
      </button>
    </div>
  );
}
