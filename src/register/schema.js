import * as yup from 'yup';
import { validateCNPJ, validateCPF } from '../util/Validation';

// simulate a network or database call
const checkUsername = username =>
  new Promise(resolve => {
    const takenUsernames = ['jane', 'john', 'elon', 'foo'];
    resolve(!takenUsernames.includes(username));
  });

const checkCNPJ = cnpj => new Promise(resolve => resolve(validateCNPJ(cnpj)))
const checkCPF = cpf => new Promise(resolve => resolve(validateCPF(cpf)))

const regSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),

  email: yup
    .string()
    .required('Please provide your email')
    .email("Email doesn't look right"),

  username: yup
    .string()
    .required('Username is a manadatory field')
    .test('usernameTaken', 'Please choose another username', checkUsername),

  cnpj: yup
    .string()
    .required('Informe o seu CNPJ')
    .test('cnpjValidator', 'O CNPJ informado não é valido', checkCNPJ),

  cpf: yup
    .string()
    .required('Informe o seu CPF')
    .test('cpfValidator', 'O CPF informado não é valido', checkCPF),

  password: yup.string().required('Password is required'),

  passwordConfirm: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords do not match')

});

export { regSchema };
