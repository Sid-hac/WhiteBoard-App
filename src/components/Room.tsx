import { Button } from "./ui/button"



const Room = ({name , varient} : {name : string , varient : any}) => {
  return (
     <div>
        <Button variant={varient} >
            {name} Room
        </Button>
     </div>
  )
}

export default Room