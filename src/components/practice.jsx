import { Input, TextArea } from "./fields";

export const Experience = function ({ info, handleChange }) {
  return (
    <fieldset>
      <legend>Practical Experience</legend>
      <Input
        label={"Company Name"}
        htmlFor={"companyName"}
        type={"text"}
        id={"companyName"}
        value={info.companyName}
        onChange={handleChange}
      />
      <Input
        label={"Position Title"}
        htmlFor={"positionTitle"}
        type={"text"}
        id={"positionTitle"}
        value={info.positionTitle}
        onChange={handleChange}
      />
      <TextArea
        label={"Main Responsibility"}
        htmlFor={"responsibility"}
        id={"responsibility"}
        value={info.responsibility}
        onChange={handleChange}
      />
      <Input
        label={"Start Date"}
        htmlFor={"startDate"}
        type={"date"}
        id={"startDate"}
        value={info.startDate}
        onChange={handleChange}
      />
      <Input
        label={"End Date"}
        htmlFor={"endDate"}
        type={"date"}
        id={"endDate"}
        value={info.endDate}
        onChange={handleChange}
      />
    </fieldset>
  );
};
