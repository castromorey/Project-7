import { useState } from "react";

const validate = (data) => {
  const errors = {};

  if (!data.email) errors.email = "Must enter your email";
  if (!data.password) errors.password = "Must enter your password";

  return errors;
};

const SignIn = ({ submit }) => {
  const [data, setData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = ({ target }) =>
    setData({ ...data, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(data);
    setFormErrors({});

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      submit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  p-12 gap-7 bg-orange-400 w-96 max-h-98 "
    >
      <div className=" flex justify-center text-3xl text-white">
        <h2>Sign in</h2>
      </div>
      <label htmlFor="e-mail">
        E-mail*
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="adawny@gmania.com"
          className="w-full border-0 rounded-md p-1"
        />
        {formErrors.email && (
          <div className="text-red-500">{formErrors.email}</div>
        )}
      </label>

      <label htmlFor="Password">
        Password*
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="xxxxxxxx"
          className="w-full border-0 rounded-md p-1"
        />
        {formErrors.password && (
          <div className="text-red-500">{formErrors.password}</div>
        )}
      </label>

      <div className="justify-center">
        <button className=" w-full border-0 rounded-md p-1 bg-orange-300">
          Start here
        </button>
      </div>
    </form>
  );
};

export default SignIn;
