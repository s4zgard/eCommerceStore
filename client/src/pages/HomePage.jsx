import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../store/slices/productApiSlice";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
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
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword || ""}
          />
        </>
      )}
    </>
  );
};
export default HomePage;
