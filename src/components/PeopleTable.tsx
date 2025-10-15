import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  onSelect,
}) => {
  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            onClick={() => onSelect(person.slug)}
            data-cy="person"
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={
                  person.sex === 'f' ? 'has-text-danger' : 'has-text-link'
                }
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
