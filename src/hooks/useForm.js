import { useState, useCallback, useEffect, useRef } from 'react';
import { runValidations } from '../utils/validators';

// Main form hook
export const useForm = (initialValues = {}, options = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  
  const {
    validationSchema,
    onSubmit,
    validateOnChange = true,
    validateOnBlur = true,
    enableReinitialize = false,
    keepDirtyOnReinitialize = false
  } = options;

  const initialValuesRef = useRef(initialValues);
  const mountedRef = useRef(true);

  // Update initial values if enableReinitialize is true
  useEffect(() => {
    if (enableReinitialize && initialValues !== initialValuesRef.current) {
      if (keepDirtyOnReinitialize) {
        // Only update fields that haven't been touched
        const newValues = { ...initialValues };
        Object.keys(touched).forEach(key => {
          if (touched[key] && values[key] !== undefined) {
            newValues[key] = values[key];
          }
        });
        setValues(newValues);
      } else {
        setValues(initialValues);
        setTouched({});
        setErrors({});
      }
      initialValuesRef.current = initialValues;
    }
  }, [initialValues, enableReinitialize, keepDirtyOnReinitialize, touched, values]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Validate form values
  const validate = useCallback(async (valuesToValidate = values) => {
    if (!validationSchema) return {};

    setIsValidating(true);
    
    try {
      const validationResult = runValidations(valuesToValidate, validationSchema);
      return validationResult.errors;
    } catch (error) {
      console.error('Validation error:', error);
      return {};
    } finally {
      if (mountedRef.current) {
        setIsValidating(false);
      }
    }
  }, [values, validationSchema]);

  // Set field value
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (validateOnChange && validationSchema) {
      validate({ ...values, [name]: value }).then(newErrors => {
        if (mountedRef.current) {
          setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
        }
      });
    }
  }, [values, validateOnChange, validationSchema, validate]);

  // Set field error
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Set field touched
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
    
    if (validateOnBlur && isTouched && validationSchema) {
      validate(values).then(newErrors => {
        if (mountedRef.current) {
          setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
        }
      });
    }
  }, [values, validateOnBlur, validationSchema, validate]);

  // Handle input change
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFieldValue(name, fieldValue);
  }, [setFieldValue]);

  // Handle input blur
  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setFieldTouched(name, true);
  }, [setFieldTouched]);

  // Handle form submission
  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }

    setSubmitCount(prev => prev + 1);
    setIsSubmitting(true);

    try {
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // Validate all fields
      const validationErrors = await validate(values);
      
      if (mountedRef.current) {
        setErrors(validationErrors);
      }

      // If there are validation errors, don't submit
      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      // Call the onSubmit function if provided
      if (onSubmit) {
        await onSubmit(values, {
          setFieldError,
          setFieldValue,
          setErrors,
          resetForm
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (mountedRef.current) {
        setErrors({ submit: error.message || 'An error occurred during submission' });
      }
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit, setFieldError, setFieldValue]);

  // Reset form
  const resetForm = useCallback((newValues = initialValuesRef.current) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, []);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  // Check if form is dirty (has changes)
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);

  // Get field props for easy integration with inputs
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur
  }), [values, handleChange, handleBlur]);

  // Get field meta information
  const getFieldMeta = useCallback((name) => ({
    value: values[name],
    error: errors[name],
    touched: touched[name],
    initialValue: initialValuesRef.current[name]
  }), [values, errors, touched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isValid,
    isDirty,
    submitCount,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validate,
    getFieldProps,
    getFieldMeta
  };
};

// Hook for array fields
export const useFieldArray = (name, formMethods) => {
  const { values, setFieldValue } = formMethods;
  const fieldValue = values[name] || [];

  const push = useCallback((value) => {
    const newArray = [...fieldValue, value];
    setFieldValue(name, newArray);
  }, [fieldValue, name, setFieldValue]);

  const remove = useCallback((index) => {
    const newArray = fieldValue.filter((_, i) => i !== index);
    setFieldValue(name, newArray);
  }, [fieldValue, name, setFieldValue]);

  const insert = useCallback((index, value) => {
    const newArray = [...fieldValue];
    newArray.splice(index, 0, value);
    setFieldValue(name, newArray);
  }, [fieldValue, name, setFieldValue]);

  const move = useCallback((from, to) => {
    const newArray = [...fieldValue];
    const item = newArray.splice(from, 1)[0];
    newArray.splice(to, 0, item);
    setFieldValue(name, newArray);
  }, [fieldValue, name, setFieldValue]);

  const replace = useCallback((index, value) => {
    const newArray = [...fieldValue];
    newArray[index] = value;
    setFieldValue(name, newArray);
  }, [fieldValue, name, setFieldValue]);

  const clear = useCallback(() => {
    setFieldValue(name, []);
  }, [name, setFieldValue]);

  return {
    fields: fieldValue,
    push,
    remove,
    insert,
    move,
    replace,
    clear
  };
};

// Hook for form persistence (save to localStorage)
export const useFormPersist = (formId, formMethods, options = {}) => {
  const { values, resetForm } = formMethods;
  const {
    storage = localStorage,
    debounceTime = 1000,
    exclude = [],
    clearOnSubmit = true
  } = options;

  const timeoutRef = useRef();
  const storageKey = `form_${formId}`;

  // Save form data to storage
  const saveToStorage = useCallback((data) => {
    try {
      const filteredData = { ...data };
      exclude.forEach(key => delete filteredData[key]);
      storage.setItem(storageKey, JSON.stringify(filteredData));
    } catch (error) {
      console.warn('Failed to save form data to storage:', error);
    }
  }, [storageKey, storage, exclude]);

  // Load form data from storage
  const loadFromStorage = useCallback(() => {
    try {
      const saved = storage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load form data from storage:', error);
      return null;
    }
  }, [storageKey, storage]);

  // Clear storage
  const clearStorage = useCallback(() => {
    try {
      storage.removeItem(storageKey);
    } catch (error) {
      console.warn('Failed to clear form storage:', error);
    }
  }, [storageKey, storage]);

  // Restore form from storage
  const restoreForm = useCallback(() => {
    const savedData = loadFromStorage();
    if (savedData) {
      resetForm(savedData);
    }
  }, [loadFromStorage, resetForm]);

  // Save form data with debounce
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveToStorage(values);
    }, debounceTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [values, saveToStorage, debounceTime]);

  // Clear storage on form submission if specified
  useEffect(() => {
    if (clearOnSubmit && formMethods.submitCount > 0) {
      clearStorage();
    }
  }, [formMethods.submitCount, clearOnSubmit, clearStorage]);

  return {
    restoreForm,
    clearStorage,
    hasSavedData: !!loadFromStorage()
  };
};

// Hook for multi-step forms
export const useMultiStepForm = (steps, initialValues = {}, options = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  
  const formMethods = useForm(initialValues, options);
  const { values, errors, isValid } = formMethods;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const canGoNext = isValid && currentStep < steps.length - 1;
  const canGoPrev = currentStep > 0;

  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  }, [steps.length]);

  const nextStep = useCallback(() => {
    if (canGoNext) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  }, [canGoNext, currentStep]);

  const prevStep = useCallback(() => {
    if (canGoPrev) {
      setCurrentStep(prev => prev - 1);
    }
  }, [canGoPrev]);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    formMethods.resetForm();
  }, [formMethods]);

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return {
    ...formMethods,
    currentStep,
    currentStepData,
    completedSteps,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrev,
    progress,
    goToStep,
    nextStep,
    prevStep,
    resetSteps,
    steps
  };
};