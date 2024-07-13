import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../store/slices/productApiSlice";
import Paginate from "../components/Paginate";

const HomePage = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery(pageNumber);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 className="text-black-50">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};
export default HomePage;
