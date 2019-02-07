import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import star from '../img/star.svg'
import starSelect from '../img/star_select.svg'
import calendar from '../img/calendar.svg'
import comment from '../img/comment.svg'

const style = {
  root: {
    marginBottom:   '.5rem',
    width:          '38.75rem',
    height:         '6.38rem',
    backgroundColor:'#F2F2F2'
  },
  title: {
    marginLeft: '1rem',
    marginTop:  '1.1rem',
    fontSize:   '1.8rem',
    fontFamily: 'Roboto-Medium',
    maxHeight:  'max-content'
  },
  gridContainer: {
    height: '100%'
  },
  gridItem: {
    display: 'flex',
    height:  '50%'
  },
  checkBox: {
    marginLeft: '2rem',
    marginTop:  '1.5rem',
    width:      '1.5rem',
    height:     '1.5rem'
  },
  star: {
    marginTop: '1.5rem',
    width:     '1.5rem',
    height:    '1.5rem'
  },
  calendar: {
    marginTop:  '1rem',
    marginLeft: '4rem',
    width:      '1rem',
    height:     '1rem',
    filter:     'invert(51%) sepia(0%) saturate(0%) hue-rotate(165deg) brightness(89%) contrast(87%)'
  },
  time: {
    marginLeft: '.5rem',
    color:      '#757575'
  },
  comment: {
    marginTop:  '1rem',
    marginLeft: '1rem',
    width:      '1rem',
    height:     '1rem',
    filter:     'invert(51%) sepia(0%) saturate(0%) hue-rotate(165deg) brightness(89%) contrast(87%)'
  }
}

const TodoItem = (props) => {
  const { classes, content } = props
  return (
    <li className={classes.root} style={content.starSelect ? {backgroundColor: '#FFF2DC'} : {}}>
      <Grid className={classes.gridContainer} container>
        <Grid className={classes.gridItem} item xs={1}>
          <input type='checkbox' className={classes.checkBox}/>
        </Grid>
        <Grid className={`${classes.gridItem} ${classes.title}`} item xs={9}>
          {content.title}
        </Grid>
        <Grid className={classes.gridItem} item xs={1}>
          <img className={classes.star} alt='star' src={content.starSelect ? starSelect : star}></img>
        </Grid>
        <Grid className={classes.gridItem} item xs={12}>
          {
            content.deadLine.length !== 0
            && <img className={classes.calendar} alt='calendar' src={calendar}></img>
          }
          {
            content.deadLine.length !== 0
            && <p className={classes.time}>{content.deadLine.join(' ')}</p>
          }
          {
            content.comment && <img className={classes.comment} alt='comment' src={comment}></img>
          }
        </Grid>
      </Grid>
    </li>
  )
}

//加入props的資料類型驗証
TodoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
}

//匯出TodoItem模組
export default withStyles(style)(TodoItem)
