import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTopSellers() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
    setTopSellers(data);
  }

  useEffect(() => {
    fetchTopSellers();
    setIsLoading(false);
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade">
            <ol className="author_list">
              {isLoading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">
                        <Skeleton width={"100px"} height={"30px"} />
                      </Link>
                      <span><Skeleton width={"40px"} height={"20px"} /></span>
                    </div>
                  </li>
                ))
              ) : (
                topSellers.map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${topSellers[index].authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={topSellers[index].authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${topSellers[index].authorId}`}>{topSellers[index].authorName}</Link>
                      <span>{topSellers[index].price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
