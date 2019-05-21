import React from "react";

import style from "./styling.js";

import { connect } from "react-redux";

import { socket } from "./socket";

import { Link } from "react-router-dom";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "", sidechat: false, chatscroll: 0 };
        this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        socket.emit("chatMessage", this.state.message);
        document.getElementById("messagefield").reset();
    }

    selectViewId(e) {
        e.preventDefault();
        socket.emit("selectViewId", this.state.message);
        document.getElementById("messagefield").reset();
    }

    handleChange(e) {
        this.setState({ message: e.target.value });
    }

    changeScroll(s, max) {
        this.setState({
            chatscroll: Math.max(Math.min(this.state.chatscroll + s, max), 0)
        });
    }

    render() {
        if (!this.props.chatMessages) {
            return (
                <div>
                    <div className="chatbox">
                        <div style={style.data.chatbg} />
                        <form
                            id="messagefield"
                            autoComplete="false"
                            onSubmit={e => this.handleInput(e)}
                        >
                            <input
                                autoComplete="off"
                                name="chatmessage"
                                onChange={e => this.handleChange(e)}
                                type="textfield"
                                size="60"
                                maxLength="35"
                            />
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="chatbox">
                        <div
                            className="upscroll"
                            onClick={() =>
                                this.changeScroll(
                                    5,
                                    this.props.chatMessages.length - 14
                                )
                            }
                        />
                        <div
                            className="downscroll"
                            onClick={() =>
                                this.changeScroll(
                                    -5,
                                    this.props.chatMessages.length - 14
                                )
                            }
                        />
                        <div style={style.data.chatbg}>
                            {this.props.chatMessages.map((user, index) => (
                                <div
                                    key={index}
                                    className="chatsinglecontainer"
                                    style={{
                                        bottom:
                                            (this.props.chatMessages.length -
                                                index -
                                                this.state.chatscroll) *
                                                35 +
                                            "px"
                                    }}
                                >
                                    <div>
                                        <Link to={"/user/" + user.id}>
                                            <div className="chatboxavatar">
                                                <img
                                                    src={
                                                        user.avatar ||
                                                        "/placeholder.png"
                                                    }
                                                    width="25px"
                                                />
                                            </div>
                                        </Link>
                                        <div className="chatboxname">
                                            {user.username} :
                                        </div>
                                        <div className="chatboxmessage">
                                            {user.message}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form
                            id="messagefield"
                            autoComplete="false"
                            onSubmit={e => this.handleInput(e)}
                        >
                            <input
                                autoComplete="off"
                                name="chatmessage"
                                onChange={e => this.handleChange(e)}
                                type="textfield"
                                size="60"
                                maxLength="35"
                            />
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    // state refers to global redux state
    return {
        chatMessages: state.showMessages && state.showMessages
    };
}

export default connect(mapStateToProps)(Chat);
