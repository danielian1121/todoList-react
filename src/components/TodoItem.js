import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import star from '../img/star.svg'
import starSelect from '../img/star_select.svg'
import calendar from '../img/calendar.svg'
import comment from '../img/comment.svg'

const style = {
  root: {
    marginBottom: '.5rem',
    width: '38.75rem',
    height: '6.38rem',
    backgroundColor: '#F2F2F2'
  },
  title: {
    marginLeft: '1rem',
    marginTop: '1.1rem',
    fontSize: '1.8rem',
    fontFamily: 'Roboto-Medium',
    maxHeight: 'max-content'
  },
  gridContainer: {
    height: '100%'
  },
  gridItem: {
    display: 'flex',
    height: '50%'
  },
  checkBox: {
    marginLeft: '2rem',
    marginTop: '1.5rem',
    width: '1.5rem',
    height: '1.5rem'
  },
  star: {
    marginTop: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer'
  },
  calendar: {
    marginTop: '1rem',
    marginLeft: '4rem',
    width: '1rem',
    height: '1rem',
    filter:
      'invert(51%) sepia(0%) saturate(0%) hue-rotate(165deg) brightness(89%) contrast(87%)'
  },
  time: {
    marginLeft: '.5rem',
    color: '#757575'
  },
  comment: {
    marginTop: '1rem',
    marginLeft: '1rem',
    width: '1rem',
    height: '1rem',
    filter:
      'invert(51%) sepia(0%) saturate(0%) hue-rotate(165deg) brightness(89%) contrast(87%)'
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

class TodoItem extends React.Component {
  render() {
    const {
      classes,
      content,
      starClick,
      index,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props

    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <li
          className={classes.root}
          style={
            content.starSelect
              ? { backgroundColor: '#FFF2DC', opacity }
              : { opacity }
          }
        >
          <Grid className={classes.gridContainer} container>
            <Grid className={classes.gridItem} item xs={1}>
              <input type='checkbox' className={classes.checkBox} />
            </Grid>
            <Grid
              className={`${classes.gridItem} ${classes.title}`}
              item
              xs={9}
            >
              {content.title}
            </Grid>
            <Grid className={classes.gridItem} item xs={1}>
              <img
                className={classes.star}
                alt='star'
                src={content.starSelect ? starSelect : star}
                onClick={() => starClick(index)}
              />
            </Grid>
            <Grid className={classes.gridItem} item xs={12}>
              {content.deadLine.length !== 0 && (
                <img
                  className={classes.calendar}
                  alt='calendar'
                  src={calendar}
                />
              )}
              {content.deadLine.length !== 0 && (
                <p className={classes.time}>{content.deadLine.join(' ')}</p>
              )}
              {content.comment && (
                <img
                  className={classes.comment}
                  alt='comment'
                  src={comment}
                  style={!content.deadLine.length ? { marginLeft: '4rem' } : {}}
                />
              )}
            </Grid>
          </Grid>
        </li>
      )
    )
  }
}

//加入props的資料類型驗証
TodoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  starClick: PropTypes.func.isRequired
}

export default DropTarget('todoItem', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource('todoItem', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(withStyles(style)(TodoItem))
)
