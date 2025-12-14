function Pagination({ currentPage, totalPages, onPageChange }) {
  const MAX_VISIBLE = 5;

  const generatePageNumbers = () => {
    let pages = [];

    if (totalPages <= MAX_VISIBLE) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  return (
    <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 8 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.navButton}
      >
        ←
      </button>

      {generatePageNumbers().map((num, index) =>
        num === "..." ? (
          <span key={index} style={styles.ellipsis}>…</span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === num ? "#007bff" : "#f0f0f0",
              color: currentPage === num ? "#fff" : "#000"
            }}
          >
            {num}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.navButton}
      >
        →
      </button>
    </div>
  );
}

const styles = {
  pageButton: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: "bold",
  },
  navButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#e6e6e6",
  },
  ellipsis: {
    padding: "8px 10px",
    fontWeight: "bold",
    userSelect: "none"
  }
};

export default Pagination;
