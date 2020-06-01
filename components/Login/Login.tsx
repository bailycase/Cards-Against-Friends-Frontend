import React from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation, useRegisterUserMutation } from '../../__generated__/types';
import { Button, Box, Form, FormField, TextInput, Heading, Text } from 'grommet';

type FormStates = "Login" | "Register"
const LoginForm = () => {
  const [formType, setFormType] = React.useState<FormStates>("Login")
  const [loginUser, { data, error }] = useLoginUserMutation();
  const [email, setEmail] = React.useState<string>()
  const [password, setPassword] = React.useState<string>()
  const [registerUser, { data: registerData, error: registerError }] = useRegisterUserMutation()
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) return;
    loginUser({ variables: { email, password } });
  };
  const handleRegister = () => {
    if (!email || !password) return
    registerUser({ variables: { email, password } });
  }
  const handleSubmit = () => {
    if (formType === "Login") handleLogin()
    if (formType === "Register") handleRegister()

  }
  React.useEffect(() => {
    if (data) {
      const user = data.loginUser;
      dispatch({ type: 'LOGGED_IN', payload: user });
    }
    if (registerData) {
      const user = registerData.registerUser
      dispatch({ type: 'LOGGED_IN', payload: user });
    }
  }, [data, registerData]);
  if (error) console.log(error.message);
  return (
    <Box fill align="center" justify="center">
      <Box width="auto" elevation="large" pad="large" round="medium" alignContent="center" justify="evenly">
        <Heading>Please {formType}</Heading>
        <Form onSubmit={handleSubmit}>
          <FormField name="email" htmlFor="email-input" label="Email">
            <TextInput id="email-input" name="Email" onChange={(e: React.SyntheticEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
          </FormField>
          <FormField name="password" htmlFor="password-input" label="Password">
            <TextInput id="password-input" name="Password" onChange={(e: React.SyntheticEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} />
          </FormField>
          <Box margin={{ top: "large", bottom: "medium" }} direction="row" align="center" justify="between" alignSelf="end">
            <Text as="a" color="brand" weight="bold" onClick={() => setFormType(formType === "Register" ? "Login" : "Register")}>{formType === "Register" ? "Login" : "Register"}</Text>
            <Button type="submit" primary label="Login" size="large" alignSelf="end" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default LoginForm;
