function AuthHeader({ logo, header, subHead }) {
  return (
    <>
      {" "}
      <img src={logo} alt="logo" className="my-5" />
      <h1 className="text-2xl font-extrabold">{header}</h1>
      <p className="my-2 text-sm text-center">{subHead}</p>
    </>
  );
}

export default AuthHeader;
