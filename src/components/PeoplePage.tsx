import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams<{ personId?: string }>();
  const selectedSlug = params.personId;

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : people.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <PeopleTable
            people={people}
            selectedSlug={selectedSlug}
            onSelect={() => {}}
          />
        )}
      </div>
    </section>
  );
};
/* 
          {isLoading && <Loader />}

        {error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : null}

        {!isLoading && !error ? (
          <PeopleTable
            people={people}
            selectedSlug={selectedSlug}
            onSelect={setSelectedSlug}
          />
        ) : (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
*/
