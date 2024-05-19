import {
  Accordion,
  CloseButton,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
import "./Home.scss";
import { FcSimCardChip } from "react-icons/fc";
import { FaBookmark } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaOutdent } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaSortDown } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BiWorld } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { FcIdea } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { FaRegThumbsUp } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { ImLoop } from "react-icons/im";
import { FiSend } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPost,
  deletePost,
  addNewPost,
  updatePost,
  hideLinkedInPost,
} from "../../redux/postReducer/action";

const Home = () => {
  //////////////////=========create Part Start ===========//////////////////////////////

  //post modal show hide state
  const [postModal, setpostModal] = useState(false);

  const dispatch = useDispatch();

  //state for perv images
  const [postPhoto, setPostPhoto] = useState([]);

  //handleUpPhoto for preview images
  const handleUpPhoto = (e) => {
    setPostPhoto((prevState) => [...prevState, ...Array.from(e.target.files)]);
  };

  //handleRemovePhoto for preview post img
  const handleRemovePhoto = (item) => {
    const previmg = postPhoto.filter((data) => data !== item);
    setPostPhoto(previmg);
  };
  const { posts } = useSelector((state) => state.post);

  //crate post data state
  const [createPost, setCreatePost] = useState({
    post: "",
    photo: "",
  });

  //post modal show
  const handleShowPostModal = () => {
    setpostModal(true);
  };

  //post modal hide
  const handleHidePostModal = () => {
    setpostModal(false);
  };

  //get post data item
  const handleInputChange = (e) => {
    setCreatePost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //submit post data
  const postDataSubmit = async (e) => {
    e.preventDefault();
    dispatch(addNewPost(createPost));
    setCreatePost({
      post: "",
      photo: "",
    });
    setpostModal(false);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //////////////////=========create Part End ===========//////////////////////////////

  //////////////////=========Delete post start ===========//////////////////////////////

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  //////////////////=========Delete post end ===========//////////////////////////////

  //////////////////=========Edit post data start ===========//////////////////////////////
  //show edit modal
  const [postEditModal, setPostEditModal] = useState(false);

  //edit data update
  const [editPost, setEditPost] = useState({
    post: "",
    photo: "",
  });

  //update edit data
  const handleEditPost = async (id) => {
    setPostEditModal(true);

    const editData = await axios.get(
      `http://localhost:6060/linkedinposts/${id}`
    );
    setEditPost(editData.data);
  };

  //hide edit show
  const handleHidePostEdit = () => {
    setPostEditModal(false);
  };

  //input handler chanage
  const handleInputEdit = (e) => {
    setEditPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // updated value submmit
  const editDataSubmit = async (e) => {
    e.preventDefault();
    dispatch(updatePost(editPost));
    setPostEditModal(false);
  };

  ///hide post
  const handleHiddenPost = (id) => {
    dispatch(hideLinkedInPost(id));
  };
  const [postWith, setPostWith] = useState(false);

  const checkScreenSize = () => {
    setPostWith(window.innerWidth < 768);
  };

  //handleShowMore
  const butoon = document.querySelector(
    ".accordion-item:last-of-type .accordion-button.collapsed"
  );
  const handleShowMore = () => {
    butoon.style.display = "none";
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    dispatch(getAllPost());
  }, []);
  //////////////////=========Edit post data start ===========//////////////////////////////

  return (
    <>
      {/* edit modal */}
      <Container>
        <Row>
          <Col md={6}>
            <Modal show={postEditModal}>
              <Modal.Header className="post-modal-header">
                <div className="user-profile-info">
                  <div className="profile-pic">
                    <img
                      src="https://media.licdn.com/dms/image/D5603AQE14jrOMsBZzw/profile-displayphoto-shrink_100_100/0/1692680339641?e=1708560000&v=beta&t=sFYPWeh_WFsEKPXIX0Zmq2lA_EH5du2cIHBLK8l9c9w"
                      alt=""
                    />
                  </div>
                  <div className="user-info">
                    <h6>
                      Johurul islam{" "}
                      <span>
                        <FaSortDown />
                      </span>
                    </h6>
                    <p>Post to Anyone</p>
                  </div>
                </div>
                <i onClick={handleHidePostEdit}>
                  <RxCross2 />
                </i>
              </Modal.Header>
              <form onSubmit={editDataSubmit}>
                <Modal.Body className="post-body">
                  <textarea
                    name="post"
                    id=""
                    cols="50"
                    rows="10"
                    placeholder="What do you want to talk about?"
                    onChange={handleInputEdit}
                    value={editPost.post}
                  ></textarea>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Give media link here"
                    className="form-control"
                    onChange={handleInputEdit}
                    value={editPost.photo}
                  />

                  <div className="imgogi">
                    <i>
                      {" "}
                      <FaRegSmile />{" "}
                    </i>
                  </div>
                  <div className="addmedia">
                    <div className="add-item">
                      <div className="image">
                        <i>
                          {" "}
                          <FaImage />{" "}
                        </i>
                      </div>
                    </div>

                    <div className="event">
                      <i>
                        {" "}
                        <FaCalendarAlt />{" "}
                      </i>
                    </div>
                    <div className="celebrate">
                      <i>
                        {" "}
                        <CiCircleMore />{" "}
                      </i>
                    </div>
                    <div className="more">
                      <i>
                        {" "}
                        <BsThreeDots />{" "}
                      </i>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                  <i>
                    {" "}
                    <IoTimeOutline />{" "}
                  </i>
                  <button type="submit"> Post </button>
                </Modal.Footer>
              </form>
            </Modal>
          </Col>
        </Row>
      </Container>

      {/* post modal */}
      <Container>
        <Row>
          <Col md={6}>
            <Modal show={postModal} onHide={setpostModal}>
              <Modal.Header className="post-modal-header">
                <div className="user-profile-info">
                  <div className="profile-pic">
                    <img
                      src="https://media.licdn.com/dms/image/D5603AQE14jrOMsBZzw/profile-displayphoto-shrink_100_100/0/1692680339641?e=1708560000&v=beta&t=sFYPWeh_WFsEKPXIX0Zmq2lA_EH5du2cIHBLK8l9c9w"
                      alt=""
                    />
                  </div>
                  <div className="user-info">
                    <h6>
                      Johurul islam{" "}
                      <span>
                        <FaSortDown />
                      </span>
                    </h6>
                    <p>Post to Anyone</p>
                  </div>
                </div>
                <i onClick={handleHidePostModal}>
                  <RxCross2 />
                </i>
              </Modal.Header>
              <form onSubmit={postDataSubmit}>
                <Modal.Body className="post-body">
                  <textarea
                    name="post"
                    id=""
                    cols="50"
                    rows="10"
                    placeholder="What do you want to talk about?"
                    onChange={handleInputChange}
                  ></textarea>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Give media link here"
                    className="form-control"
                    onChange={handleInputChange}
                  />

                  <div className="imogi">
                    <i>
                      <FaRegSmile />
                    </i>
                  </div>
                  <div className="addmedia">
                    <div className="add-item">
                      <label htmlFor="upimg">
                        <div className="image">
                          <i>
                            <FaImage />
                          </i>
                        </div>
                      </label>
                      <input
                        type="file"
                        name="upphoto"
                        id="upimg"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleUpPhoto}
                      />
                    </div>

                    <div className="event">
                      <i>
                        <FaCalendarAlt />
                      </i>
                    </div>
                    <div className="celebrate">
                      <i>
                        <CiCircleMore />
                      </i>
                    </div>
                    <div className="more">
                      <i>
                        <BsThreeDots />
                      </i>
                    </div>
                  </div>
                  <div className="preview my-2">
                    {postPhoto.map((item, index) => {
                      const pervimg = URL.createObjectURL(item);
                      return (
                        <div className="previtem " key={index}>
                          <CloseButton
                            className="btn"
                            onClick={() => handleRemovePhoto(item)}
                          />
                          <img
                            src={pervimg}
                            style={{ width: "100px", borderRadius: "10px" }}
                            className="me-1"
                          />
                        </div>
                      );
                    })}
                  </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                  <i>
                    <IoTimeOutline />
                  </i>
                  <button type="submit"> Post </button>
                </Modal.Footer>
              </form>
            </Modal>
          </Col>
        </Row>
      </Container>

      <div className="linkedin">
        <Container className="main-with">
          <Row className="justify-content-center">
            <Col lg={12} md={12} sm={12}>
              <Row>
                <Col xl={2} lg={3} md={4} sm={12}>
                  <div className="left-sitebar">
                    <div className="top-part">
                      <img
                        src="https://www.shutterstock.com/image-photo/los-angeles-jun-7-andy-260nw-197382044.jpg"
                        className="profilePic"
                      />
                      <div className="profile-conten">
                        <h6>Johurul Islam</h6>
                        <p>WordPress | React | NodeJs | MongoDB</p>
                      </div>
                    </div>

                    {postWith ? (
                      <Accordion>
                        <Accordion.Item eventKey="0" className="my-2">
                          <Accordion.Header
                            style={{ padding: "0" }}
                            onClick={handleShowMore}
                          >
                            See more
                          </Accordion.Header>
                          <Accordion.Body className="">
                            <>
                              <div className="top-part-2 ">
                                <div className="profile-view">
                                  <p>Profile viewers</p>
                                  <h6> 6 </h6>
                                </div>
                                <div className="post-impressions">
                                  <p>Post impressions</p>
                                  <h6> 15 </h6>
                                </div>
                                <hr style={{ margin: "0px" }} />
                                <div className="premium">
                                  <p>
                                    Stengthen your profile with an Ai writing
                                    assistant
                                  </p>
                                  <h6>
                                    <FcSimCardChip /> Try Premium for BDT0
                                  </h6>
                                </div>
                                <hr style={{ margin: "0px" }} />
                                <div className="mydream">
                                  <p>
                                    <FaBookmark /> &nbsp; My items
                                  </p>
                                </div>
                              </div>

                              <div className="bottom-part">
                                <div className="recent">
                                  <p>Recent</p>
                                  <i>
                                    <IoIosArrowDown />{" "}
                                  </i>
                                </div>

                                <div className="ui">
                                  <i>
                                    <HiUserGroup />{" "}
                                  </i>
                                  <p>User experience(UX) design, P...</p>
                                </div>

                                <div className="ux">
                                  <i>
                                    <HiUserGroup />{" "}
                                  </i>
                                  <p>User Experience design (UX)</p>
                                </div>

                                <div className="groups">
                                  <h6>Groups</h6>
                                  <i>
                                    {" "}
                                    <IoIosArrowDown />{" "}
                                  </i>
                                </div>

                                <div className="ui">
                                  <i>
                                    <HiUserGroup />{" "}
                                  </i>
                                  <p>User experience(UX) design, P...</p>
                                </div>

                                <div className="ux">
                                  <i>
                                    <HiUserGroup />{" "}
                                  </i>
                                  <p>User Experience design (UX)</p>
                                </div>

                                <div className="see-all">
                                  <p>See all</p>
                                </div>

                                <div className="events">
                                  <h6>Events</h6>
                                  <i>
                                    {" "}
                                    <FiPlus />{" "}
                                  </i>
                                </div>

                                <h5>Followed Hashtags</h5>
                                <hr />
                                <div className="discover">
                                  <p>Discover more</p>
                                </div>
                              </div>
                            </>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ) : (
                      <>
                        <div className="top-part-2">
                          <div className="profile-view">
                            <p>Profile viewers</p>
                            <h6> 6 </h6>
                          </div>
                          <div className="post-impressions">
                            <p>Post impressions</p>
                            <h6> 15 </h6>
                          </div>
                          <hr style={{ margin: "0px" }} />
                          <div className="premium">
                            <p>
                              Stengthen your profile with an Ai writing
                              assistant
                            </p>
                            <h6>
                              <FcSimCardChip /> Try Premium for BDT0
                            </h6>
                          </div>
                          <hr style={{ margin: "0px" }} />
                          <div className="mydream">
                            <p>
                              <FaBookmark /> &nbsp; My items
                            </p>
                          </div>
                        </div>

                        <div className="bottom-part">
                          <div className="recent">
                            <p>Recent</p>
                            <i>
                              <IoIosArrowDown />{" "}
                            </i>
                          </div>

                          <div className="ui">
                            <i>
                              <HiUserGroup />{" "}
                            </i>
                            <p>User experience(UX) design, P...</p>
                          </div>

                          <div className="ux">
                            <i>
                              <HiUserGroup />{" "}
                            </i>
                            <p>User Experience design (UX)</p>
                          </div>

                          <div className="groups">
                            <h6>Groups</h6>
                            <i>
                              {" "}
                              <IoIosArrowDown />{" "}
                            </i>
                          </div>

                          <div className="ui">
                            <i>
                              <HiUserGroup />{" "}
                            </i>
                            <p>User experience(UX) design, P...</p>
                          </div>

                          <div className="ux">
                            <i>
                              <HiUserGroup />{" "}
                            </i>
                            <p>User Experience design (UX)</p>
                          </div>

                          <div className="see-all">
                            <p>See all</p>
                          </div>

                          <div className="events">
                            <h6>Events</h6>
                            <i>
                              {" "}
                              <FiPlus />{" "}
                            </i>
                          </div>

                          <h5>Followed Hashtags</h5>
                          <hr />
                          <div className="discover">
                            <p>Discover more</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Col>

                <Col xl={7} lg={6} md={8} sm={12}>
                  <div className="main-home">
                    <div className="top-area">
                      <div className="top-line">
                        <img
                          src="https://www.shutterstock.com/image-photo/los-angeles-jun-7-andy-260nw-197382044.jpg"
                          alt=""
                        />
                        <h6 onClick={handleShowPostModal}>Star a post</h6>
                      </div>
                      <div className="post-category">
                        <div className="media">
                          <i>
                            {" "}
                            <FaImage />{" "}
                          </i>
                          <h6>Media</h6>
                        </div>
                        <div className="event">
                          <i>
                            {" "}
                            <FaRegCalendarAlt />{" "}
                          </i>
                          <h6>Event</h6>
                        </div>
                        <div className="artical">
                          <i>
                            {" "}
                            <FaOutdent />{" "}
                          </i>
                          <h6>Write article</h6>
                        </div>
                      </div>
                    </div>

                    <hr />

                    {posts.map((item, index) => {
                      return (
                        <div className="post-area" key={index}>
                          <div className="post-item">
                            <div className="post-menu">
                              <p>Suggested</p>
                              <div className="left-part">
                                <Dropdown>
                                  <Dropdown.Toggle className="menu-btn">
                                    <i>
                                      <BsThreeDots />
                                    </i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="menu-option">
                                    <Dropdown.Item
                                      href="#/action-1"
                                      onClick={() => handleEditPost(item.id)}
                                    >
                                      {" "}
                                      Edit post
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#/action-2"
                                      onClick={() => handleDeletePost(item.id)}
                                    >
                                      {" "}
                                      Delete post{" "}
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>

                                <i onClick={() => handleHiddenPost(item.id)}>
                                  <RxCross2 />
                                </i>
                              </div>
                            </div>

                            <hr />

                            <div className="post-top">
                              <div className="user-info-area">
                                <img
                                  src="https://www.shutterstock.com/image-photo/los-angeles-jun-7-andy-260nw-197382044.jpg"
                                  alt=""
                                />
                                <div className="user-info">
                                  <h6>Johurul islam</h6>
                                  <p>WordPress / React / NodeJs / MongoDB</p>
                                  <p>
                                    2 hours. <BiWorld />{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="follow">
                                <h5>
                                  {" "}
                                  <FaPlus /> Follow
                                </h5>
                              </div>
                            </div>

                            <div className="post-body">
                              <div className="post-content">
                                <p> {item.post} </p>
                              </div>
                              <div className="post-img">
                                <img src={item.photo} />
                              </div>
                            </div>
                            <div className="post-footer">
                              <div className="reaction-count">
                                <div className="reaction">
                                  <i className="like">
                                    {" "}
                                    <AiTwotoneLike />{" "}
                                  </i>
                                  <i className="light">
                                    <FcIdea />
                                  </i>
                                  <i className="love">
                                    <CiHeart />
                                  </i>
                                  <p>200</p>
                                </div>
                                <div className="comment">
                                  <p>50 comments</p>
                                  <p>120 repost</p>
                                </div>
                              </div>
                              <hr />
                              <div className="reaction-area">
                                <div className="like-item">
                                  <FaRegThumbsUp />
                                  <p>Like</p>
                                </div>
                                <div className="comment-item">
                                  <TfiCommentAlt />
                                  <p>Comment</p>
                                </div>
                                <div className="repost-item">
                                  <ImLoop />
                                  <p>Repost</p>
                                </div>
                                <div className="sent-item">
                                  <FiSend />
                                  <p>Sent</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>

                <Col style={{ minWidth: "200px" }}>
                  <div className="right-sitebar">
                    <img
                      src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                      alt=""
                    />
                    <div className="links">
                      <Link> About</Link>
                      <Link> Accessibility</Link>
                      <Link> Help Center</Link>
                      <Link>
                        {" "}
                        Privacy & Terms <FaSortDown />{" "}
                      </Link>
                      <Link> Ad Choices</Link>
                      <Link> Advertising</Link>
                      <Link>
                        {" "}
                        Business Services <FaSortDown />{" "}
                      </Link>
                      <Link> Get the LinkedIn app</Link>
                      <Link> More</Link>
                    </div>
                    <p>
                      <span>Linked</span>
                      <FaLinkedin /> Linkedin Corporation &copy; 2023{" "}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
