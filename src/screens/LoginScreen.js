import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  StatusBar,
} from 'react-native';
import React from 'react';
import { userloginAPI, checkAuthAPI } from '../api/userloginAPI';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validation, setValidation] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    console.log('Use effect');
    const checkauthuser = async () => {
      const response = await checkAuthAPI();
      //console.log('Check auth response', response);
      if (response.authenticated) {
        navigation.navigate('BottomTabNavigator', {
          screen: 'HomeScreen',
          params: {
            mylist: response.user.mylist,
            watchedMovies: response.user.watchedMovies,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            age: response.user.age,
            gender: response.user.gender,
            email: response.user.email,
            username: response.user.username,
          },
        });
      }
    };
    checkauthuser();

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setValidation(false);
      return;
    }

    setIsLoading(true);
    setValidation(true);

    const responseData = await userloginAPI(username, password);
    // console.log('ResponseData', responseData);
    setIsLoading(false);

    if (responseData.success === false) {
      setValidation(false);
      //console.warn('Wrong username or password.')
    } else if (responseData.success === true) {
      navigation.navigate('BottomTabNavigator', {
        screen: 'HomeScreen',
        params: {
          mylist: responseData.user.mylist,
          watchedMovies: responseData.user.watchedMovies,
          firstName: responseData.user.firstName,
          lastName: responseData.user.lastName,
          age: responseData.user.age,
          gender: responseData.user.gender,
          email: responseData.user.email,
          username: responseData.user.username,
        },
      });
    }
  };
  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <LinearGradient
      colors={
        theme.mode === 'dark'
          ? ['#000000', '#1a0000', '#000000']
          : ['#FFFFFF', '#FFE5E5', '#FFFFFF']
      }
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Logo/Brand Section */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🍌</Text>
            <Text style={[styles.brandText, { color: theme.colors.text }]}>
              BananaFlix
            </Text>
            <Text
              style={[styles.tagline, { color: theme.colors.textSecondary }]}
            >
              Unlimited entertainment
            </Text>
          </View>

          {/* Sign In Title */}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Sign In
          </Text>

          {/* Username Input */}
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <IonIcon
              name="person-outline"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Username"
              placeholderTextColor={theme.colors.textSecondary}
              onChangeText={text => {
                setUsername(text);
                setValidation(true);
              }}
              value={username}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <IonIcon
              name="lock-closed-outline"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Password"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry={!showPassword}
              onChangeText={text => {
                setPassword(text);
                setValidation(true);
              }}
              value={password}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <IonIcon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {!validation && (
            <Animated.View style={styles.errorContainer}>
              <IonIcon name="alert-circle" size={16} color="#ff4444" />
              <Text style={styles.errorText}>
                Invalid username or password. Please try again.
              </Text>
            </Animated.View>
          )}

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text
              style={[
                styles.registerText,
                { color: theme.colors.textSecondary },
              ]}
            >
              New to BananaFlix?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Sign up now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 60,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E50914',
    letterSpacing: 2,
    textShadowColor: 'rgba(229, 9, 20, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    elevation: 5,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#8a0a0f',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  registerText: {
    color: '#888',
    fontSize: 15,
  },
  registerLink: {
    color: '#E50914',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
