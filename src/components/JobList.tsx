import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((item) => <JobListItem key={item.id} item={item} />)}
    </ul>
  );
}

export default JobList;
