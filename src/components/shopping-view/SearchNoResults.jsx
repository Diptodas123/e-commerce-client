const TIPS = [
    "Double-check your spelling",
    "Try more general keywords",
    "Browse by category instead",
];

const SearchNoResults = ({ keyword, onClear }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="relative mb-6">
                <div className="w-40 h-40 rounded-full bg-muted/60 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center">
                        <svg className="w-14 h-14 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.5 8.5l5 5M13.5 8.5l-5 5" />
                        </svg>
                    </div>
                </div>
                <span className="absolute top-3 right-5 w-3 h-3 rounded-full bg-muted-foreground/20" />
                <span className="absolute bottom-4 left-3 w-2 h-2 rounded-full bg-muted-foreground/20" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No results for &ldquo;{keyword}&rdquo;</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
                We couldn&apos;t find anything matching that term. A few tips:
            </p>
            <ul className="text-sm text-muted-foreground text-left space-y-2 mb-6">
                {TIPS.map(tip => (
                    <li key={tip} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                        {tip}
                    </li>
                ))}
            </ul>
            <button
                onClick={onClear}
                className="px-5 py-2 rounded-full border border-border text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
            >
                Clear search
            </button>
        </div>
    );
};

export default SearchNoResults;
