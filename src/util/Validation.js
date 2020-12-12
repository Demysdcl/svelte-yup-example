


const isSequence = (length, value) => value.charAt(0).repeat(length) === value

function validateCNPJ(formatedCNPJ) {
  if (formatedCNPJ === '') return false

  const cnpj = formatedCNPJ ? formatedCNPJ.replace(/[^\d]+/g, '') : '';
  let cnpjLength = 14

  if (cnpj.length !== cnpjLength || isSequence(cnpjLength, cnpj)) return false;

  const digits = cnpj.substring(cnpj.length - 2);

  let size = cnpj.length - 2

  if (generateCNPJVerifierDigit(cnpj, size) != digits.charAt(0))
    return false;

  size = size + 1;

  if (generateCNPJVerifierDigit(cnpj, size) != digits.charAt(1))
    return false;

  return true;

}

function generateCNPJVerifierDigit(cnpj, size) {
  const numbers = cnpj.substring(0, size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  return sum % 11 < 2 ? 0 : 11 - sum % 11;
}

function validateCPF(formatedCPF) {
  if (!formatedCPF) return false

  let cpf = formatedCPF.replace(/[^\d]+/g, '')
  const cpfLength = 11

  if (cpf.length !== cpfLength || isSequence(cpfLength, cpf)) return false;

  return cpfToCompare(cpf) === cpf;
}

function generateCPFVerifierDigit(cpfPart) {
  let total = 0;
  let reverso = cpfPart.length + 1;

  for (let stringNumerica of cpfPart) {
    total += reverso * Number(stringNumerica);
    reverso--;
  }

  const digit = 11 - (total % 11);
  return digit <= 9 ? String(digit) : '0';
}

function cpfToCompare(formatedCPF) {
  const cpfPart = formatedCPF.slice(0, -2);
  const digitOne = generateCPFVerifierDigit(cpfPart);
  const digitTwo = generateCPFVerifierDigit(cpfPart + digitOne);
  return cpfPart + digitOne + digitTwo;
}

export { validateCNPJ, validateCPF };

