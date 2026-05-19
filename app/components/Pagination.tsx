"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const TOTAL_PAGES = 10;

export default function Pagination() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10",
        );
        if (!response) throw new Error("Failed to fetch");
        const answer = await response.json();
        setData(answer);
      } catch (error) {
        console.error("Fetch failed");
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h1> {item.title}</h1>
          <Link href={item.url} />
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            width={50}
            height={50}
          />
        </div>
      ))}
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === TOTAL_PAGES}
      >
        Next
      </button>
    </div>
  );
}
