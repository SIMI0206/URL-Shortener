import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFromStorage } from "../utils/storage";

const Redirect = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let foundUrl = null;
        const allUsers = Object.keys(localStorage);

        // Search through all users' URLs to find the matching shortCode
        for (let user of allUsers) {
            const userUrls = getFromStorage(user) || [];
            const matchedUrl = userUrls.find(url => url.shortCode === shortCode);
            if (matchedUrl) {
                foundUrl = matchedUrl.originalUrl;
                break;
            }
        }

        if (foundUrl) {
            window.location.href = foundUrl; // Redirect to the original URL
        } else {
            navigate("/not-found"); // Redirect to a 404 page if not found
        }
    }, [shortCode, navigate]);

    return <h2>Redirecting...</h2>;
};

export default Redirect;
