import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/slices/userApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

const UserEditPage = () => {
  const { userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const {
    currentData: user,
    isFetching,
    refetch,
    error,
  } = useGetUserByIdQuery(userId);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("All fields are required");
      return;
    }

    const updatedUser = {
      _id: userId,
      name,
      email,
      isAdmin,
    };

    try {
      await updateUser(updatedUser).unwrap();
      refetch();
      toast.success("User updated.");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Link to="/admin/users">Go Back</Link>
      {updating && <Loader />}
      {isFetching ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error.data?.message || error.error || "An error occurred"}
        </Message>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter user name."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter user email."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="isAdmin" className="my-2">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" disabled={updating}>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UserEditPage;
