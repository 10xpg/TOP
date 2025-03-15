import { Input } from "./fields";

export const Education = function ({ info, handleChange }) {
  return (
    <fieldset>
      <legend>Educational Experience</legend>
      <Input
        label={"School Name"}
        htmlFor={"schoolName"}
        type={"text"}
        id={"schoolName"}
        value={info.schoolName}
        onChange={handleChange}
      />
      <Input
        label={"Title of Study"}
        htmlFor={"titleOfStudy"}
        type={"text"}
        id={"titleOfStudy"}
        value={info.titleOfStudy}
        onChange={handleChange}
      />
      <Input
        label={"Date of Study"}
        htmlFor={"dateOfStudy"}
        id={"dateOfStudy"}
        type={"date"}
        value={info.dateOfStudy}
        onChange={handleChange}
      />
    </fieldset>
  );
};
