import { Button } from "./buttons";

export const CV = function ({ info, onClick }) {
  return (
    <div className="submit">
      <div>
        <h1>CV</h1>
        <fieldset>
          <legend>
            <h2>General Information</h2>
          </legend>
          <div>First Name: {info.firstName}</div>
          <div>Last Name: {info.lastName}</div>
          <div>Email: {info.email}</div>
          <div>Phone: {info.phone}</div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Educational Experience</h2>
          </legend>
          <div>School Name: {info.schoolName}</div>
          <div>Title of Study: {info.titleOfStudy}</div>
          <div>Date of Study: {info.dateOfStudy}</div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Practical Information</h2>
          </legend>
          <div>Company Name: {info.companyName}</div>
          <div>Position Title: {info.positionTitle}</div>
          <div>Responsibility: {info.responsibility}</div>
          <div>Start Date: {info.startDate}</div>
          <div>End Date: {info.endDate}</div>
        </fieldset>
      </div>

      <Button text={"Edit"} type={"button"} onClick={onClick} />
    </div>
  );
};
