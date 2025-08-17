import { useRouteError, Link } from 'react-router-dom';

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/public">Вернуться на главную</Link>
    </div>
  );
}
