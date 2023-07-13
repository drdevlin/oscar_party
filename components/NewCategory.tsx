import { useState } from 'react';
import { useCategoryMutation } from '@/lib/mutation';
import { Item } from '@/components/Item';

import type { Dispatch, SetStateAction, ChangeEventHandler } from 'react';

import styles from './NewCategory.module.css';

export interface NewCategoryProps {
  year: number;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

/* Creates a new category. */
export const NewCategory = ({ year, onCancel, onSubmit }: NewCategoryProps) => {
  // Mutations
  const categoryMutation = useCategoryMutation();
  
  // State
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
    
  // Handlers  
  const handleInputChange = (setter: Dispatch<SetStateAction<string>>): ChangeEventHandler<HTMLInputElement> => ({ currentTarget }) => {
    setter(currentTarget.value);
  }
  
  const handleCancelButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    // Clear state.
    setName('');
    setPoints('');
    // Pass on event.
    onCancel(event);
  }
  
  const handleSubmitButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (!name) return;
    if (!points) return;
    if (Number.isNaN(Number(points))) return;

    const body = { name, points, year };
    (async () => {
      await categoryMutation.mutateAsync({ method: 'POST', body: JSON.stringify(body)});
      // Clear state.
      setName('');
      setPoints('');
      // Pass on event.
      onSubmit(event);
    })();
  }

  return (
    <Item>
      <div className={styles.container}>

        {/* Cancel Button */}
        <button className={styles.button} onClick={handleCancelButtonClick}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>
        </button>

        {/* Inputs */}
        <div>
          <input
            className={styles.input}
            value={name}
            placeholder="Category"
            onChange={handleInputChange(setName)}
          />
          <input
            className={styles.input}
            value={points}
            placeholder="0"
            onChange={handleInputChange(setPoints)}
          />
        </div>

        {/* Submit Button */}
        <button className={styles.button} onClick={handleSubmitButtonClick}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
          </svg>
        </button>
        
      </div>
    </Item>
  );
};
