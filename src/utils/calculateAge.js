import moment from "moment";

export const calculateAge = (dob) => {
  const birthDate = moment(dob, "DD-MM-YYYY");
  const age = moment().diff(birthDate, "years");
  return age;
};

