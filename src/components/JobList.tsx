export function JobList({ jobItems }) {
  return <ul className="job-list">
    {
      jobItems.map(item => item.title)
    }
  </ul>;
}

export default JobList;
