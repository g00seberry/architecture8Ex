export const apiErrorMessages = {
  "A token is required": "Токен обязателен",
  "Authorization error": "Ошибка при авторизации",
  Forbidden: "Доступ запрщешен",
  "Email cannot be empty": "Email не может быть пустым",
  "Error in request parameters": "Ошибка в параметрах запроса",
  "Password cannot be empty": "Пароль не может быть пустым",
  '"{{field}}" cannot be empty': 'Поле "{{field}}" не может быть пустым',
  "Sign up error": "Ошибка при регистрации",
  "Unexpected error": "Непредвиденная ошибка",
  "User already exists": "Пользователь уже существует",
  "User is already activated": "Пользователь уже активирован",
  "User is not authorized": "Пользователь не авторизован",
  "User is not found": "Пользователь не найден",
  "Roles.Cant delete.Attached to users":
    "Выбранные роли прикреплены к пользователям. Чтобы удалить необходимо открепить выбранные роли от пользователей",
  "Wrong login or password": "Неверный логин или пароль",
  "Server Error": "Ошибка сервера",
  "Inactive activation link": "Неактивная ссылка на активацию",
  "Inactive password reset link": "Неактивная ссылка на восстановление пароля",
  "Request limit exceeded, try again in 30 minutes":
    "Превышен лимит запросов, повторите поптыку через 30 минут",
  "Unable to delete taxonomies containing items":
    "Невозможно удалить таксономии, содержащие элементы",
  "Taxonomy already exists": "Таксономия уже существует",
  "Taxonomy does not exist": "Таксономия не существует",
  "Taxonomy item already exists": "Элемент таксономии уже существует",
  "Taxonomy item does not exist": "Элемент таксономии не существует",
  "Unable to update taxonomy, duplicate name or type":
    "Невозможно обноить таксономию, повторяется название или тип",
};
type Options = Record<string, string>;
export const getApiErrorMessage = (
  key: keyof typeof apiErrorMessages,
  options?: Options
) => {
  let message = apiErrorMessages[key] || key;
  Object.entries(options || {}).forEach(([k, v]) => {
    message = message.replace(`{{${k}}}`, v);
  });
  return message;
};
