import PropTypes from 'prop-types'
import Button from './btn'
const Header = ({title, onAdd, showAdd}) => {  //destructuring object with title element
  return (
    <header>
      <h1 /*style = {headingStyle}*/>{title}</h1> 
      <Button onClick={onAdd} color= {showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'}/>
    </header>
  )
}

//Css in JS
const headingStyle = {
  color: 'red',
  backgroundColor: 'black',
}

//default value that will be used if no props are giver
Header.defaultProps = {
  title: 'Day Planner',
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
