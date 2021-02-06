import {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Button} from 'reactstrap'

const UserList = () => {
  const {users} = useContext(GlobalContext)
  console.log(users)
  return (
    <ListGroup>
      {users.map((user, index) => (
        <ListGroupItem className="d-flex" key={index}>{user.name}
      <div className="ml-auto">
        <Link to={`/edit/${user.id}`} className="btn btn-warning mr-1">Edit</Link>
        <Button color="danger">Delete</Button>
      </div>
      </ListGroupItem>
      ))}
      

    </ListGroup>
  )
}

export default UserList
