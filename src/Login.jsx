import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Navbar } from "react-bootstrap";
import { login, signup } from "./api";

function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!isLogin && !name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      if (isLogin) {
        const data = await login({ email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/dashboard");
      } else {
        const data = await signup({ name, email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#5bc236" }} className="px-5 justify-content-between">
        <Navbar.Brand className="text-white fw-bold mx-auto">S P L I T W I S E</Navbar.Brand>
        <div className="position-absolute end-0 me-4">
          <Button variant={isLogin ? "outline-light" : "light"} size="sm" className="me-2" onClick={() => setIsLogin(true)}>
            Log in
          </Button>
          <Button variant={!isLogin ? "outline-light" : "light"} size="sm" onClick={() => setIsLogin(false)}>
            Sign up
          </Button>
        </div>
      </Navbar>

      <Container fluid className="mt-5">
        <Row className="align-items-center justify-content-center">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <div style={{ width: "260px", height: "260px", borderRadius: "50%", backgroundColor: "#5f8c74", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "#f3efd7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px", fontWeight: "bold", color: "#4f6f5c" }}>
                $
              </div>
            </div>
          </Col>

          <Col md={4}>
            <p className="text-uppercase text-muted mb-1">Introduce yourself</p>
            <h4 className="mb-4">{isLogin ? "Welcome back!" : "Hi there! My name is"}</h4>

            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <Form onSubmit={handleSubmit} noValidate>
              {!isLogin && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" style={{ backgroundColor: "#ff652f", border: "none" }} className="px-4 py-2 w-100">
                {isLogin ? "Log in" : "Sign me up!"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
