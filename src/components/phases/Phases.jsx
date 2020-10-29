import React,{useEffect, useState} from 'react'
import './Phases.css';
import {db, firebase} from '../firebase';

function Phases({user}) {
    const [name, setName]= useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null)
    const [details, setDetails] = useState(null);
    useEffect(async() => {
        const usr = firebase.auth().currentUser;
        const snapshot = await db.collection("jury").get();
        setDetails(snapshot.docs.reduce(function (acc, doc, i) {
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
    useEffect(() => {
    }, [])
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
                    1. <a href="http://google.com" target="_self">Requirement Assessment</a>
                </p>

                <p>
                    2. <a href="http://google.com" target="_self">Architect-Design Assessment</a>
                </p>

                <p>
                    3. <a href="http://google.com" target="_self">Coding, Testing Assessment</a>
                </p>

                <p>
                    4. <a href="http://google.com" target="_self">Final Assessment</a>
                </p>

                <p>
                    5. <a href="http://google.com" target="_self">Grand Assessment</a>
                </p>

            </div>
        </div>
    )
}

export default Phases;
