import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userRegisterAPI } from '../api/userRegisterAPI';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !age ||
      !email.trim() ||
      !username.trim() ||
      !password.trim()
    ) {
      setValidation(false);
      return;
    }

    setIsLoading(true);
    setValidation(true);

    const responseData = await userRegisterAPI(
      firstName,
      lastName,
      age,
      gender,
      email,
      username,
      password,
    );

    setIsLoading(false);

    if (responseData.success === false) {
      setValidation(false);
    } else if (responseData.success === true) {
      navigation.navigate('LoginScreen');
    }
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#000000', '#1a0000', '#000000']}
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[styles.contentContainer, { opacity: fadeAnim }]}
          >
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleLogin}>
              <IonIcon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🍌</Text>
              <Text style={styles.brandText}>BananaFlix</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>Create Account</Text>

            {/* Name Inputs Row */}
            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <IonIcon
                  name="person-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#888"
                  onChangeText={text => {
                    setFirstName(text);
                    setValidation(true);
                  }}
                  value={firstName}
                  autoCapitalize="words"
                />
              </View>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <IonIcon
                  name="person-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#888"
                  onChangeText={text => {
                    setLastName(text);
                    setValidation(true);
                  }}
                  value={lastName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Age Input */}
            <View style={styles.inputContainer}>
              <IonIcon
                name="calendar-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#888"
                keyboardType="numeric"
                onChangeText={text => {
                  setAge(text);
                  setValidation(true);
                }}
                value={age}
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.genderContainer}>
              <Text style={styles.genderLabel}>Gender</Text>
              <View style={styles.genderButtons}>
                {['Male', 'Female', 'Other'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.genderButton,
                      gender === item && styles.genderButtonActive,
                    ]}
                    onPress={() => setGender(item)}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        gender === item && styles.genderButtonTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <IonIcon
                name="mail-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                onChangeText={text => {
                  setEmail(text);
                  setValidation(true);
                }}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <IonIcon
                name="at-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                onChangeText={text => {
                  setUsername(text);
                  setValidation(true);
                }}
                value={username}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <IonIcon
                name="lock-closed-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
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
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {!validation && (
              <Animated.View style={styles.errorContainer}>
                <IonIcon name="alert-circle" size={16} color="#ff4444" />
                <Text style={styles.errorText}>
                  Please fill all fields or username already exists!
                </Text>
              </Animated.View>
            )}

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                isLoading && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
  },
  contentContainer: {
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 50,
    marginBottom: 5,
  },
  brandText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E50914',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    color: 'white',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 14,
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
  genderContainer: {
    width: '100%',
    marginBottom: 14,
  },
  genderLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  genderButtonText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '600',
  },
  genderButtonTextActive: {
    color: 'white',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
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
  registerButton: {
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
  registerButtonDisabled: {
    backgroundColor: '#8a0a0f',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#888',
    fontSize: 15,
  },
  loginLink: {
    color: '#E50914',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
