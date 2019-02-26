import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const style = {
  button: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 50px',
    width: 'max-content',
    height: '100% - 5px',
    fontSize: '24px',
    backgroundColor: '#4A90E2',
    border: 'none',
    cursor: 'pointer'
  }
}

class PageButton extends React.Component {
  render() {
    const { classes, text, index, select, cliceEvent } = this.props
    return (
      <p
        className={classes.button}
        onClick={() => cliceEvent(index)}
        style={
          select === index
            ? {
                color: '#ffffff',
                borderBottom: '5px #00408B solid',
                zIndex: '1'
              }
            : {}
        }
      >
        {text}
      </p>
    )
  }
}

PageButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  select: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  cliceEvent: PropTypes.func.isRequired
}

export default withStyles(style)(PageButton)
