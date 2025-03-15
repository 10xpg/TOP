import { Input } from "./fields";

export const General = function ({ info, handleChange }) {
  return (
    <fieldset>
      <legend>General Information</legend>
      <Input
        label={"First Name"}
        htmlFor={"firstName"}
        type={"text"}
        id={"firstName"}
        value={info.firstName}
        onChange={handleChange}
      />
      <Input
        label={"Last Name"}
        htmlFor={"lastName"}
        type={"text"}
        id={"lastName"}
        value={info.lastName}
        onChange={handleChange}
      />
      <Input
        label={"Email"}
        htmlFor={"email"}
        id={"email"}
        type={"email"}
        value={info.email}
        onChange={handleChange}
      />
      <Input
        label={"Phone"}
        htmlFor={"phone"}
        id={"phone"}
        type={"tel"}
        value={info.phone}
        onChange={handleChange}
      />
    </fieldset>
  );
};
