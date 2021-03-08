import React, { Component } from 'react';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import usergide from '../usergide.pdf';

export default class UserGide extends Component {
  state = {
    isClicked: false,
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      isClicked: true,
    });
  };

  render() {
    return (
      <div className="mt-4">
        <a
          style={{ color: '#004c99', fontSize: '14px' }}
          target="_blank"
          href={usergide}
        >
          <FontAwesomeIcon icon={faBookOpen} /> Naudotojo vadovas vaiko
          atstovams
        </a>
        <ReactTooltip id="registerTip1" place="bottom" effect="solid">
          Parsisiųsti
        </ReactTooltip>
      </div>
    );
  }
}
