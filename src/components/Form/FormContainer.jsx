import React, { useActionState, useEffect } from "react";

const initalState = {
  message: "",
};
const FormContainer = ({ action, children }) => {
  const [state, formAction] = useActionState(action, initalState);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
