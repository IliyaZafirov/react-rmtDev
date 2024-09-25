import { useState, useEffect } from "react";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );
        const data = await response.json();
        setJobItems(data.jobItems);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [searchText]);

  return { jobItems, isLoading };
}
