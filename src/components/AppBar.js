import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const style = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '4.75rem',
    width: '100%',
    backgroundColor: '#4A90E2'
  }
}

class AppBar extends React.Component {
  render() {
    const { classes, children } = this.props
    return(
      <div className={classes.root}>{children}</div>
    )
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired
}

export default withStyles(style)(AppBar)
