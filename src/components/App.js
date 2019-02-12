import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import AddItem from './AddItem'

const style = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: 'white',
    width: '38.75rem',
    height: '4.06rem',
    color: '#C8C8C8',
    border: 'solid 2px #C8C8C8',
    borderRadius: '5px',
    fontSize: '24px',
    textAlign: 'left'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task: [],
      showButtonOrAdd: true,
      count: 0
    }
  }
  addTask = ({ title, deadLine, comment, starSelect }) => {
    const task = {
      id: this.state.count,
      title,
      deadLine,
      comment,
      starSelect
    }
    let newTask = [task, ...this.state.task]
    if (newTask.length > 1 && newTask[0].starSelect === false && newTask[1].starSelect === true)
      newTask = newTask.sort((A, B) => B.starSelect - A.starSelect)
    this.setState({
      task: newTask
    })
  }

  handleButtonShow = () => {
    this.setState({
      showButtonOrAdd: !this.state.showButtonOrAdd,
      count: this.state.count + 1
    })
  }

  handleStarClick = index => {
    let newTask = this.state.task
    newTask[index].starSelect = !newTask[index].starSelect
    newTask = newTask.sort((A, B) => B.starSelect - A.starSelect)
    this.setState({
      task: [
        ...newTask.slice(0, index),
        Object.assign({}, newTask[index]),
        ...newTask.slice(index + 1)
      ]
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
		const { task } = this.state
		const dragTask = task[dragIndex]

		this.setState(
			update(this.state, {
				task: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTask]]
				}
			})
		)
	}

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {this.state.showButtonOrAdd ? (
          <button className={classes.addButton} onClick={this.handleButtonShow}>
            {'+ Add Task'}
          </button>
        ) : (
          <AddItem addTask={this.addTask} hideAddItem={this.handleButtonShow} />
        )}
        <TodoList>
          {this.state.task.map((element, index) => {
            return (
              <TodoItem
                key={element.id}
                index={index}
                content={element}
                starClick={this.handleStarClick}
                moveCard={this.moveCard}
              />
            )
          })}
        </TodoList>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

// 輸出App模組
export default DragDropContext(HTML5Backend)(withStyles(style)(App))
