import { createContext } from 'react';

export type FormContextData = {
  isAdding?: boolean;
  isEditing?: boolean;
  isDuplicated?: boolean;
};

export type FormContextType = {
  formContextData: FormContextData;
  setFormContextData: (formContextData: FormContextData) => void;
};

export const FormContext = createContext<FormContextType>({
  formContextData: {
    isAdding: false,
    isEditing: false,
    isDuplicated: false
  },
  setFormContextData: () => null,
});