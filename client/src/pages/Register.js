import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";

export default function Register(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="userName"
          type="text"
          error={errors.userName ? true : false}
          value={values.userName}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div calssName="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;
