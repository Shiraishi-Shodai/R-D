import React, { createContext, useContext, useId } from 'react';

// FormContext
const FormContext = createContext({});

// Form
export const Form = ({ onSubmit, children }) => {
  return (
    <FormContext.Provider value={{}}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

// FormFieldContext
const FormFieldContext = createContext({});

// FormField
export const FormField = ({ name, children }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

// useFormField
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const id = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};

// FormItemContext
const FormItemContext = createContext({});

// FormItem
export const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={className} {...props} />
    </FormItemContext.Provider>
  );
});

// FormLabel
export const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={`block text-sm font-medium ${className}`}
      htmlFor={formItemId}
      {...props}
    />
  );
});

// FormControl
export const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <input
      ref={ref}
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      {...props}
    />
  );
});

// FormDescription
export const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  );
});

// FormMessage
export const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { formMessageId } = useFormField();

  if (!children) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={`text-sm font-medium text-red-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

// useForm (簡易版)
export const useForm = (initialValues = {}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});

  const register = (name) => ({
    name,
    value: values[name] || '',
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return { register, handleSubmit, values, errors, setErrors };
};

export { useFormField };