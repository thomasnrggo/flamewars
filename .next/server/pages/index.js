module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default, getStaticProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Homepage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStaticProps\", function() { return getStaticProps; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ \"socket.io-client\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/Users/anthonygonzalez/development/tests/nextjs-socketio/pages/index.js\";\n\n\nconst ENDPOINT = 'http://localhost:3000';\nfunction Homepage({\n  messages\n}) {\n  const socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default()(ENDPOINT);\n  const {\n    0: localMessages,\n    1: setLocalMessages\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])([]);\n  const {\n    0: field,\n    1: setField\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])('');\n  const {\n    0: user,\n    1: setUser\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])('');\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    socket.on(\"message\", handleMessage);\n    setLocalMessages(messages);\n  }, []);\n\n  let handleMessage = msg => {\n    setLocalMessages(oldMessages => [...oldMessages, msg]);\n  };\n\n  let handleChange = e => {\n    setField(e.target.value);\n  };\n\n  let handleUsername = e => {\n    setUser(e.target.value);\n  };\n\n  let handleSubmit = e => {\n    e.preventDefault();\n    let msg = {\n      id: new Date().getTime(),\n      value: field,\n      user: user\n    };\n\n    if (field.includes('/create')) {\n      console.log('crear evento');\n      socket.emit('create', {\n        command: field\n      });\n      setField('');\n    } else if (field.includes('/close')) {\n      console.log('cerrando evento');\n      socket.emit('close', {});\n    } else if (field.includes('#')) {\n      console.log('its a vote');\n      socket.emit('vote', {\n        vote: field\n      });\n    } else {\n      socket.emit('message', msg);\n      setField('');\n    }\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [localMessages ? localMessages.map(message => {\n      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"li\", {\n        children: [message.user, \" \", `=>`, \" \", message.value]\n      }, message.id, true, {\n        fileName: _jsxFileName,\n        lineNumber: 55,\n        columnNumber: 24\n      }, this);\n    }) : null, /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"form\", {\n      onSubmit: handleSubmit,\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"input\", {\n        onChange: handleChange,\n        type: \"text\",\n        placeholder: \"Escribe algo\",\n        value: field\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 58,\n        columnNumber: 17\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        children: \"Enviar\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 64,\n        columnNumber: 17\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 57,\n      columnNumber: 13\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 53,\n    columnNumber: 9\n  }, this);\n}\nasync function getStaticProps(context) {\n  let res = await fetch('http://localhost:3000/messages');\n  let messages = await res.json();\n  return {\n    props: {\n      messages\n    } // will be passed to the page component as props\n\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkVORFBPSU5UIiwiSG9tZXBhZ2UiLCJtZXNzYWdlcyIsInNvY2tldCIsImlvIiwibG9jYWxNZXNzYWdlcyIsInNldExvY2FsTWVzc2FnZXMiLCJ1c2VTdGF0ZSIsImZpZWxkIiwic2V0RmllbGQiLCJ1c2VyIiwic2V0VXNlciIsInVzZUVmZmVjdCIsIm9uIiwiaGFuZGxlTWVzc2FnZSIsIm1zZyIsIm9sZE1lc3NhZ2VzIiwiaGFuZGxlQ2hhbmdlIiwiZSIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlVXNlcm5hbWUiLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImlkIiwiRGF0ZSIsImdldFRpbWUiLCJpbmNsdWRlcyIsImNvbnNvbGUiLCJsb2ciLCJlbWl0IiwiY29tbWFuZCIsInZvdGUiLCJtYXAiLCJtZXNzYWdlIiwiZ2V0U3RhdGljUHJvcHMiLCJjb250ZXh0IiwicmVzIiwiZmV0Y2giLCJqc29uIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLE1BQU1BLFFBQVEsR0FBRyx1QkFBakI7QUFHZSxTQUFTQyxRQUFULENBQWtCO0FBQUNDO0FBQUQsQ0FBbEIsRUFBOEI7QUFDekMsUUFBTUMsTUFBTSxHQUFHQyx1REFBRSxDQUFDSixRQUFELENBQWpCO0FBQ0EsUUFBTTtBQUFBLE9BQUNLLGFBQUQ7QUFBQSxPQUFnQkM7QUFBaEIsTUFBb0NDLHNEQUFRLENBQUMsRUFBRCxDQUFsRDtBQUNBLFFBQU07QUFBQSxPQUFDQyxLQUFEO0FBQUEsT0FBUUM7QUFBUixNQUFvQkYsc0RBQVEsQ0FBQyxFQUFELENBQWxDO0FBQ0EsUUFBTTtBQUFBLE9BQUNHLElBQUQ7QUFBQSxPQUFPQztBQUFQLE1BQWtCSixzREFBUSxDQUFDLEVBQUQsQ0FBaEM7QUFFQUsseURBQVMsQ0FBQyxNQUFNO0FBQ1pULFVBQU0sQ0FBQ1UsRUFBUCxDQUFVLFNB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UDtBQUdIIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVmIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmNvbnN0IEVORFBPSU5UID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZXBhZ2Uoe21lc3NhZ2VzfSkge1xuICAgIGNvbnN0IHNvY2tldCA9IGlvKEVORFBPSU5UKTtcbiAgICBjb25zdCBbbG9jYWxNZXNzYWdlcywgc2V0TG9jYWxNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSlcbiAgICBjb25zdCBbZmllbGQsIHNldEZpZWxkXSA9IHVzZVN0YXRlKCcnKVxuICAgIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKCcnKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc29ja2V0Lm9uKFwibWVzc2FnZVwiLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgICAgc2V0TG9jYWxNZXNzYWdlcyhtZXNzYWdlcylcbiAgICB9LCBbXSlcblxuICAgIGxldCBoYW5kbGVNZXNzYWdlID0gbXNnID0+IHtcbiAgICAgICAgc2V0TG9jYWxNZXNzYWdlcyhvbGRNZXNzYWdlcyA9PiBbLi4ub2xkTWVzc2FnZXMsIG1zZ10pXG4gICAgfVxuXG4gICAgbGV0IGhhbmRsZUNoYW5nZSA9IGUgPT4ge1xuICAgICAgICBzZXRGaWVsZChlLnRhcmdldC52YWx1ZSlcbiAgICB9XG5cbiAgICBsZXQgaGFuZGxlVXNlcm5hbWUgPSBlID0+e1xuICAgICAgICBzZXRVc2VyKGUudGFyZ2V0LnZhbHVlKVxuICAgIH1cblxuICAgIGxldCBoYW5kbGVTdWJtaXQgID0gZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBsZXQgbXNnID0ge1xuICAgICAgICAgICAgaWQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgdmFsdWU6IGZpZWxkLFxuICAgICAgICAgICAgdXNlcjogdXNlclxuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkLmluY2x1ZGVzKCcvY3JlYXRlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhciBldmVudG8nKTtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdjcmVhdGUnLCB7Y29tbWFuZDogZmllbGR9KVxuICAgICAgICAgICAgc2V0RmllbGQoJycpXG4gICAgICAgIH0gZWxzZSBpZihmaWVsZC5pbmNsdWRlcygnL2Nsb3NlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjZXJyYW5kbyBldmVudG8nKTtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdjbG9zZScsIHt9KVxuICAgICAgICB9IGVsc2UgaWYoZmllbGQuaW5jbHVkZXMoJyMnKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0cyBhIHZvdGUnKTtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCd2b3RlJywge3ZvdGU6IGZpZWxkfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtZXNzYWdlJywgbXNnKVxuICAgICAgICAgICAgc2V0RmllbGQoJycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2xvY2FsTWVzc2FnZXMgPyBsb2NhbE1lc3NhZ2VzLm1hcChtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17bWVzc2FnZS5pZH0+e21lc3NhZ2UudXNlcn0ge2A9PmB9IHttZXNzYWdlLnZhbHVlfTwvbGk+XG4gICAgICAgICAgICB9KTogbnVsbH1cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nRXNjcmliZSBhbGdvJ1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZmllbGR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uPkVudmlhcjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgICB7LyogPGlucHV0XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVVzZXJuYW1lfVxuICAgICAgICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J0VzY3JpYmUgYWxnbydcbiAgICAgICAgICAgICAgICB2YWx1ZT17dXNlcn1cbiAgICAgICAgICAgIC8+ICovfVxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG4gICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZXMnKVxuICAgIGxldCBtZXNzYWdlcyA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHsgbWVzc2FnZXMgfSwgLy8gd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHBhZ2UgY29tcG9uZW50IGFzIHByb3BzXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io-client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW8tY2xpZW50XCI/OGJjNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJzb2NrZXQuaW8tY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///socket.io-client\n");

/***/ })

/******/ });