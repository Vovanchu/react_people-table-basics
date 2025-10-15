import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const found = people.find(
    person => person.name.toLowerCase() === name.toLowerCase(),
  );

  if (!found) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${found.slug}`}
      className={found.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
    >
      {found.name}
    </Link>
  );
};
