import React, { useState } from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";

interface PasswordProps {
    onHandleSubmit: (passwordText: string) => void
}

export default function Password(props: PasswordProps) {
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.onHandleSubmit(password)
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="password">
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block size="lg" type="submit" style={{backgroundColor:"green"}}>
          Valider
        </Button>
      </form>
    </div>
  );
}