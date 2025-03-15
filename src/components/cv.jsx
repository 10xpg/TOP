import { Button } from "./buttons";

export const CV = function ({ info, onClick }) {
  return (
    <>
      <div>
        <h1>CV</h1>
        <h2>General Information</h2>
        <div>First Name: {info.firstName}</div>
        <div>Last Name: {info.lastName}</div>
        <div>Email: {info.email}</div>
        <div>Phone: {info.phone}</div>
        <h2>Educational Experience</h2>
        <div>School Name: {info.schoolName}</div>
        <div>Title of Study: {info.titleOfStudy}</div>
        <div>Date of Study: {info.dateOfStudy}</div>
        <h2>Practical Information</h2>
        <div>Company Name: {info.companyName}</div>
        <div>Position Title: {info.positionTitle}</div>
        <div>Responsibility: {info.responsibility}</div>
        <div>Start Date: {info.startDate}</div>
        <div>End Date: {info.endDate}</div>
      </div>
      <div>
        <Button text={"Edit"} type={"button"} onClick={onClick} />
      </div>
    </>
  );
};
