"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./search.module.css";

interface SearchProps {
  query: string;
}

export default function Search(props: SearchProps) {
  interface SearchResult {
    index: number;
    headline: string;
    href: string;
    body: string;
  }

  const [results, setResults] = useState<null | SearchResult[]>(null);

  useEffect(() => {
    performSearch();
  }, [props.query]);

  async function performSearch() {
    //Placeholder
    if (props.query) {
      setResults([
        {
          index: 1,
          headline: `The perfect search for ${props.query}`,
          href: `https://google.com/search?q=${props.query}`,
          body: "Go there for more info",
        },
      ]);
    }
    /*
    try {
      const searchRes = await fetch(`/api/search/[query]`);
      const searchObj = await searchRes.json();
      if (!searchObj.errors) {
        setResults(searchObj.results);
      }
    } catch {
      setResults(null);
    }
    */
  }

  return results ? (
    <ul>
      {results.map(({ index, headline, href, body }) => (
        <li key={index}>
          <a href={href}>
            <h3>{headline}</h3>
          </a>
          <div>{body}</div>
        </li>
      ))}
    </ul>
  ) : null;
}
