import './Header.css'
import { Link } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="header">
      <div className="container">
        <h1 className="title">Find<span>Pro</span></h1>
        <p className="subtitle">
          FindPro is a reliable bridge between clients and professionals in their field.
        </p>
        <input  type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search" className="search" />
        <Link to={'/AddPost'}>
          <button className="submit add-button">Add Post</button>
        </Link>
        <Link to={'/'}>
          <button className="back add-button">Back</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
