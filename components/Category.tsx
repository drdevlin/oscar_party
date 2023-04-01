import { useSelectionMutation } from "@/lib/mutation";
import { Nomination, Selection, User } from "@/types";
import styles from './Category.module.css';
import { Radio } from "@/components/Radio";
import type { RadioChangeHandler } from "@/components/Radio";

export interface CategoryProps {
  userId: string;
  nominations: Nomination[];
  selection?: Selection;
}

export const Category = ({ userId, nominations, selection }: CategoryProps) => {
  const selectionMutation = useSelectionMutation();
  const handleChange: RadioChangeHandler = (choice) => {
    if (!choice) return;
    const method = selection ? 'PATCH' : 'POST';
    const body = selection ? (
      {
        _id: selection._id,
        nomination: choice.id,
      }
    ) : (
      {
        user: userId,
        nomination: choice.id,
      }
    );
    selectionMutation.mutateAsync({ method, body: JSON.stringify(body) });
  };

  const choices = nominations.map((nomination) => (
    {
      id: nomination._id || '',
      value: nomination.nominee.name.split(',')[0],
    }
  ));
  const initialChoiceId = selection?.nomination._id;

  return (
    <>
      {!!choices.length && <Radio choices={choices} initialChoiceId={initialChoiceId} onChange={handleChange} />}
    </>
  );
}
