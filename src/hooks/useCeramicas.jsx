import { useEffect, useState } from "react";
import ceramicasAPI from "../config/ceramicasAPI";

const useCeramicas = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ceramicas, setCeramicas] = useState([]);

    useEffect(() => {
        const fetchAllCeramicas = async () => {
            try {
                const resp = await ceramicasAPI.get('/comments');
                setCeramicas(resp.data)
                setIsLoading(false)
                return resp.data;
            } catch (error) {
                console.error("Error fetching ceramicas:", error);
                return [];
            }
        };

        fetchAllCeramicas();
    }, []);

    return [isLoading, ceramicas];
};

export default useCeramicas;