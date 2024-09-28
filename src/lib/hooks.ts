import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${BASE_API_URL}/${id}`);
//         const data = await response.json();
//         setJobItem(data.jobItem);
//         setIsLoading(false);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return [jobItem, isLoading] as const;
// }

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();

  return data;
};

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;

//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
//         const data = await response.json();
//         setJobItems(data.jobItems);
//         setIsLoading(false);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, [searchText]);

//   return [jobItems, isLoading] as const;
// }

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await response.json();
  return data;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  };
}

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}
