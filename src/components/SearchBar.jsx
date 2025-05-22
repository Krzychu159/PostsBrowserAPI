const SearchBar = ({ search, onChange }) => {
  return (
    <div className="navigation">
      <input
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Title"
      />
      <button>Sort A-Z</button>
    </div>
  );
};

export default SearchBar;
