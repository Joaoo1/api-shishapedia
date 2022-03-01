/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'Este campo é obrigatório',
    oneOf: 'Este campo deve ter um dos seguintes valores: ${values}',
    notOneOf: 'Este campo não deve ter nenhum dos seguintes valores: ${values}',
    defined: 'Este campo não deve ser indefinido',
    notType: function notType(_ref) {
      switch (_ref.type) {
        case 'number':
          return 'Este campo precisa ser um número válido';
        case 'string':
          return 'Este campo precisa ser uma string válida';
        default:
          return 'Valor inválido';
      }
    },
  },
  string: {
    length: ({ length }: any) =>
      `Este campo deve ter exatamente ${length} ${
        length === 1 ? 'caractere' : 'caracteres'
      }`,
    min: ({ min }: any) =>
      `Este campo deve ter pelo menos ${min} ${
        min === 1 ? 'caractere' : 'caracteres'
      }`,
    max: ({ max }: any) =>
      `Este campo deve ter no máximo ${max} ${
        max === 1 ? 'caractere' : 'caracteres'
      }`,
    matches: 'Este campo deve corresponder ao padrão: "${regex}"',
    email: 'Este campo deve ser um e-mail válido',
    url: 'Este campo deve ser uma URL válida',
    trim: 'Este campo não deve conter espaços adicionais no início nem no fim',
    lowercase: 'Este campo deve estar em letras minúsculas',
    uppercase: 'Este campo deve estar em letras maiúsculas',
  },
  number: {
    min: 'Este campo deve ser maior ou igual a ${min}',
    max: 'Este campo deve menor ou igual a ${max}',
    lessThan: 'Este campo deve ser menor que ${less}',
    moreThan: 'Este campo deve ser maior que ${more}',
    positive: 'Este campo deve ser um número positivo',
    negative: 'Este campo deve ser um número negativo',
    integer: 'Este campo deve ser um número inteiro',
  },
  date: {
    min: ({ min }: any) =>
      `Este campo deve ter pelo menos ${min} ${min === 1 ? 'item' : 'itens'}`,
    max: ({ max }: any) =>
      `Este campo deve ter no máximo ${max} ${max === 1 ? 'item' : 'itens'}`,
  },
  array: {
    min: ({ min }: any) =>
      `Este campo deve ter pelo menos ${min} ${min === 1 ? 'item' : 'itens'}`,
    max: ({ max }: any) =>
      `Este campo deve ter no máximo ${max} ${max === 1 ? 'item' : 'itens'}`,
  },
  object: {
    noUnknown: 'Este campo tem chaves desconhecidas: ${unknown}',
  },
  boolean: {},
});

export default yup;
