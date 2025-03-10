import { useState, useEffect, useContext } from "react";
import { saveToStorage, getFromStorage } from "../utils/storage";
import { generateShortUrl } from "../utils/shortenUrl";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UrlShortener = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [originalUrl, setOriginalUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const urlsPerPage = 3; // Show 3 URLs per page

    useEffect(() => {
        if (user) {
            setUrls(getFromStorage(user.username) || []);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert("You must be logged in to shorten URLs.");
            return;
        }

        if (urls.length >= 5) {
            alert("You can only add up to 5 URLs.");
            return;
        }

        const shortCode = generateShortUrl();
        const shortUrl = `/go/${shortCode}`; // Use backticks to create a template string
        // Save URL in proper format

        const newUrl = { 
            id: Date.now(), 
            title, 
            originalUrl, 
            shortCode, // Save short code for lookup
            shortUrl, 
            addedTime: new Date().toLocaleString()
        };

        const updatedUrls = [...urls, newUrl];
        setUrls(updatedUrls);
        saveToStorage(user.username, updatedUrls);
        setTitle("");
        setOriginalUrl("");
    };

    // **Delete URL**
    const deleteUrl = (id) => {
        const updatedUrls = urls.filter(url => url.id !== id);
        setUrls(updatedUrls);
        saveToStorage(user.username, updatedUrls);
    };

    // **Edit URL**
    const editUrl = (id, newTitle) => {
        const updatedUrls = urls.map(url => 
            url.id === id ? { ...url, title: newTitle } : url
        );
        setUrls(updatedUrls);
        saveToStorage(user.username, updatedUrls);
    };

    // **Filter URLs Based on Search Query**
    const filteredUrls = searchQuery.trim()
        ? urls.filter(url =>
            url.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : urls; // If search is empty, show all URLs

    // **Pagination Logic (Hide Pagination When Searching)**
    const indexOfLastUrl = currentPage * urlsPerPage;
    const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
    const currentUrls = searchQuery ? filteredUrls : filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);

    return (
        <div className="container">
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="url" placeholder="Enter URL" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} required />
                <button type="submit">Shorten</button>
            </form>

            {/* Search Bar */}
            <input 
                type="text" 
                placeholder="Search by Title or URL..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <h3>Your Shortened URLs</h3>

            {/* Show "No results found" if search is empty */}
            {searchQuery.trim() && filteredUrls.length === 0 && (
                <p className="no-results">No results found.</p>
            )}

            {filteredUrls.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Short URL</th>
                            <th>Original URL</th>
                            <th>Added Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUrls.map((url) => (
                            <tr key={url.id}>
                                <td>
                                    <input 
                                        type="text" 
                                        defaultValue={url.title} 
                                        onBlur={(e) => editUrl(url.id, e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <Link to={url.originalUrl} target="_blank">
                                        {url.shortUrl}
                                    </Link>
                                </td>
                                <td>
                                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                                        {url.originalUrl}
                                    </a>
                                </td>
                                <td>{url.addedTime}</td>
                                <td>
                                    <button onClick={() => deleteUrl(url.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !searchQuery.trim() && <p>No URLs found.</p>
            )}

            {/* Show Pagination Only If Not Searching */}
            {!searchQuery.trim() && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span> Page {currentPage} </span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastUrl >= filteredUrls.length}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;  