import { Alert } from "react-native";

const globalErrorHandler = (error, isFatal) => {
    if (isFatal) {
      console.error('Фатальная ошибка:', error);
      // Здесь вы можете показать пользователю уведомление или экран с ошибкой
      // Например, через Alert
      Alert.alert(
        'Фатальная ошибка',
        `${error.name}: ${error.message}\n\nМы рекомендуем перезапустить приложение.`,
        [{ text: 'Закрыть' }]
      );
    } else {
      console.warn('Нефатальная ошибка:', error); 
    }
  
    // Здесь можно отправить ошибку в сервис логирования, например, Sentry или Bugsnag
  };
  
  export default globalErrorHandler;
  