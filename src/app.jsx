var React = require("react");
var ReactDOM = require("react-dom");

class App extends React.Component {
  render() {
    return (
      <h1>Hello React</h1>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
