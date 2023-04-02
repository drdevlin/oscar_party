import {
  useCategoryMutation,
  useNomineeMutation,
  useNominationMutation,
  useSelectionMutation,
  useUserMutation
} from '@/lib/mutation';

import type { UseMutationResult } from '@tanstack/react-query';

// Component
export interface NewProps {
  model: string;
  fields: string[];
}
export const New = ({ model, fields }: NewProps) => {
  const forms: Record<string, React.FunctionComponent<ModelFormProps>> = {
    nominee: NomineeForm,
    category: CategoryForm,
    user: UserForm,
    nomination: NominationForm,
    selection: SelectionForm,
  } as const;
  const formName = model.toLowerCase();
  const ActiveForm = formName in forms ? forms[formName] : () => null;

  return (
    <>
      <h3>{model}</h3>
      <ActiveForm fields={fields} />
    </>
  )
};

// Subcomponents
interface ModelFormProps {
  fields: string[];
}
const makeForm = (displayName: string, mutationHook: () => UseMutationResult<any, any, any, any>) => {
  const ModelForm = ({ fields }: ModelFormProps) => {
    const modelMutation = mutationHook();
  
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      const formData = Object.fromEntries((new FormData(event.currentTarget)).entries());
      modelMutation.mutateAsync({ method: 'POST', body: JSON.stringify(formData)});
    };
  
    return <Form fields={fields} onSubmit={handleSubmit} />;
  };
  ModelForm.displayName = displayName;
  return ModelForm;
};
const NomineeForm = makeForm('NomineeForm', useNomineeMutation);
const CategoryForm = makeForm('CategoryForm', useCategoryMutation);
const UserForm = makeForm('UserForm', useUserMutation);
const NominationForm = makeForm('NominationForm', useNominationMutation);
const SelectionForm = makeForm('SelectionForm', useSelectionMutation);

interface FormProps {
  fields: string[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
const Form = ({ fields, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} method="post">
      {fields.map((field) => (
        <div key={'new' + field + 'label'}>
          <label htmlFor={field}>{field}</label>
          <input name={field} id={field} type="text" required />
        </div>
      ))}
      <button>Create!</button>
    </form>
  )
};
