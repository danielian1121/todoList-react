import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import star from '../img/star.svg'
import starSelect from '../img/star_select.svg'
import calendar from '../img/calendar.svg'
import comment from '../img/comment.svg'

const style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '38.75rem'
  },
  title: {
    display: 'flex',
    marginBottom: '1px',
    width: '100%',
    height: '4.75rem',
    backgroundColor: '#F2F2F2'
  },
  titleInput: {
    marginTop: '1.5rem',
    marginLeft: '4.5rem',
    width: '27.25rem',
    height: '1.75rem',
    fontSize: '1.5rem',
    backgroundColor: '#F2F2F2',
    border: '0',
    '&::placeholder': {
      color: '#000000',
      opacity: '1'
    },
    '&::-ms-input-placeholder': {
      color: '#000000'
    },
    '&:-ms-input-placeholder': {
      color: '#000000'
    }
  },
  detailPage: {
    backgroundColor: '#F2F2F2'
  },
  star: {
    marginTop: '1.8rem',
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer'
  },
  label: {
    marginTop: '1.5rem',
    marginLeft: '.56rem',
    fontFamily: 'Roboto Medium',
    fontSize: '20px'
  },
  icon: {
    marginTop: '1.5rem',
    marginLeft: '4.5rem',
    width: '1rem',
    height: '1rem'
  },
  dateInput: {
    marginTop: '.5rem',
    marginLeft: '5.93rem',
    padding: '.5rem 3.5rem .5rem 1rem'
  },
  hourInput: {
    marginTop: '.5rem',
    marginLeft: '.5rem',
    padding: '.5rem 3.5rem .5rem 1rem'
  },
  textarea: {
    marginTop: '.5rem',
    marginLeft: '5.93rem',
    padding: '.5rem 1rem',
    width: '27.81rem',
    height: '7.5rem',
    resize: 'none'
  },
  cancelButton: {
    marginTop: '1.5rem',
    backgroundColor: '#FFFFFF',
    width: '50%',
    height: '3.75rem',
    fontSize: '24px',
    color: '#D0021B',
    border: 'none'
  },
  submitButton: {
    marginTop: '1.5rem',
    backgroundColor: '#4A90E2',
    width: '50%',
    height: '3.75rem',
    fontSize: '24px',
    color: '#FFFFFF',
    border: 'none'
  }
}

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date: '',
      hour: '',
      comment: '',
      starSelect: false
    }
  }

  handleSubmit = e => {
    this.handleAddTask()
    e.preventDefault()
  }

  handleTitleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleDateChange = e => {
    this.setState({ date: e.target.value })
  }

  handleHourChange = e => {
    this.setState({ hour: e.target.value })
  }

  handleCommentChange = e => {
    this.setState({ comment: e.target.value })
  }

  handleAddTask = () => {
    if (!this.state.title) {
      alert('Title should not be empty')
    } else {
      this.props.addTask({
        title: `${this.state.title}`,
        deadLine: [this.state.date, this.state.hour].filter(element => element),
        comment: `${this.state.comment}`,
        starSelect: this.state.starSelect
      })
      this.props.hideAddItem()
    }
  }

  handleStar = e => {
    if (e.target instanceof HTMLImageElement)
      this.setState({
        starSelect: !this.state.starSelect
      })
  }

  render() {
    const { classes, hideAddItem } = this.props
    const placeholder = 'Type your memo here...'
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <div className={classes.title}>
          <input
            className={classes.titleInput}
            placeholder='Type Title Here...'
            value={this.state.title}
            onChange={this.handleTitleChange}
            required
          />
          <img
            className={classes.star}
            src={this.state.starSelect ? starSelect : star}
            alt='star'
            onClick={this.handleStar}
          />
        </div>
        <div className={classes.detailPage}>
          <div>
            <img className={classes.icon} src={calendar} alt='calendar' />
            <label className={classes.label}>DeadLine</label>
          </div>
          <div>
            <input
              className={classes.dateInput}
              type='date'
              value={this.state.date}
              onChange={this.handleDateChange}
            />
            <input
              className={classes.hourInput}
              type='time'
              value={this.state.hour}
              onChange={this.handleHourChange}
            />
          </div>
          <div>
            <img className={classes.icon} src={comment} alt='comment' />
            <label className={classes.label}>Comment</label>
          </div>
          <textarea
            className={classes.textarea}
            placeholder={placeholder}
            rows='4'
            cols='50'
            value={this.state.comment}
            onChange={this.handleCommentChange}
          />
          <div>
            <button className={classes.cancelButton} onClick={hideAddItem}>
              {'X Cancel'}
            </button>
            <button
              className={classes.submitButton}
              onClick={this.handleAddTask}
            >
              {'+ Add Task'}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
  addTask: PropTypes.func.isRequired,
  hideAddItem: PropTypes.func.isRequired
}

export default withStyles(style)(AddItem)
