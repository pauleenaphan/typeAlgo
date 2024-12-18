import { useEffect, useState } from "react";
import { Algorithm } from "../types/algorithmTypes";
import algo from "../../data/algorithms.json";

export const Homepage = () => {
    const [algorithm, setAlgorithm] = useState<Algorithm | null>(null); // Use correct type
    const [codingLan, setCodingLan] = useState<string>("cpp"); // Choose what language to code in
    const [userCode, setUserCode] = useState<string>(""); // State to hold the user input in the textarea
    const [formattedCode, setFormattedCode] = useState<string>("");

    // Language to code property map
    const languageCodeMap: { [key: string]: keyof Algorithm } = {
        cpp: "cppCode",
        java: "javaCode",
        python: "pythonCode"
    };

    useEffect(() => {
        // Randomly pick an algorithm from the imported JSON data
        const randomAlgorithm = algo[Math.floor(Math.random() * algo.length)];
        setAlgorithm(randomAlgorithm);
        setUserCode(""); 
    }, []);

    useEffect(() => {
        if (algorithm) {
            // Get the code for the selected language
            const code = algorithm[languageCodeMap[codingLan]];
            // Format the code and update the formattedCode state
            setFormattedCode(formatCode(code || ""));
        }
    }, [algorithm, codingLan]);


    const formatCode = (code: string) =>{
        return code.replace(/\[oneTab\]/g, "    ")
        .replace(/\[twoTab\]/g, "        ")
        .replace(/\[threeTab\]/g, "            ")
    }


    const handleTabPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault(); // Prevent default tab behavior

            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;

            // Insert 4 spaces at the cursor position
            setUserCode((prevCode) => 
                prevCode.substring(0, start) + "    " + prevCode.substring(end)
            );

            // Move the cursor forward by 4 characters
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
        }
    };


    // Handle input change in the textarea
    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserCode(e.target.value);
        colorChange(e.target.value);
    };

    const colorChange = (currCode: string) =>{

        for(let i = 0; i < currCode?.length; i++){
            if(currCode[i] !== formattedCode[i]){
                console.log(formattedCode[i]);
            }
        }
    }

    return (
        <>
            <h1>This is the homepage</h1>
            {algorithm ? (
                <div>
                    <h2>{algorithm.name}</h2>
                    <p>{algorithm.description}</p>
                    <select onChange={(e) => setCodingLan(e.target.value)} value={codingLan}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                    <div>
                        <h3>Original Code</h3>
                        <pre>{formattedCode}</pre>
                    </div>
                    <a href={algorithm.ref}>GeekforGeeks Reference</a>

                    {/* Textarea for user to type code */}
                    <textarea
                        value={userCode} 
                        onChange={handleCodeChange} // Update the userCode state as user types
                        onKeyDown={handleTabPress}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};
