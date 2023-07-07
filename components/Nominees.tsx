import { useNominationMutation, useNomineeMutation } from '@/lib/mutation';
import { Nominee } from '@/components/Nominee';
import { Radio } from '@/components/Radio';

import type { Category, Nomination, Nominee as NomineeType } from "@/types";
import type { RadioChangeHandler } from "@/components/Radio";
import type { NomineeProps } from '@/components/Nominee';

import { useContext, useState } from 'react';

import styles from './Nominees.module.css';
import { NomineesContext } from '@/pages/admin';

export interface NomineesProps {
  category: Category;
  nominations: Nomination[];
}

/* Displays the nominees for a category. */
/* Handles marking a winner. */
export const Nominees = ({ category, nominations }: NomineesProps) => {
  // Mutators
  const nominationMutation = useNominationMutation();
  const nomineeMutation = useNomineeMutation();

  // State
  const [showAddNominationInput, setShowAddNominationInput] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState('');
  const [modifiedNomineeName, setModifiedNomineeName] = useState('');
  const editingOff = () => {
    setSelectedNomination('');
    setModifiedNomineeName('');
  };

  // Handlers
  const handleAddNominationClick = () => {
    editingOff();
    setShowAddNominationInput(true);
  };

  const handleRadioChange: RadioChangeHandler = (choice) => {
    if (!choice) return;

    nominations.forEach((nomination) => {
      const { _id } = nomination;
      const win = nomination._id === choice.id;
      const body = { _id, win };

      if (win !== nomination.win) nominationMutation.mutate({ method: 'PATCH', body: JSON.stringify(body) });
    });
  };

  const handleNominationClick: NomineeProps['onClick'] = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Turn off nomination adding.
    setShowAddNominationInput(false);

    const nominationClicked = nominations.find((nomination) => nomination.nominee.name === event.currentTarget.innerText);
    if (!nominationClicked) return;

    // Turn on nomination editing.
    setSelectedNomination(nominationClicked._id);
    setModifiedNomineeName(nominationClicked.nominee.name);
  };

  const handleNominationChange: NomineeProps['onChange'] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setModifiedNomineeName(event.currentTarget.value);
  };

  const handleNominationCancel: NomineeProps['onCancel'] = (event) => {
    event.preventDefault();
    event.stopPropagation();

    editingOff();
  };

  const handleNominationSubmit: NomineeProps['onSubmit'] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!modifiedNomineeName) return;

    const nominationModified = nominations.find((nomination) => nomination._id === selectedNomination);
    if (!nominationModified) return;

    const body = {
      _id: nominationModified.nominee._id,
      name: modifiedNomineeName,
    };

    nomineeMutation.mutateAsync({ method: 'PATCH', body: JSON.stringify(body) });

    editingOff();
  };

  // Calculated Props
  const choices = nominations.map((nomination) => (
    {
      id: nomination._id,
      value: (
        <Nominee
          name={nomination._id === selectedNomination ? modifiedNomineeName : nomination.nominee.name}
          input={nomination._id === selectedNomination}
          onClick={handleNominationClick}
          onChange={handleNominationChange}
          onCancel={handleNominationCancel}
          onSubmit={handleNominationSubmit}
        />
      ),
    }
  ));
  const initialChoiceId = nominations.find((nomination) => nomination.win)?._id;

  return (
    <>
      <div className={styles.title}>
        <h2>{category.name}</h2>
        {showAddNominationInput ? (
          <AddNominationInput category={category} off={() => setShowAddNominationInput(false)} />
        ) : (
          <AddNominationButton onClick={handleAddNominationClick} />
        )}
      </div>
      {!!choices.length && <Radio choices={choices} initialChoiceId={initialChoiceId} onChange={handleRadioChange} />}
    </>
  );
};

// Subcomponents
interface AddNominationInputProps {
  category: Category;
  off: () => void;
}
const AddNominationInput = ({ category, off }: AddNominationInputProps) => {
  // Context
  const allNominees = useContext(NomineesContext);

  // Mutators
  const nominationMutation = useNominationMutation();
  const nomineeMutation = useNomineeMutation();

  // State
  const [name, setName] = useState('');

  // Handlers
  const handleChange: NomineeProps['onChange'] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setName(event.currentTarget.value);
  };

  const handleCancel: NomineeProps['onCancel'] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setName('');
    off();
  };

  const handleSubmit: NomineeProps['onSubmit'] = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!name) return;

    const selectedNominee = allNominees.find((nominee) => nominee.name === name);
    const createNominee = selectedNominee ? (
      async () => selectedNominee
    ) : (
      async () => nomineeMutation.mutateAsync({
        method: 'POST',
        body: JSON.stringify({ name }),
      })
    );

    (async () => {
      const createdNominee = await createNominee();
      if (!createdNominee || !('_id' in createdNominee)) throw new Error('Error creating nominee.');

      const body = {
        nominee: createdNominee._id,
        category: category._id,
        win: false,
      };

      nominationMutation.mutateAsync({ method: 'POST', body: JSON.stringify(body) });
    })();

    setName('');
    off();
  };

  const handleSuggestionClick: React.MouseEventHandler<HTMLParagraphElement> = ({ currentTarget }) => {
    setName(currentTarget.innerText);
  };

  // Calculated Props
  const suggestions = allNominees.filter((nominee) => name.length > 2 && nominee.name.toLowerCase().includes(name.toLowerCase()));

  return (
    <div className={styles.newNominee}>
      <Nominee
        name={name}
        input
        onClick={() => {}}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      {!!suggestions.length && <Suggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />}
    </div>
  );
};

interface SuggestionsProps {
  suggestions: NomineeType[];
  onSuggestionClick: React.MouseEventHandler<HTMLParagraphElement>;
}
const Suggestions = ({ suggestions, onSuggestionClick }: SuggestionsProps) => {
  return (
    <div className={styles.suggestions}>
      {
        suggestions.map((nominee) => (
          <p className={styles.suggestion} key={nominee._id} onClick={onSuggestionClick}>{nominee.name}</p>
        ))
      }
    </div>
  );
};

interface AddNominationButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const AddNominationButton = ({ onClick }: AddNominationButtonProps) => {
  return (
    <button className={styles.add} onClick={onClick}>
      <svg className={styles.plus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
    </button>
  );
};
