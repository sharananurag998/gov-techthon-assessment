import React, {useState, useEffect} from 'react';
import './style.css';
import {db} from '../firebase';

function ResultPage() {
    const [architectResults, setArchitectResults] = useState([]);
    const [codingResults, setCodingResults] = useState([]);
    const [requirementResults, setRequirementResults] = useState([]);
    const [finalResults, setFinalResults] = useState([]);
    const [grandResults, setGrandResults] = useState([]);
    
    useEffect(() => {
        var temp = [];
        console.log("Hello");
        db.collection("marks")
        .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if(doc.data().phase==="Requirement"){
                setRequirementResults(oldArray => [...oldArray, doc.data()]);
            }
            else if(doc.data().phase=="ArchitectDesign"){
                setArchitectResults(oldArray => [...oldArray, doc.data()]);
            }
            else if(doc.data().phase=="CodingTesting"){
                setCodingResults(oldArray => [...oldArray, doc.data()]);
            }
            else if(doc.data().phase=="Final"){
                setFinalResults(oldArray => [...oldArray, doc.data()]);
            }
            else if(doc.data().phase=="Grand"){
                setGrandResults(oldArray => [...oldArray, doc.data()]);
            }
            });
        })
    }, [])

    return (
        <div className="result_page">
            <h1>Results</h1>
            <h3>Requirement Phase Results: -</h3>
            <table style={{width:"100%"}}>
                <tr>
                    <th>Team Number</th>
                    <th>Group</th>
                    <th>Jury Name</th>
                    <th>Marks</th>
                </tr>
                <tbody>
            {requirementResults.map((data)=>(
                <tr>
                    <td>{data.teamId}</td>
                    <td>{data.group}</td>
                    <td>{data.juryName}</td>
                    <td>{data.score}</td>
                </tr>

            ))}
            </tbody>
            </table>
            <h3>Architect Design Phase Results: -</h3>
            <table style={{width:"100%"}}>
                <thead>
                <tr>
                    <th>Team Number</th>
                    <th>Group</th>
                    <th>Jury Name</th>
                    <th>Marks</th>
                </tr>
                </thead>
                <tbody>
            {architectResults.map((data)=>(
                <tr>
                    <td>{data.teamId}</td>
                    <td>{data.group}</td>
                    <td>{data.juryName}</td>
                    <td>{data.score}</td>
                </tr>
            ))}
            </tbody>
            </table>
            <h3>Coding and Testing Phase Results: -</h3>
            <table style={{width:"100%"}}>
            <thead>
                <tr>
                    <th>Team Number</th>
                    <th>Group</th>
                    <th>Jury Name</th>
                    <th>Marks</th>
                </tr>
                </thead>
                <tbody>
            {codingResults.map((data)=>(
                
                <tr>
                    <td>{data.teamId}</td>
                    <td>{data.group}</td>
                    <td>{data.juryName}</td>
                    <td>{data.score}</td>
                </tr>

            ))}
            </tbody>
            </table>
            <h3>Final Phase Results: -</h3>
            <table style={{width:"100%"}}>
                <thead>
                <tr>
                    <th>Team Number</th>
                    <th>Group</th>
                    <th>Jury Name</th>
                    <th>Marks</th>
                </tr>
                </thead>
                <tbody>
            {finalResults.map((data)=>(
                <tr>
                    <td>{data.teamId}</td>
                    <td>{data.group}</td>
                    <td>{data.juryName}</td>
                    <td>{data.score}</td>
                </tr>

            ))}
            </tbody>
            </table>
            <h3>Grand Phase Results: -</h3>
            <table style={{width:"100%"}}>
                <thead>
                <tr>
                    <th>Team Number</th>
                    <th>Group</th>
                    <th>Jury Name</th>
                    <th>Marks</th>
                </tr>
                </thead>
                <tbody>
            {grandResults.map((data)=>(
                <tr>
                    <td>{data.teamId}</td>
                    <td>{data.group}</td>
                    <td>{data.juryName}</td>
                    <td>{data.score}</td>
                </tr>

            ))}
            </tbody>
            </table>
        </div>
    )
}

export default ResultPage;
