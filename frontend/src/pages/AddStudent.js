import React, { useState } from 'react';
import { createStudent } from '../lib/api.js'

function AddStudent() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userMessage, setUserMessage] = useState({ 'status': null, 'message': null })

    function setSuccessMessage() {
        setUserMessage({
            'status': 'success',
            'message': 'Student has been successfully added to the database.'
        });

        setTimeout(() => {
            setUserMessage({ 'status': null, 'message': null })
        }, 100000);
    }

    function setErrorMessage() {
        setUserMessage({
            'status': 'error',
            'message': 'There has been an error, please try again later (please see console for additional information).'
        });

        setTimeout(() => {
            setUserMessage({ 'status': null, 'message': null })
        }, 5000);
    }

    async function onSumbitHandler(e) {
        e.preventDefault();
        try {
            await createStudent(firstname, lastname);
            setSuccessMessage();
            setFirstname('');
            setLastname('');
        }
        catch(error) {
            setErrorMessage();
            console.log(error.toString());
        }
    }

    return (
        <main>
            <form>
                <label for="firstname">First name:</label>
                <input id="firstname" name="firstname" type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                />

                <label for="lastname">Last name:</label>
                <input id="lastname" name="lastname" type="text"
                    onChange={(e) => setLastname(e.target.value)}
                />

                <button onClick={onSumbitHandler} type='submit'>
                    Create
                </button>
            </form>

            {userMessage.status &&
                <div className={userMessage.status}>
                    {userMessage.message}
                </div>
            }
        </main>
    );
}

export default AddStudent;
