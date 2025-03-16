import { useState } from "react";
import { General, Education, Experience, CV } from ".";
import { Button } from "./buttons";
import "../styles/styles.css";

export const Form = function () {
  const initialInfo = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    schoolName: "",
    titleOfStudy: "",
    dateOfStudy: "",
    companyName: "",
    positionTitle: "",
    responsibility: "",
    startDate: "",
    endDate: "",
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [info, setInfo] = useState(initialInfo);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", info);
    setIsSubmitted(true);
  };

  const handleClick = (e) => {
    e.target.value;
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <CV info={info} onClick={handleClick} />;
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <h1>CV Builder</h1>
      <General info={info} handleChange={handleChange} />
      <Education info={info} handleChange={handleChange} />
      <Experience info={info} handleChange={handleChange} />
      <Button text={"Submit"} type={"submit"} />
    </form>
  );
};
