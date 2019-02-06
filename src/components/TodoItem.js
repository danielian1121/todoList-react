import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = (props) => {

  return (
    <ul>
      {
        props.taskList.map( (element, index) => {
          return <li key={index}>{element.comment}</li>
        } )
      }
    </ul>
  )
}

//加入props的資料類型驗証
TodoItem.propTypes = {
  taskList: PropTypes.array.isRequired
}

//匯出TodoItem模組
export default TodoItem
