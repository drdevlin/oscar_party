import { useState } from "react";

export interface TableProps {
  records: Record<any, any>[];
}

export const Table = ({ records }: TableProps) => {
  const [filter, setFilter] = useState('');

  if (!records.length) return null;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const headings = Object.keys(records[0]);

  return (
    <>
      <input type="text" placeholder="Filter" onChange={handleChange} />
      <table>
        <thead>
            <tr>
                {headings.map((heading) => <th key={heading}>{heading}</th>)}
            </tr>
        </thead>
        <tbody>
            {records.filter((record) => JSON.stringify(record).toLowerCase().includes(filter)).map((record) => (
              <tr key={JSON.stringify(record)}>
                {Object.values(record).map((value) => (
                  <td key={JSON.stringify(value)}>{typeof value === 'string' ? value : JSON.stringify(value)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
