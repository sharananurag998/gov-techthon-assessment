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
        <div className="phases__container">
            <p>Name: {name?name:"Jury Not in DB"}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <h2 className="phases__heading">Select the Phase to Evaluate</h2>

            <p className="phases__name">
                Phase 1
                <a href="http://google.com" target="_self">
                    <button className="phase__buttonEvaluate">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 2
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 3
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 4
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 5
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

        </div>
    )
}

export default Phases;
