const SUGGESTIONS = ["Shoes", "T-Shirts", "Electronics", "Watches", "Jackets"];

const SearchIdleState = ({ onSuggestionClick }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="relative mb-6">
                <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-14 h-14 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11h6M11 8v6" />
                        </svg>
                    </div>
                </div>
                <span className="absolute top-3 right-5 w-3 h-3 rounded-full bg-yellow-300" />
                <span className="absolute bottom-4 left-3 w-2 h-2 rounded-full bg-blue-300" />
                <span className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-rose-300" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">What are you looking for?</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
                Start typing to search our catalog. Use at least 3 characters to get results.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
                <p className="w-full text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Popular searches</p>
                {SUGGESTIONS.map(s => (
                    <button
                        key={s}
                        onClick={() => onSuggestionClick(s)}
                        className="px-4 py-1.5 rounded-full border border-border text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchIdleState;
