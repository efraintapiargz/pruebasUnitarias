import React, { useState } from "react";
import { View, Text, Platform, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router"; // Para navegación en Expo Web y Móvil

const MainContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
  padding: 20px;
`;

const InputContainer = styled(View)`
  width: 100%;
  max-width: 300px;
  margin-bottom: 15px;
`;

const StyledTextInput = styled.TextInput`
  height: 50px;
  width: 100%;
  border-color: ${(props) => (props.error ? "#ff0000" : "#ddd")};
  border-width: 1px;
  border-radius: 8px;
  padding: 10px 15px;
  background-color: white;
  font-size: 16px;
`;

const ErrorText = styled(Text)`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  elevation: 3;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  elevation: 3;
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter(); // Para navegación

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = "El nombre de usuario es requerido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 carácter especial";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmación de contraseña es requerida";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (Platform.OS === "web") {
        window.location.href = "/";
      } else {
        router.push("/");
      }
    } else {
      handleAlert("Error", "Por favor, corrige los errores en el formulario.");
    }
  };

  const handleBack = () => {
    if (Platform.OS === "web") {
      window.location.href = "/";
    } else {
      router.push("/");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <MainContainer behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <InputContainer>
          <StyledTextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={!!errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            testID="input-email" // testID para pruebas
          />
          {errors.email ? <ErrorText>{errors.email}</ErrorText> : null}
        </InputContainer>

        <InputContainer>
          <StyledTextInput
            placeholder="Nombre de Usuario"
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
            error={!!errors.username}
            testID="input-username" // testID para pruebas
          />
          {errors.username ? <ErrorText>{errors.username}</ErrorText> : null}
        </InputContainer>

        <InputContainer>
          <StyledTextInput
            placeholder="Contraseña"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            error={!!errors.password}
            secureTextEntry={true}
            testID="input-password" // testID para pruebas
          />
          {errors.password ? <ErrorText>{errors.password}</ErrorText> : null}
        </InputContainer>

        <InputContainer>
          <StyledTextInput
            placeholder="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            error={!!errors.confirmPassword}
            secureTextEntry={true}
            testID="input-confirm-password" // testID para pruebas
          />
          {errors.confirmPassword ? (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          ) : null}
        </InputContainer>

        <ButtonContainer activeOpacity={0.8} onPress={handleSubmit} testID="register-button">
          <ButtonText>Registrarse</ButtonText>
        </ButtonContainer>

        <BackButton activeOpacity={0.8} onPress={handleBack} testID="back-button">
          <ButtonText>Atrás</ButtonText>
        </BackButton>
      </MainContainer>
    </ScrollView>
  );
}
