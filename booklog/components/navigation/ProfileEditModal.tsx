import { useState } from "react";

interface modalState {
  open: boolean;
  close: () => void;
}

export default function BasicModal(props: modalState) {
  const { open, close } = props;
  const [button, setButton] = useState("닫기");
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            프로필 정보 변경
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className="container"></div>
          </main>
        </section>
      ) : null}
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .modal button {
          outline: none;
          cursor: pointer;
          border: 0;
        }
        .modal > section {
          width: 90%;
          max-width: 1000px;
          margin: 0 auto;
          border-radius: 0.3rem;
          background-color: #fff;
          animation: modal-show 0.3s;
          overflow: hidden;
        }
        .modal > section > header {
          position: relative;
          padding: 16px 64px 16px 16px;
          background-color: #f1f1f1;
          font-weight: 700;
        }
        .modal > section > header button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          color: #999;
          background-color: transparent;
        }
        .modal > section > main {
          border-bottom: 1px solid #dee2e6;
          border-top: 1px solid #dee2e6;
        }
        .modal.openModal {
          display: flex;
          align-items: center;
          animation: modal-bg-show 0.3s;
        }
        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }
        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
