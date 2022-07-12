const checkUsername = (value) => {
  let isValid = true;
  let errorMsg = "";

  if (value.length < 5) {
    errorMsg = "The username must be greater than 5 letters";
    isValid = false;
  }

  return {
    isValid,
    errorMsg,
  };
};

const checkEmail = (value) => {
  let isValid = true;
  let errorMsg = "";

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    errorMsg = "The email does not look right. Did you type it correctly?";
    isValid = false;
  }

  return {
    isValid,
    errorMsg,
  };
};

export default { checkEmail, checkUsername };
