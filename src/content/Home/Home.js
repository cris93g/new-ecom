import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
	background: black;
	height: 10vh;
`;

export default class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Wrapper />
			</div>
		);
	}
}
