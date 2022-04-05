const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group p-3">
      <label className="form-label">Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group p-3">
      <label className="form-label">Email Address</label>
      <input
        type="email"
        className="form-control"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group p-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button disabled={!name || !email || !password} className="btn btn-primary">
      submit
    </button>
  </form>
);

export default RegisterForm;
