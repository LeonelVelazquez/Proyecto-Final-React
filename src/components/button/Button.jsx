import "./button.css"
export default function Button(props){


return <button className="boton">{props.text}</button>
}

function ButtonChild(props){
    

    return (
        <button onClick={props.onClick}
        style={{ backgraundColor: props.color }} 
        className='botonn'>
            {props.text}
        </button>
    );
} 