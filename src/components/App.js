import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import AddItem from './AddItem'
import AppBar from './AppBar'
import PageButton from './PageButton'

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
      doneTask: [],
      showButtonOrAdd: true,
      count: 0,
      page: 0,
      select: 0
    }
  }
  addTask = ({ title, deadLine, date, hour, comment, starSelect }) => {
    const task = {
      id: this.state.count,
      title,
      deadLine,
      date,
      hour,
      comment,
      starSelect
    }
    let newTask = [task, ...this.state.task]
    if (
      newTask.length > 1 &&
      newTask[0].starSelect === false &&
      newTask[1].starSelect === true
    )
      newTask = newTask.sort((A, B) => B.starSelect - A.starSelect)
    this.setState({
      task: newTask,
      count: this.state.count + 1
    })
  }

  editTask = ({ id, index, title, deadLine, date, hour, comment, starSelect }) => {
    let newTask = [...this.state.task]
    const task = {
      id,
      title,
      deadLine,
      date,
      hour,
      comment,
      starSelect
    }
    newTask[index] = task
    this.setState({
      task: newTask
    })
  }

  handleButtonShow = () => {
    this.setState({
      showButtonOrAdd: !this.state.showButtonOrAdd
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

  handlePageButtonClick = index => {
    this.setState({
      select: index
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

  checkBox = (index, type) => {
    if (!type) {
      let newTask = this.state.task
      let newDoneTask = newTask[index]
      newDoneTask.starSelect = false
      newTask = [...newTask.slice(0, index), ...newTask.slice(index + 1)]
      this.setState({
        task: newTask,
        doneTask: [...this.state.doneTask, newDoneTask]
      })
    } else {
      let newDoneTask = this.state.doneTask
      let newTask = newDoneTask[index]
      newDoneTask = [
        ...newDoneTask.slice(0, index),
        ...newDoneTask.slice(index + 1)
      ]
      this.setState({
        task: [...this.state.task, newTask],
        doneTask: newDoneTask
      })
    }
  }

  handleSelectPage = select => {
    switch (select) {
      case 0:
        return (
          <TodoList>
            {this.state.task.map((element, index) => (
              <TodoItem
                key={element.id}
                index={index}
                content={element}
                starClick={this.handleStarClick}
                moveCard={this.moveCard}
                checkBox={this.checkBox}
                type={0} // Not finish
                editTask={this.editTask}
                id={element.id}
              />
            ))}
            {this.state.doneTask.map((element, index) => (
              <TodoItem
                key={element.id}
                index={index}
                content={element}
                starClick={this.handleStarClick}
                moveCard={this.moveCard}
                checkBox={this.checkBox}
                type={1} // Finish
                editTask={this.editTask}
                id={element.id}
              />
            ))}
          </TodoList>
        )
      case 1:
        return (
          <TodoList>
            {this.state.task.map((element, index) => (
              <TodoItem
                key={element.id}
                index={index}
                content={element}
                starClick={this.handleStarClick}
                moveCard={this.moveCard}
                checkBox={this.checkBox}
                type={0} // Not finish
                editTask={this.editTask}
                id={element.id}
              />
            ))}
          </TodoList>
        )
      default:
        return (
          <TodoList>
            {this.state.doneTask.map((element, index) => (
              <TodoItem
                key={element.id}
                index={index}
                content={element}
                starClick={this.handleStarClick}
                moveCard={this.moveCard}
                checkBox={this.checkBox}
                type={1} // Finish
                editTask={this.editTask}
                id={element.id}
              />
            ))}
          </TodoList>
        )
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar page={this.state.page}>
          <PageButton
            text='My Tasks'
            index={0}
            select={this.state.select}
            cliceEvent={this.handlePageButtonClick}
          />
          <PageButton
            text='In Progress'
            index={1}
            select={this.state.select}
            cliceEvent={this.handlePageButtonClick}
          />
          <PageButton
            text='Completed'
            index={2}
            select={this.state.select}
            cliceEvent={this.handlePageButtonClick}
          />
        </AppBar>
        {this.state.showButtonOrAdd ? (
          <button className={classes.addButton} onClick={this.handleButtonShow}>
            {'+ Add Task'}
          </button>
        ) : (
          <AddItem
            addTask={this.addTask}
            hideAddItem={this.handleButtonShow}
            data={{ title: '', date: '', hour: '', comment: '' }}
            index={null}
          />
        )}
        {this.handleSelectPage(this.state.select)}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

// 輸出App模組
export default DragDropContext(HTML5Backend)(withStyles(style)(App))
