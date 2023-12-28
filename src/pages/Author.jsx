import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const {id} = useParams();
  const [authorData, setAuthorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);

  async function fetchAuthorData() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
    setAuthorData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
  }, []);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    setAuthorData(prevData => ({
      ...prevData,
      followers: isFollowed ? prevData.followers - 1 : prevData.followers + 1,
    }));
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          {isLoading ? (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={"150px"} height={"150px"} borderRadius={"50%"} />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={"200px"} />
                            <span className="profile_username"><Skeleton width={"100px"} /></span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={"250px"} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={"150px"} height={"40px"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                  {new Array(8).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      style={{ display: "inline-block", backgroundSize: "cover" }}
                    >
                      <Skeleton width={"100%"} height={"400px"} />
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">@{authorData.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{authorData.followers} followers</div>
                        <Link to="#" className="btn-main" onClick={handleFollow}>
                          {isFollowed ? (
                            "Unfollow"
                          ):(
                            "Follow"
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={authorData}/>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Author;
