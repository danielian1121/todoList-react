import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const style = {
  root: {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'center',
    listStyleType: 'none',
    padding:       '0'
  }
}

const TodoList = ({children, classes}) => {
  return (
    <ul className={classes.root}>{children}</ul>
  )
}

// 加入props的資料類型驗証
TodoList.propTypes = {
  classes:  PropTypes.object.isRequired,
  children: PropTypes.React
}

// 匯出TextInput模組
export default withStyles(style)(TodoList)
