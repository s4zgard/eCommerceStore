import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../store/slices/productApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";

const ProductEditPage = () => {
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();

  const {
    currentData: product,
    isFetching,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      price === 0 ||
      !brand ||
      !category ||
      countInStock === 0 ||
      !description
    ) {
      toast.error("All fields are required");
      return;
    }

    const updatedProduct = {
      _id: productId,
      name,
      price,
      brand,
      image,
      category,
      countInStock,
      description,
    };

    try {
      await updateProduct(updatedProduct).unwrap();
      refetch();
      toast.success("Product updated.");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <Link to="/admin/products">Go Back</Link>
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
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter product name."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price" className="my-2">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              labe="Choose Image"
              onChange={handleUpload}
              accept="image/png, image/jpeg"
            />
          </Form.Group>

          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Product Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product brand."
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category" className="my-2">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product category."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Product Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product count in stock."
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-2">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product description."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" disabled={updating}>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ProductEditPage;
