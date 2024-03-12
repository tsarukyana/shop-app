import { object, string, boolean, ref } from 'yup';

const registrationScheme = object().shape({
  name: string()
    .required('Name is required.')
    .matches(/^[^\s]+$/, 'firstNameWithoutWhitespace')
    .min(2, 'Minimum length must be at least 2.')
    .max(30, 'Maximum length must be at most 2.'),

  email: string()
    .required('Email is required.')
    .email('emailValidate')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid email'
    ),
  phone: string().concat(),
  password: string()
    .required('Password is required')
    .min(6, 'passwordMinLength')
    .max(20, 'passwordMaxLength')
    .test('passwords-match', 'Passwords must match.', function (value) {
      if (this.parent.passwordConfirm) {
        return this.parent.passwordConfirm === value;
      }

      return true;
    }),
  passwordConfirm: string()
    .required('passwordConfirmRequired')
    .oneOf([ref('password')], 'Passwords must match.'),
});

export default registrationScheme;
