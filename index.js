import React from 'react';


export default class RecycledComponent extends React.Component {
  constructor(props, context, updater) {
    // parent
    super(props, context, updater)

    // setup state with the cycle returns
    this.state = this.cycle(props, true)
  }

  componentDidUpdate(props, state) {
    // execute parent
    if(super.componentDidUpdate) super.componentDidUpdate(props, state)

    // props have changed
    var changed = false
    for(var a in props) {
      // all types are compared exept functions
      // which changes at any round
      if(typeof props[a] !== "function" && props[a] !== this.props[a]) {
        changed = true
        break
      }
    }

    // something need to be updated inside this component
    if (changed === true) {
      // recycling the state of the component
      const ret = this.cycle(this.props, false)
      if(ret && typeof ret === "object") this.setState(ret)
    }
  }

  // the famous cycling function
  cycle(props, first) {
    return({})
  }
}