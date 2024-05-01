// import React, { useState, useEffect } from 'react';
import "./styles.css";
import crossSvg from "./cross.svg";
import chatsvg from "./chat.svg";
import sendsvg from "./send.svg";
// Create some dom elements.

class WAChatBox {
  iframe = null;
  link = null;
  user = null;
  text = null;
  button_text = null;

  constructor({
    link = "https://wa.me/919999999999",
    user = {
      name: "Admin",
      avatar:
        "data:image/jpeg;base64,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",
      status: "Online",
    },
    text = `How can I help you?How can I help you?How can I help you?How can I help you?`,
    button_text = "Start Chat",
  }) {
    this.link = link;
    this.user = user;
    this.text = text;
    this.button_text = button_text;
    this.iframe = document.createElement("iframe");
    this.iframe.onload = this.iframeLoaded;
    this.iframe.src = "about:blank";
    document.body.append(this.iframe);
    this.iframe.style.position = "fixed";
    this.iframe.style.bottom = "0";
    this.iframe.style.right = "0";
    this.iframe.style.maxWidth = "100%";
    this.iframe.style.width = "200px";
    this.iframe.style.height = "100px";
    this.iframe.style.border = "none";
    this.iframe.style.zIndex = "999999999";
  }

  iframeLoaded = () => {
    let iframeDocument = this.iframe.contentDocument;
    iframeDocument.body.append(this.render());
    iframeDocument.body.append(chatBoxStyle);

    iframeDocument.querySelectorAll("#toggleWaBox").forEach((el) => {
      el.addEventListener("click", () => {
        let action = "show";
        if (
          iframeDocument.querySelector("#wa-box").classList.contains("show")
        ) {
          action = "hide";
        } else {
          action = "show";
        }

        if (action == "show") {
          iframeDocument.querySelector("#wa-box").classList.remove("hide");
          iframeDocument.querySelector("#wa-box").classList.add("show");
          setTimeout(() => {
            iframeDocument.querySelector(".chat-box").classList.add("show");
          }, 200);

          this.iframe.style.width = "408px";
          this.iframe.style.height =
            iframeDocument.querySelector("#full-waBox").offsetHeight + "px";
        } else {
          iframeDocument.querySelector("#wa-box").classList.remove("show");
          iframeDocument.querySelector("#wa-box").classList.add("hide");
          setTimeout(() => {
            this.iframe.style.width = "200px";
            this.iframe.style.height = "100px";
          }, 500);
        }
      });
    });
  };
  

  render = () => {
    return (
      <div className="fixed bottom-1 right-0 p-3" id="full-waBox">
        <div
          className="max-w-sm overflow-hidden rounded-lg shadow-lg"
          style="display: none"
          id="wa-box"
        >
          {/* <div className="avatar-div relative flex p-8 py-4">
            <div className="relative">
              <img
                src={this.user.avatar}
                alt=""
                className="h-16 rounded-full"
              />
              <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
            </div>
            <div className="flex flex-col p-3">
              <div className="name-head font-bold">{this.user.name}</div>
              <div className="replies-in">{this.user.status}</div>
            </div>
            <div className="cross-btn text-bold absolute right-2 top-2">
              <a id="toggleWaBox" className="cursor-pointer">
                <div
                  className="w-8 h-8"
                  dangerouslySetInnerHTML={{ __html: crossSvg }}
                />
              </a>
            </div>
          </div> */}
          <div>
          <iframe
            src="http://10.66.66.3/Client/3"
            width="380"
            height="380"
            frameBorder="0"
            allowFullScreen
          />
            {/* <iframe
              src="http://10.66.66.3/Client/3"
              style={{height: 'auto', width: 'auto'}}
            ></iframe> */}
          </div>
          {/* <div className="chat-bg relative bg-[#E6DDD4] p-5"> */}
          {/*<div className="chat-box">
              <div className="chat-name">Admin</div>
              <div
                className="chat-message"
                dangerouslySetInnerHTML={{ __html: this.text }}
              ></div>
              <div className="chat-time">13:25</div>
    </div>*/}

          {/* <div className="msg-left">
              <div className="chat-name-left">Admin</div>
              <p>Hello, how can I help you?</p>
              <div className="chat-time">13:25</div>
            </div> */}

          {/* Testing to send populate message */}

          {/* {chatMessages.map((message, index) => (
              <li key={index} className={`chat ${message.type}`}>
                <div className="msg-right">
                  <div className="chat-name-right">User</div>
                  <p>{message.message}</p>
                  <div className="chat-time">13:35</div>
                </div>
              </li>
            ))} */}

          {/* <div className="msg-right">
              <div className="chat-name-right">Bikram</div>
              <p id="user-msg">Vicks ki goli lo, hich kich dur karo</p>
              <div className="chat-time">13:27</div>
            </div>
          </div> */}

          {/* <div className="text-input">
            <div class="chat-input">
              <textarea
                placeholder="Enter a message..."
                spellcheck="false"
                required
                rows={2}
                cols={38}
                // value={userMessage}
                // onChange={(e) => setUserMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="send-btn">
              <button
                className="w-5 h-5 m-4"
                dangerouslySetInnerHTML={{ __html: sendsvg }}
                // onClick={handleMessageSend}
              />
            </div>
          </div> */}
        </div>
        <div
          className="relative float-right my-4 flex cursor-pointer justify-center rounded-full bg-black p-1 font-semibold text-white need-btn"
          id="toggleWaBox"
        >
          <div className={this.button_text ? "flex mx-4" : "flex"}>
            <div className="chat-whatsapp-icon">
              <div
                className="w-5 h-5"
                dangerouslySetInnerHTML={{ __html: chatsvg }}
              />
            </div>
            {this.button_text ? (
              <div className="ml-2 flex items-center justify-center">
                {this.button_text}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#acff38]"></div>
        </div>
      </div>
    );
  };
}

export default WAChatBox;
