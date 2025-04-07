import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebaseConfig'; // Ensure correct import of Firebase config

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const auth = getAuth(app); // Firebase Authentication instance
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "366564226018-uqf1dpdm7iiuuojj16bic92bp88rpc7q.apps.googleusercontent.com",
    redirectUri: "com.yourname.midtask3:/oauth2redirect", // Use the correct format
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate('Home', { user });
        })
        .catch((error) => Alert.alert('Login Failed', error.message));
    }
  }, [response]);

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
              try {
                // Firebase Authentication for email and password login
                await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate('Home'); // Navigate to home screen on successful login
              } catch (error) {
                // Handle any errors during login
                Alert.alert('Login Failed', error.message);
              }
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Google Sign-In Button */}
          <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#fff', marginBottom: 40 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, paddingHorizontal: 15, marginBottom: 20 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: '#fff', fontSize: 16 },
  loginButton: { width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 15, alignItems: 'center', marginBottom: 20 },
  loginButtonText: { fontSize: 18, fontWeight: 'bold', color: '#6a11cb' },
  googleButton: { width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 15, alignItems: 'center', marginBottom: 20 },
  googleButtonText: { fontSize: 18, fontWeight: 'bold', color: '#4285F4' },
  signupText: { fontSize: 14, color: '#fff' },
  signupLink: { fontWeight: 'bold', color: '#fff' },
});

export default LoginScreen;
