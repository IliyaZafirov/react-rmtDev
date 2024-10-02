import { useActiveIdContext } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export default function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveIdContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((item) => (
          <JobListItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
          />
        ))}
    </ul>
  );
}
