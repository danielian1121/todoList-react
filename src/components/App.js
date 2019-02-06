import React from 'react'
import TodoList from './TodoList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task: []
    }
  }
  addTask = ({deadLine, comment}) => {
    const task = {
      deadLine,
      comment
    }
    const newTask = [task, ...this.state.task]
    this.setState({
      task: newTask
    })
  }
  render() {
    return <TodoList buttonText='+ Add Task' addTask={this.addTask} taskList={this.state.task}/>
  }
}

// 輸出App模組
export default App
