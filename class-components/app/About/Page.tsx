import { Link } from 'react-router-dom';

export function About() {
  return (
    <div>
      <Link to={'/public'}>Home</Link>
      <Link to="https://rs.school/courses/reactjs">Rs school</Link>
      <h1>I am a frontend developer</h1>
      <ul>
        <li>Html</li>
        <li>css</li>
        <li>js</li>
        <li>React</li>
        <li>next</li>
      </ul>
    </div>
  );
}

export default About;
