import React, { useState } from 'react';
import './SkillUpForm.css';

const SkillUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can add the logic to handle form submission here.
        console.log(`Name: ${name}, Email: ${email}`);
    };

    return (
        <form onSubmit={handleSubmit} className="skill-up-form">
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SkillUpForm;