import axios from "axios";
import { useState } from "react";

type Token = {
  token: string;
};

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const signin = async (): Promise<void> => {
    try {
      const token: Token = await axios
        .post("http://localhost:5200/api/account/signin", {
          id: id,
          password: password,
        })
        .then((res) => res.data());

      alert(token.token);

      setId("");
      setPassword("");
    } catch (ex) {
      console.table(ex);
      alert("サインインに失敗しました。もう一度やり直してください。");
    }
  };

  return (
    <div>
      <div>
        <label className="form-label">ID</label>
        <input
          className="form-control"
          type="text"
          value={id}
          onChange={(ev) => setId(ev.target.value)}
        />
      </div>
      <div>
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary form-control"
          type="button"
          onClick={signin}
        >
          送信
        </button>
      </div>
    </div>
  );
}
