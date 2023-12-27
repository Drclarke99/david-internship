import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  
  async function fetchExploreItems() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setExploreItems(data);
  }

  async function fetchItemsByFilter(filter) {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`);
    setExploreItems(data);
  }

  useEffect(() => {
    fetchExploreItems();
    setIsLoading(false);
  }, []);

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => fetchItemsByFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading ? (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Skeleton width={"100%"} height={"400px"} />
          </div>
        ))
      ) : (
        exploreItems.slice(0, visibleItems).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${exploreItems[index].authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={exploreItems[index].authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {(exploreItems[index].expiryDate !== null) ? (
                <Countdown expiryDate={exploreItems[index].expiryDate}/>
              ) : (
                <></>
              )}
  
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img src={exploreItems[index].nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{exploreItems[index].title}</h4>
                </Link>
                <div className="nft__item_price">{exploreItems[index].price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{exploreItems[index].likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
