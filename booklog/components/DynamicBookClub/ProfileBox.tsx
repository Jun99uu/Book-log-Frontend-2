import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import Router from "next/router";

interface UserInfo {
  id: number;
  image: string;
  username: string;
}

interface profileProps {
  isAdmin: boolean;
}

export default function ProfileBox(props: profileProps) {
  const { isAdmin } = props;
  const [isLogined, setIsLogined] = useRecoilState<boolean>(recoilLoginedState);
  const [openModal, setOpenModal] = useState(false);
  const [userObj, setUserObj] = useState<UserInfo>();
  const router = Router;

  const getUserInfo = () => {
    const uid = localStorage.getItem("uid");
    axios
      .get(`http://15.165.100.90:8080/auth/user/${uid}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setUserObj(res.data);
      })
      .catch((error) => {
        setIsLogined(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("uid");
        alert("로그아웃 되었습니다.");
        router.push("/");
        console.log(error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container">
      <span className="info-box">
        반갑습니다, <span className="st">{userObj && userObj.username}</span>님
      </span>
      <div className="img-box" onClick={() => setOpenModal((prev) => !prev)}>
        <Image
          src={userObj ? userObj.image : ""}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {openModal ? (
        isAdmin ? (
          <div className="modal">
            <ul>
              <li>모임을 삭제하고 싶어요.</li>
              <li>모임 가입자 명단을 보고 싶어요.</li>
            </ul>
          </div>
        ) : (
          <div className="modal">
            <ul>
              <li>모임에서 탈퇴하고 싶어요.</li>
              <li>모임을 신고하고 싶어요.</li>
            </ul>
          </div>
        )
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }
        .info-box {
          color: #242424;
          font-weight: 500;
        }
        .st {
          font-weight: 800;
        }
        .img-box {
          height: 70%;
          aspect-ratio: 1/1;
          border-radius: 100%;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .modal {
          width: 100%;
          background-color: white;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          position: absolute;
          bottom: -12vh;
          right: 0px;
          z-index: 99;
          padding: 15px 10px;
        }
        .modal ul {
          width: 100%;
          height: 100%;
          list-style-type: none;
          margin: 0px;
          padding: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 5px;
        }
        .modal ul li {
          width: 100%;
          height: 100%;
          color: #242424;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          text-align: end;
        }
        .modal ul li:hover {
          color: #125b50;
        }
      `}</style>
    </div>
  );
}
