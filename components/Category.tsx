import { useSelectionMutation } from '@/lib/mutation';
import { Radio } from '@/components/Radio';

import type { Nomination, Selection } from "@/types";
import type { RadioChangeHandler } from "@/components/Radio";

export interface CategoryProps {
  userId: string;
  nominations: Nomination[];
  selection?: Selection;
}

/* Displays the nominees for a category. */
/* Handles changing the selection. */
export const Category = ({ userId, nominations, selection }: CategoryProps) => {
  // Get the selection mutator.
  const selectionMutation = useSelectionMutation();

  // Handlers
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

  // Calculated Props
  const choices = nominations.map((nomination) => (
    {
      id: nomination._id,
      value: nomination.nominee.name.split(',')[0], // the principal name
      highlight: nomination.win,
    }
  ));
  const initialChoiceId = selection?.nomination._id;

  return (
    <>
      {!!choices.length && <Radio choices={choices} initialChoiceId={initialChoiceId} onChange={handleChange} />}
    </>
  );
};
