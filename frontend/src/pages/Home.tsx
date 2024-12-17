import { useEffect, useState } from "react";
import algo from "../../data/algorithms.json";

export const Homepage = () =>{
    const [algorithm, setAlgorithm] = useState<any>(null);  // Use any or create a type for better type-checking

    useEffect(() => {
        // Randomly pick an algorithm from the imported JSON data
        const randomAlgorithm = algo[Math.floor(Math.random() * algo.length)];
        setAlgorithm(randomAlgorithm);
    }, []);


    return(
        <>
            <h1>This is the homepage</h1>
            {algorithm ? (
                <div>
                    <h2>{algorithm.name}</h2>
                    <p>{algorithm.description}</p>
                    <pre>{algorithm.pythonCode}</pre>  {/* Displaying code as is */}
                    <a href={algorithm.ref}> geekforgeek ref </a>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}