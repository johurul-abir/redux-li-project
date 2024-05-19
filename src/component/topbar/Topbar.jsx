import "./Topbar.scss";
import { GrLinkedin } from "react-icons/gr";
import { MdOutlineSearch } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoBriefcase } from "react-icons/io5";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaTableSolid } from "react-icons/lia";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const Topbar = () => {
  const [resizemd, setResizemd] = useState(false);

  const seachInput = document.getElementById("input");

  const checkScreenSize = () => {
    setResizemd(window.innerWidth < 992);
  };

  const handleSeach = () => {
    const full = window.innerWidth;
    seachInput.style.display = "block";
    seachInput.style.width = `${full}px`;
    document.querySelector(".menu-part").style.display = "none";
    document.querySelector(
      ".topbar .topbar-area .log-Scarch-part"
    ).style.marginTop = "5px";
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <div className="topbar">
              <container className="topbar-area">
                <div className="log-Scarch-part">
                  <li>
                    <GrLinkedin />
                  </li>
                  <div className="search">
                    <i onClick={handleSeach}>
                      <MdOutlineSearch />
                    </i>
                    <input
                      type="text"
                      placeholder="Search"
                      style={
                        resizemd ? { display: "none" } : { display: "block" }
                      }
                      id="input"
                    />
                  </div>
                </div>

                <div className="menu-part">
                  <ul className="menu-area">
                    <li className="menu-item">
                      <Link to="">
                        <IoHomeSharp /> Home
                      </Link>
                    </li>

                    <li className="menu-item">
                      <Link to="">
                        <HiOutlineUsers /> My Network
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="">
                        <IoBriefcase /> Jobs
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="">
                        <AiTwotoneMessage /> Messaging
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="">
                        <IoNotificationsSharp /> Notifications
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="">
                        <img
                          src="https://media.licdn.com/dms/image/D5603AQE14jrOMsBZzw/profile-displayphoto-shrink_800_800/0/1692680339642?e=1708560000&v=beta&t=y1wdwsyIpxhdbmGN1wzzBIrGPHtClPHFuYe-Cb63TrQ"
                          alt=""
                        />
                        <div className="me">
                          <span>Me</span>
                          <i>
                            <IoMdArrowDropdown />
                          </i>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <div className="busyness-part">
                    <ul className="busyness-area">
                      <li className="menu-item">
                        <Link to="">
                          <i>
                            <LiaTableSolid />{" "}
                          </i>
                          <span>
                            For Busyness <IoMdArrowDropdown />{" "}
                          </span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="premium">
                          Try Premium for <br />
                          BDT0
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Topbar;
