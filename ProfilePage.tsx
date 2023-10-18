import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from 'rc-slider';
import './Prof.css';
import {uDB} from "./LoginPage";


function ProfilePage() {
    const [interestValue, setInterestValue] = useState(1);
    const [availabilityValue, setAvailabilityValue] = useState(1);
    const [teamExperienceValue, setTeamExperienceValue] = useState(1);
    const [ExperienceValue, setExperienceValue] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);


    const handleInterestChange = (newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setInterestValue(newValue);
        } else {
            setInterestValue(newValue[0]);
        }
    };


    const handleAvailabilityChange = (newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setAvailabilityValue(newValue);
        } else {
            setAvailabilityValue(newValue[0]);
        }
    };


    const handleTeamExperienceChange = (newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setTeamExperienceValue(newValue);
        } else {
            setTeamExperienceValue(newValue[0]);
        }
    };


    const handleExperienceChange = (newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setExperienceValue(newValue);
        } else {
            setExperienceValue(newValue[0]);
        }
    };


    const handleAnswerSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOption = event.target.value;
        const updatedAnswers = [...selectedAnswers];


        if (updatedAnswers.includes(selectedOption)) {
            const index = updatedAnswers.indexOf(selectedOption);
            if (index !== -1) {
                updatedAnswers.splice(index, 1);
            }
        } else {
            updatedAnswers.push(selectedOption);
        }


        setSelectedAnswers(updatedAnswers);
    };
    /* Pushes answers into the array of strings from dropdown */
    const handleSubmission = () => {


        alert("Submitted!");




    };


    const location = useLocation();


    return (
        <div className="login_page" id="login">

            <h3>Welcome User</h3>
            <h3>{location.state.email}!</h3>

            <h3>Personal Information</h3>


            <div className="slider-container">
                <label>Interest:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={interestValue}
                    onChange={handleInterestChange}
                />
                <div>Selected value: {interestValue}</div>
            </div>


            <div style={{ margin: '20px' }}></div> {/* Add spacing between sliders */}


            <div className="slider-container">
                <label>Availability Lineup:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={availabilityValue}
                    onChange={handleAvailabilityChange}
                />
                <div>Selected value: {availabilityValue}</div>
            </div>


            <div style={{ margin: '20px' }}></div>


            <div className="slider-container">
                <label>Team Experience:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={teamExperienceValue}
                    onChange={handleTeamExperienceChange}
                />
                <div>Selected value: {teamExperienceValue}</div>
            </div>




            <h4>Experience</h4>
            <div className="slider-container">
                <label>Experience:</label>
                <Slider
                    className="ProfileSlider"
                    min={0}
                    max={100}
                    step={1}
                    value={ExperienceValue}
                    onChange={handleExperienceChange}
                />
                <div>Selected value: {ExperienceValue}</div>
            </div>


            <div className="question">
                <h2>Availability</h2>
                <form id="quiz-form">
                    <input type="checkbox" name="answer" id="Mondays" value="Mondays" onChange={handleAnswerSelection} />
                    <label htmlFor="Mondays">Mondays</label><br />
                    <input type="checkbox" name="answer" id="Tuesdays" value="Tuesdays" onChange={handleAnswerSelection} />
                    <label htmlFor="Tuesdays">Tuesdays</label><br />
                    <input type="checkbox" name="answer" id="Wednesdays" value="Wednesdays" onChange={handleAnswerSelection} />
                    <label htmlFor="Wednesdays">Wednesdays</label><br />
                    <input type="checkbox" name="answer" id="Thursdays" value="Thursdays" onChange={handleAnswerSelection} />
                    <label htmlFor="Thursdays">Thursdays</label><br />
                    <input type="checkbox" name="answer" id="Fridays" value="Fridays" onChange={handleAnswerSelection} />
                    <label htmlFor="Fridays">Fridays</label><br />
                </form>
                <button onClick={handleSubmission}>Submit</button>
            </div>




            <div>


            </div>
        </div>


    );
}


export default ProfilePage;





