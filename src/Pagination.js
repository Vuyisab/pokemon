import React from "react";

export default function Pagination({ gotoNextPage, gotoPreviousPage }) {
  return (
    <div>
      {
        <button onClick={gotoPreviousPage} disabled={gotoPreviousPage === null}>
          Previous
        </button>
      }
      {
        <button onClick={gotoNextPage} disabled={gotoNextPage === null}>
          Next
        </button>
      }
    </div>
  );
}
