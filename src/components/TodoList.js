import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AddItem from './AddItem'
import TodoItem from './TodoItem'

const style = {
  root: {
    display:        'flex',
    flexDirection:  'column',
    alignItems: 'center'
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
  },
}

class TodoList extends React.Component {
  // 建構式
  constructor(props) {
    // super是呼叫上層父類別的建構式
    super(props)

    // 設定初始的狀態。注意！這裡有個反樣式。
    this.state = {
      showAddtask:   false,
      showAddButton: true
    }
  }

  // 處理的方法，用e.target可以獲取到輸入框的值，用箭頭函式可以綁定`this`
  // 輸入文字時
  handleClick = (e) => {
    if (e.target instanceof HTMLButtonElement) {
      this.setState({
        showAddtask:   true,
        showAddButton: false
      })
    }
  }

  hideAddItem = () => {
    this.setState({
      showAddtask:   false,
      showAddButton: true
    })
  }

  // 渲染方法，回傳React Element(元素)
  render() {
    const { classes, addTask, taskList } = this.props
    return (
      <div className={classes.root}>
        {this.state.showAddButton && <button className={classes.addButton} onClick={this.handleClick}>{this.props.buttonText}</button>}
        {this.state.showAddtask && <AddItem addTask={addTask} hideAddItem={this.hideAddItem}/>}
        <TodoItem taskList={taskList}/>
      </div>
    )
  }
}

// 加入props的資料類型驗証
TodoList.propTypes = {
  classes:    PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  addTask:    PropTypes.func.isRequired,
  taskList:   PropTypes.array.isRequired
}

// 匯出TextInput模組
export default withStyles(style)(TodoList)
