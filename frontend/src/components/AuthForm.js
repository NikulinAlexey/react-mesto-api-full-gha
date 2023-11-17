import useFormWithValidation from "../hooks/useValidationForm";

function AuthForm({
  title,
  children,
  handleSubmit,
  textOfButton
}) {

  const { values, handleChange, resetForm, isValid, errors } = useFormWithValidation();

  function onSubmit(e) {
    const { email, password } = values;
    handleSubmit(e, password, email);
    resetForm()
  }

  return (
    <div className="intro-form" >

      <h2 className="intro-form__title"> {title} </h2>

      <form className="intro-form__form" onSubmit={onSubmit}>
        <input
          required
          type="email"
          name="email"
          minLength={5}
          id="email-input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="intro-form__input"
        />
        <span id="email-input-error" className="intro-form__error">{errors?.email}</span>
        
        <input
          required
          minLength={5}
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password}
          className="intro-form__input"
        />
        <span id="password-input-error" className="intro-form__error">{errors?.password}</span>

        <button className="intro-form__submit" type="submit"> {textOfButton} </button>
      </form>
      {children}

    </div>
  );
};

export default AuthForm;
