import React from 'react';

export default function Framework(props) {

  function goto(title, href) {
    window.history.pushState({}, title, href);
  }

  return (
    <>
      <header>
        <nav>
          <ol>
            <li><span onClick={() => goto('VueMicroApp', '/vue')}>VueMicroApp</span></li>
            <li><span onClick={() => goto('ReactMicroApp', '/react')}>ReactMicroApp</span></li>
            <li><span onClick={() => goto('AngularMicroApp', '/angular')}>AngularMicroApp</span></li>
          </ol>
        </nav>
      </header>
      <div id='frame' />
    </>

  );
}