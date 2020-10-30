import React,{useEffect, useRef, useState} from 'react'
import './Phases.css';
import {db, firebase} from '../firebase';
import { Link } from 'react-router-dom'

function Phases({user}) {
    const [name, setName]= useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null)
    const [details, setDetails] = useState(null);


    useEffect(async () => {
        const usr = firebase.auth().currentUser;
        const snapshot = await db.collection("jury").get();
        setDetails(snapshot.docs.reduce((acc, doc, i) => {
            acc[doc.id] = doc.data();
            return acc;
        }, {}));
        if(details){
            Object.keys(details).map(function(key, index) {
            if(details[key].phone == usr.phoneNumber)
            {
                setName(details[key].name);
                setPhone(details[key].phone);
                setEmail(details[key].email);
                console.log("User found in db");
            }else{
                console.log("User not in db");
            }
        });
        }

    }, [details])

    return (
        <div className="body__container">
            <div className="jury__detail">
                <h3>
                <p>Name: {name?name:"Jury Not in DB"}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                
                </h3>
                <h3>
                    Group: AI-Crop Recommendation
                </h3>
            </div>

            <div className="phases__heading">
                <h2>Select the Phase to Evaluate</h2>
            </div>

            <div className="phases__container">
                <p>
                    1. <Link to="/phases/Requirement" target="_self">Requirement Assessment</Link>
                </p>

                <p>
                    2. <Link to="/phases/ArchitectDesign" target="_self">Architect-Design Assessment</Link>
                </p>

                <p>
                    3. <Link to="/phases/CodingTesting" target="_self">Coding, Testing Assessment</Link>
                </p>

                <p>
                    4. <Link to="/phases/Final" target="_self">Final Assessment</Link>
                </p>

                <p>
                    5. <Link to="/phases/Grand" target="_self">Grand Assessment</Link>
                </p>

            </div>
        </div>
    )
}

export default Phases;
