import { Link } from 'react-router-dom';
import './Tag.css';

const Tags = ({ tags = [] }) => {  
  console.log(tags); // ✅ Debugging: Check if tags data is coming in
  console.log("Rendering Tags:", tags);

  return (
    <div className='container'>
      {tags.length > 0 ? (
        tags.map((tag) => (
          <Link key={tag.id || tag.name} to={`/tag/${tag.name}`} className="tag-item">
            {tag.name} {tag.count !== undefined ? `(${tag.count})` : ""}
          </Link>
        ))
      ) : (
        <>
          { /* Handle empty tag case */ }
          <p>No tags available</p> 
        </>
      )}
    </div>
  );
};

export default Tags;
