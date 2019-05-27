import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import LatestBlogs from "../components/latestBlog"
import StarRatingComponent from 'react-star-rating-component';

class IndexPost extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { data } = this.props;

    return (
      <React.Fragment>
        <div className="row product-main">
          {data.data.allContentfulProduct.edges.map(items => (
            <div className="Catalogue__item col-sm-4" key={items.node.id}>
              <div className="details_List">
                {items.node.image === null ? <div className="no-image">No Image</div> : <Img sizes={items.node.image.fixed} />}

                <div className="details_inner">

                  <h2>
                    <Link to={`/${items.node.slug}`}>{items.node.name}</Link>
                  </h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={items.node.rating}
                  />
                  <p>{items.node.details.childMarkdownRemark.excerpt}</p>
                  <div className="row">
                    <div className="col-sm-4">
                      <span className="price">${items.node.price}</span>
                    </div>
                    <div className="col-sm-8 text-right">
                      <a
                        href="#"
                        className="Product snipcart-add-item"
                        data-item-id={items.node.slug}
                        data-item-price={items.node.price}
                        data-item-image={items.node.image === null ? "" : items.node.image.fixed.src}
                        data-item-name={items.node.name}
                        data-item-url={`/`}
                      >
                        <i className="fas fa-shopping-bag" />Add to Cart
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const IndexPage = data => (

  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
    <LatestBlogs data={data.data.allContentfulBlogs} />
    <div className="container">
      <div className="text-center"><h2 className="with-underline">Latest Items</h2></div>
      <IndexPost data={data}></IndexPost>
    </div>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query AboutQuery {
    allContentfulProduct(limit: 6,sort:{fields:createdAt,order: DESC}){
      edges{
        node{
          id
          name
          slug
          rating
          image {
            fixed(width: 1000, height: 500) {
              width
              height
              src
              srcSet
            }
          }
          price
          details {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
    allContentfulHeaderBanner {
      edges {
        node {
          title
          subHeading
          image {
            fixed(width: 1800, height: 500) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
    contentfulDealCountDown {
      title
      featureImage {
        fixed(width: 1800, height: 500) {
          width
          height
          src
          srcSet
        }
      }
      date(formatString: "MMMM D, YYYY")
    }
    allContentfulBlogs(limit: 3,sort:{fields:createdAt,order: DESC}) {
      edges {
        node {
          id
          title
          slug
          featureImage {
            fixed(width: 1120, height: 500) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  }
`



