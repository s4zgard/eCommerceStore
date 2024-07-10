import { Link } from "react-router-dom";
import { Button, Col, Row, Table, Spinner } from "react-bootstrap";
import { FaEdit, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../store/slices/productApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProductsListPage = () => {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const handleCreate = async () => {
    if (window.confirm("Are you sure you want to create a product?")) {
      try {
        await createProduct().unwrap();
        refetch();
        toast.success("Product created successfully.");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
        toast.success("Product deleted successfully.");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            disabled={creating}
            className="btn-sm m-3"
            onClick={handleCreate}
          >
            {creating ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FaRegPlusSquare /> Create Product
              </>
            )}
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || "An error occurred"}
        </Message>
      ) : (
        <Table striped responsive hover className="table-responsive-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/edit/${product._id}`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm mx-2"
                    disabled={deleting}
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsListPage;
