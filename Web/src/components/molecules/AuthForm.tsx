interface IProps {
  defaultId?: string | undefined;
  defaultPassword?: string | undefined;
  onChangeId?: (value: string) => void | undefined;
  onChangePassword?: (value: string) => void | undefined;
  onClickSubmit?: () => Promise<void> | undefined;
}

export default function AuthForm(props: IProps) {
  return (
    <div>
      <div>
        <label className="form-label">ID</label>
        <input
          className="form-control"
          type="text"
          defaultValue={props.defaultId ?? ""}
          onChange={(ev) => props.onChangeId?.(ev.target.value)}
        />
      </div>
      <div>
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          defaultValue={props.defaultPassword ?? ""}
          onChange={(ev) => props.onChangePassword?.(ev.target.value)}
        />
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary form-control"
          type="button"
          onClick={async () => await props.onClickSubmit?.()}
        >
          送信
        </button>
      </div>
    </div>
  );
}
