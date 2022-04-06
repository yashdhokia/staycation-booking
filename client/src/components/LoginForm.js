const LoginForm = ({
  handleSubmit,

  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group p-3">
      <label className="form-label" style={{ fontWeight: "bold" }}>
        Email Address
      </label>
      <input
        type="email"
        className="form-control"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group p-3 ">
      <label className="form-label " style={{ fontWeight: "bold" }}>
        Password
      </label>
      <input
        type="password"
        className="form-control"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className=" text-center">
      <button disabled={!email || !password} className="btn btn-primary">
        submit
      </button>
    </div>
  </form>
);

export default LoginForm;
