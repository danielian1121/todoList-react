import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import AddItem from './AddItem'

const style = {
  root: {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center'
  },
  addButton: {
    backgroundColor: 'white',
    width:           '38.75rem',
    height:          '4.06rem',
    color:           '#C8C8C8',
    border:          'solid 2px #C8C8C8',
    borderRadius:    '5px',
    fontSize:        '24px',
    textAlign:       'left'
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
  addTask = ({title, deadLine, comment, starSelect}) => {
    const task = {
      id: this.state.count,
      title,
      deadLine,
      comment,
      starSelect
    }
    let newTask = [task, ...this.state.task]
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

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {
          this.state.showButtonOrAdd
          ? <button className={classes.addButton} onClick={this.handleButtonShow}>{'+ Add Task'}</button>
          : <AddItem addTask={this.addTask} hideAddItem={this.handleButtonShow}/>
        }
        <TodoList>
          {
            this.state.task.map( (element) => {
              return <TodoItem key={element.id} content={element}/>
            } )
          }
        </TodoList>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

// 輸出App模組
export default withStyles(style)(App)
