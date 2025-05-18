// Destructure the user object to remove sensitive or unnecessary fields before sending to the client
module.exports = (userDoc) => {
  const {
    password,
    __v,
    updatedAt,
    ...safeUserToSend
  } = userDoc._doc || userDoc;

  return safeUserToSend;
};
