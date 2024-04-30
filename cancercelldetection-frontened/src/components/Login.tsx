import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API call for demonstration (replace with actual API call)
    setTimeout(() => {
      // Validate email and password (replace with actual validation)
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        // If validation passes, you can redirect or perform any desired action
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </FormControl>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" colorScheme="blue" isLoading={isLoading}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}

export default Login;
