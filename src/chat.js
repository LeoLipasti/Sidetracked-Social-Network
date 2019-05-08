import React from "react";

import style from "./styling.js";

import { connect } from "react-redux";

import { socket } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: "" };
        this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        socket.emit("chatMessage", this.state.message);
        document.getElementById("messagefield").reset();
    }

    handleChange(e) {
        this.setState({ message: e.target.value });
    }

    componentDidUpdate() {
        this.chatDiv.scrollTop = "100px";
    }

    render() {
        return (
            <div className="chatbox">
                <div
                    id="chat-messages"
                    style={style.data.chatbg}
                    ref={chatCont => (this.chatDiv = chatCont)}
                >
                    /* messages go here */
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
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // state refers to global redux state
    return {
        chatMessages: state.showMessages && state.showMessages
    };
}

export default connect(mapStateToProps)(Chat);
