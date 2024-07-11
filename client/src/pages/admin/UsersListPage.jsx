import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaPencilAlt, FaTimes, FaTrash } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../store/slices/userApiSlice";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const UsersListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully.");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table hover striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/edit/${user._id}`}>
                    <Button variant="light" className="btn btn-sm">
                      <FaEdit />
                    </Button>
                  </Link>
                  {!user.isAdmin && (
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                      disabled={deleting}
                      className="btn btn-sm"
                    >
                      <FaTrash />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default UsersListPage;
