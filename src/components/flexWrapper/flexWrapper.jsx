import './flexwrapper.css'

function flexWrapper(props) {
  return <div className='flex'>{props.children}</div>;
  
}
export default flexWrapper;