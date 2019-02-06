import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import calander from '../img/calendar.svg'
import comment from '../img/comment.svg'

const style = {
  root: {
    display:         'flex',
    flexDirection:   'column',
    width:           '38.75rem',
    backgroundColor: '#F2F2F2'
  },
  label: {
    marginTop:  '1.5rem',
    marginLeft: '.56rem',
    fontFamily: 'Roboto Medium',
    fontSize:   '20px'
  },
  icon: {
    marginTop:  '1.5rem',
    marginLeft: '4.5rem',
    width:      '1rem',
    height:     '1rem'
  },
  dateInput: {
    marginTop:  '.5rem',
    marginLeft: '5.93rem',
    padding:    '.5rem 3.5rem .5rem 1rem'
  },
  hourInput: {
    marginTop:  '.5rem',
    marginLeft: '.5rem',
    padding:    '.5rem 3.5rem .5rem 1rem'
  },
  textarea: {
    marginTop:  '.5rem',
    marginLeft: '5.93rem',
    padding:    '.5rem 1rem',
    width:      '27.81rem',
    height:     '7.5rem',
    resize:     'none'
  },
  cancelButton: {
    marginTop:       '1.5rem',
    backgroundColor: '#FFFFFF',
    width:           '50%',
    height:          '3.75rem',
    fontSize:        '24px',
    color:           '#D0021B',
    border:          'none'
  },
  submitButton: {
    marginTop:       '1.5rem',
    backgroundColor: '#4A90E2',
    width:           '50%',
    height:          '3.75rem',
    fontSize:        '24px',
    color:           '#FFFFFF',
    border:          'none'
  }
}

class AddItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date:    '',
      hour:    '',
      comment: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleDateChange = (e) => {
    this.setState({date: e.target.value})
  }

  handleHourChange = (e) => {
    this.setState({hour: e.target.value})
  }

  handleCommentChange = (e) => {
    this.setState({comment: e.target.value})
  }

  handleAddTask = (e) => {
    if (e.target instanceof HTMLButtonElement) {
      this.props.addTask({
        deadLine: `${this.state.date} ${this.state.hour}`,
        comment:  `${this.state.comment}`
      })
      this.props.hideAddItem()
    }
  }

  render() {
    const { classes, hideAddItem } = this.props
    const placeholder = 'Type your memo here...'
    return (
      <div>
        <form className={classes.root} onSubmit={this.handleSubmit}>
          <div>
            <img className={classes.icon} src={calander} alt='calander'></img>
            <label className={classes.label}>DeadLine</label>
          </div>
          <div>
            <input className={classes.dateInput} type='date' onChange={this.handleDateChange}/>
            <input className={classes.hourInput} type='time' onChange={this.handleHourChange}/>
          </div>
          <div>
            <img className={classes.icon} src={comment} alt='comment'></img>
            <label className={classes.label}>Comment</label>
          </div>
          <textarea className={classes.textarea} placeholder={placeholder} rows='4' cols='50' onChange={this.handleCommentChange}/>
          <div>
            <button className={classes.cancelButton} onClick={hideAddItem}>{'X Cancel'}</button>
            <button className={classes.submitButton} onClick={this.handleAddTask}>{'+ Add Task'}</button>
          </div>
        </form>
      </div>
    )
  }
}

AddItem.propTypes = {
  classes:     PropTypes.object.isRequired,
  addTask:     PropTypes.func.isRequired,
  hideAddItem: PropTypes.func.isRequired
}

export default withStyles(style)(AddItem)
