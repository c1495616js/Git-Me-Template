import React, { useState } from "react";
import ChipInput from "material-ui-chip-input";
import ReactMarkdown from "react-markdown";

import "./App.css";
import { Button } from "@material-ui/core";

function App() {
  const [resolves, setResolves] = useLocalStorage<string[]>("resolves", []);
  const [changes, setChanges] = useLocalStorage<string[]>("changes", []);
  const [refs, setRefs] = useLocalStorage<{ key: string; value: string }[]>(
    "refs",
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        {/* resolve */}
        <ChipInput
          alwaysShowPlaceholder
          placeholder="resolves"
          value={resolves as string[]}
          onAdd={(chip) => {
            setResolves([...resolves, chip]);
          }}
          onDelete={(chip, index) => {
            setResolves(resolves.filter((c) => c !== chip));
          }}
        />

        {/* changes */}
        <ChipInput
          alwaysShowPlaceholder
          placeholder="changes"
          value={changes}
          onAdd={(chip) => {
            setChanges([...changes, chip]);
          }}
          onDelete={(chip, index) => {
            setChanges(changes.filter((c) => c !== chip));
          }}
        />
        {/* Refs */}
        <ChipInput
          alwaysShowPlaceholder
          placeholder="jira links"
          value={refs.map((r) => r.key)}
          onAdd={(chip) => {
            setRefs([...refs, jiraHelper(chip)]);
          }}
          onDelete={(chip, index) => {
            setRefs(refs.filter((c) => c.key !== chip));
          }}
        />

        <Button
          className="btn"
          onClick={() => {
            const html = document.getElementsByClassName("content") as any;
            navigator.clipboard.writeText(html[0].innerText);
          }}
        >
          Copy
        </Button>

        <Button
          className="btn"
          onClick={() => {
            window.localStorage.clear();
            setResolves([]);
            setChanges([]);
            setRefs([]);
          }}
        >
          Clean
        </Button>
      </header>

      {/* body */}

      <div className="body">
        {/* markdown preview */}
        <div className="content">
          <p>**Resolves:**</p>
          {resolves.map((p) => (
            <p>{`- ${p}`}</p>
          ))}
          <p>**Changes:**</p>
          {changes.map((p) => (
            <p>{`- ${p}`}</p>
          ))}
          <p>**References:**</p>
          {refs.map((p) => (
            <p>{`- ${p.value}`}</p>
          ))}
        </div>
      </div>

      {/* <div className="body">
        <ReactMarkdown>
          {stripHtml(`
          <div>
          <p>***Resolves:***</p>
          ${resolves.map((p) => <p>{`- ${p}`}</p>)}
          <p>**Changes:**</p>
          ${changes.map((p) => <p>{`- ${p}`}</p>)}
          <p>**References:</p>
          ${refs.map((p) => <p>{`- ${p}`}</p>)}
        </div>
        
        `)}
        </ReactMarkdown>
      </div> */}
    </div>
  );
}

export default App;

// Custom Hooks
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as [T, (value: T) => void];
}

/**
 * Helpers
 *
 */

function stripHtml(html: any) {
  let tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function jiraHelper(url: string): { key: string; value: string } {
  const noquery = url.split("?")[0];
  const ticket = noquery.split("/").slice(-1)[0];
  return { key: ticket, value: `[${ticket}](${noquery})` };
}
