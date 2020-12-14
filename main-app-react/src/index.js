import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { registerMicroApps, start } from 'qiankun';

// 为 Angular 微应用所做的 zone 包注入
// 如果没有 Angular 微应用，请删除这行代码
import "zone.js/dist/zone";

function render() {
  const container = document.getElementById('my-root');
  ReactDOM.render(<App />, container);
}

render();

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

registerMicroApps([
  { name: 'VueMicroApp', entry: 'http://localhost:10200', container: "#frame", activeRule: genActiveRule('/vue') },
  { name: 'ReactMicroApp', entry: 'http://localhost:10100', container: "#frame", activeRule: genActiveRule('/react') },
  { name: 'AngularMicroApp', entry: 'http://localhost:10300', container: "#frame", activeRule: genActiveRule('/angular') },
]);

start();