import { createContext, useState } from 'react';

import {
  useCategoryQuery,
  useNomineeQuery,
  useNominationQuery,
} from '@/lib/query';

import { Nominees } from '@/components/Nominees';
import { PlusButton } from '@/components/PlusButton';
import { NewCategory } from '@/components/NewCategory';

import type { Category, Nomination, Nominee } from '@/types';

import styles from '@/styles/AdminPage.module.css';

/* All Nominees */
export const NomineesContext = createContext<Nominee[]>([]);

/* A rough admin page for adding and editing categories and nominations. */
export default function Admin() {
  // Queries
  const nomineeQuery = useNomineeQuery();
  const allNominees = nomineeQuery.data || [];
  const categoryQuery = useCategoryQuery();
  const allCategories = categoryQuery.data || [];
  const nominationQuery = useNominationQuery();
  const allNominations = nominationQuery.data || [];

  // State
  const [year, setYear] = useState(2022);
  const [showNewCategory, setShowNewCategory] = useState(false);
  
  // Handlers
  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
    setYear(Number(currentTarget.value));
  };

  const updateShowNewCategoryStatus = (status: boolean): React.MouseEventHandler<HTMLButtonElement> => () => {
    setShowNewCategory(status);
  };

  // Calculated Props
  const nominationsByCategory = new Map<Category, Nomination[]>();
  const categoriesOfYear = allCategories.filter((category) => category.year === year);
  categoriesOfYear.forEach((category) => {
    const nominationsForCategory = allNominations.filter((nomination) => nomination.category._id === category._id);
    nominationsByCategory.set(category, nominationsForCategory);
  });

  return (
    <>
      <h1>Admin</h1>

      {/* Year Selector */}
      <div className={styles.yearSelect}>
        <label htmlFor="year-select">Year</label>
        <select name="years" id="year-select" value={year} onChange={handleYearChange}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
        </select>
      </div>

      {/* Existing Categories of the Year */}
      <NomineesContext.Provider value={allNominees}>
        {
          !!categoriesOfYear.length && (
            categoriesOfYear.map((category) => (
              <Nominees key={category._id} category={category} nominations={nominationsByCategory.get(category) || []} />
            ))
          )
        }
      </NomineesContext.Provider>

      {/* Add New Category */}
      {
        showNewCategory ? (
          <NewCategory
            onCancel={updateShowNewCategoryStatus(false)}
            onSubmit={updateShowNewCategoryStatus(false)}
            year={year}
          />
        ) : (
          <PlusButton onClick={updateShowNewCategoryStatus(true)} />
        )
      }
    </>
  );
}
