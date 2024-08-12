// ErrorBoundary.js
import React from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновление состояния, чтобы отобразить fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логирование ошибки или выполнение дополнительных действий
    console.error('ErrorBoundary поймал ошибку:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Отобразить запасной UI при ошибке
      return (
        <View>
          <Text>Что-то пошло не так.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
